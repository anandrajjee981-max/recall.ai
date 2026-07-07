const Anthropic = require("@anthropic-ai/sdk");

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

/**
 * Generates a conversational answer using retrieved saved items as context.
 */
const generateChatAnswer = async ({ question, relevantItems, chatHistory = [] }) => {
  // Build a context block from the user's relevant saved items
  const contextBlock = relevantItems
    .map((item, i) => {
      return `[${i + 1}] Title: ${item.title || "Untitled"}
Source: ${item.sourceType}
Summary: ${item.summary || "No summary available"}
URL: ${item.url}`;
    })
    .join("\n\n");

  const systemPrompt = `You are a helpful assistant answering questions using ONLY the user's saved content provided below as context. 

Rules:
- Base your answer strictly on the provided saved items. Do not invent information not present in them.
- If the saved items don't contain enough information to answer, say so honestly instead of guessing.
- When referencing a specific saved item, mention its title naturally in your answer.
- Keep answers conversational and concise, not robotic.

User's relevant saved items:
${contextBlock || "No relevant saved items were found."}`;

  // Build message history: previous turns + the new question
  const messages = [
    ...chatHistory.map((turn) => ({ role: turn.role, content: turn.content })),
    { role: "user", content: question },
  ];

  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 600,
    system: systemPrompt,
    messages,
  });

  const textBlock = response.content.find((block) => block.type === "text");
  return textBlock ? textBlock.text : "I couldn't generate a response.";
};

module.exports = { generateChatAnswer };