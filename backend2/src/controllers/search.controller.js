const SavedItem = require("../models/SavedItem.model");
const SearchHistory = require("../models/SearchHistory.model");
const { generateEmbedding } = require("../services/embedding.service");
const cosineSimilarity = require("../utils/cosineSimilarity");
const logger = require("../config/logger");

// @route  POST /api/search
// @desc   Semantic search across the user's saved items
const searchItems = async (req, res) => {
  try {
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const queryEmbedding = await generateEmbedding(query);

    const items = await SavedItem.find({ user: req.user._id })
      .select("+embedding")
      .populate("library", "name")
      .populate("tags", "name");

    const scoredItems = items
      .filter((item) => item.embedding && item.embedding.length > 0)
      .map((item) => ({
        item,
        score: cosineSimilarity(queryEmbedding, item.embedding),
      }));

    scoredItems.sort((a, b) => b.score - a.score);
    const topResults = scoredItems.slice(0, 10).map((entry) => ({
      ...entry.item.toObject(),
      similarityScore: entry.score,
    }));

    SearchHistory.create({
      user: req.user._id,
      query,
      resultCount: topResults.length,
    }).catch((err) => logger.error(`Failed to log search history: ${err.message}`));

    res.status(200).json(topResults);
  } catch (error) {
    res.status(500).json({ message: "Search failed", error: error.message });
  }
};

// @route  GET /api/search/history
const getSearchHistory = async (req, res) => {
  try {
    const history = await SearchHistory.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .limit(20);

    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { searchItems, getSearchHistory };