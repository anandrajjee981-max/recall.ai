const { v4: uuidv4 } = require("uuid");
const SavedItem = require("../models/SavedItem.model");
const ChatMessage = require("../models/ChatMessage.model");
const { generateEmbedding } = require("../services/embedding.service");
const { generateChatAnswer } = require("../services/chat.service");
const cosineSimilarity = require("../utils/cosineSimilarity");

// @route  POST /api/chat
// @desc   Ask a question, get an answer grounded in the user's saved items
const askChat = async (req, res) => {
  try {
    const { question, conversationId } = req.body;

    if (!question) {
      return res.status(400).json({ message: "Question is required" });
    }

    // Use existing conversation, or start a new one
    const activeConversationId = conversationId || uuidv4();

    // 1. Find relevant saved items (same approach as semantic search)
    const questionEmbedding = await generateEmbedding(question);

    const items = await SavedItem.find({ user: req.user._id })
      .select("+embedding")
      .populate("library", "name");

    const scoredItems = items
      .filter((item) => item.embedding && item.embedding.length > 0)
      .map((item) => ({
        item,
        score: cosineSimilarity(questionEmbedding, item.embedding),
      }));

    scoredItems.sort((a, b) => b.score - a.score);
    const topItems = scoredItems.slice(0, 5).map((entry) => entry.item);

    // 2. Pull recent chat history for this conversation (for context continuity)
    const previousMessages = await ChatMessage.find({
      user: req.user._id,
      conversationId: activeConversationId,
    })
      .sort({ createdAt: 1 })
      .limit(10); // last 10 messages to keep prompt size reasonable

    const chatHistory = previousMessages.map((msg) => ({
      role: msg.role,
      content: msg.content,
    }));

    // 3. Generate the AI's answer
    const answer = await generateChatAnswer({
      question,
      relevantItems: topItems,
      chatHistory,
    });

    // 4. Save both the user's question and the AI's answer to history
    await ChatMessage.create({
      user: req.user._id,
      conversationId: activeConversationId,
      role: "user",
      content: question,
    });

    await ChatMessage.create({
      user: req.user._id,
      conversationId: activeConversationId,
      role: "assistant",
      content: answer,
      referencedItems: topItems.map((item) => item._id),
    });

    res.status(200).json({
      conversationId: activeConversationId,
      answer,
      referencedItems: topItems.map((item) => ({
        _id: item._id,
        title: item.title,
        url: item.url,
        library: item.library,
      })),
    });
  } catch (error) {
    res.status(500).json({ message: "Chat failed", error: error.message });
  }
};

// @route  GET /api/chat/:conversationId
// @desc   Get full message history for a conversation
const getConversation = async (req, res) => {
  try {
    const messages = await ChatMessage.find({
      user: req.user._id,
      conversationId: req.params.conversationId,
    }).sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @route  GET /api/chat
// @desc   List all conversation threads for the user (most recent message per thread)
const listConversations = async (req, res) => {
  try {
    const conversations = await ChatMessage.aggregate([
      { $match: { user: req.user._id } },
      { $sort: { createdAt: -1 } },
      {
        $group: {
          _id: "$conversationId",
          lastMessage: { $first: "$content" },
          lastMessageAt: { $first: "$createdAt" },
        },
      },
      { $sort: { lastMessageAt: -1 } },
    ]);

    res.status(200).json(conversations);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { askChat, getConversation, listConversations };