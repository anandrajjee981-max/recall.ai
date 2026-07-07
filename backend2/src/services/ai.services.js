const Anthropic = require("@anthropic-ai/sdk");
const logger = require("../config/logger");

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const analyzeContent = async ({ title, rawContent, sourceType, existingLibraries }) => {
  const libraryNames = existingLibraries.map((lib) => lib.name);

  const prompt = `
You are an AI that organizes a user's saved content into a personal knowledge base.

Content details:
- Source type: ${sourceType}
- Title: ${title || "N/A"}
- Content: ${rawContent || "N/A"}

User's existing libraries: ${libraryNames.length > 0 ? libraryNames.join(", ") : "None yet"}

Your job:
1. Write a concise 1-2 sentence summary.
2. Extract 2-4 key points as short bullet strings.
3. Generate 3-6 relevant tags (single words or short phrases, lowercase).
4. Decide which library this belongs in. If one of the existing libraries fits well, return its exact name. If none fit, propose a NEW short library name (1-2 words, title case, e.g. "Fitness", "Machine Learning").

Respond ONLY with valid JSON in this exact format, no extra text, no markdown fences:
{
  "summary": "...",
  "keyPoints": ["...", "..."],
  "tags": ["...", "..."],
  "libraryName": "...",
  "isNewLibrary": true or false
}
`;

  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 500,
    messages: [{ role: "user", content: prompt }],
  });

  const textBlock = response.content.find((block) => block.type === "text");
  const rawText = textBlock ? textBlock.text : "{}";

  const cleaned = rawText.replace(/```json|```/g, "").trim();

  try {
    return JSON.parse(cleaned);
  } catch (err) {
    logger.error(`Failed to parse AI response: ${rawText}`);
    throw new Error("AI returned invalid JSON");
  }
};

module.exports = { analyzeContent };