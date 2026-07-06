import { StateGraph, Annotation, START, END } from "@langchain/langgraph";
import { ChatMistralAI } from "@langchain/mistralai";
import foldermodel from "../models/folder.model.js";
import saveModel from "../models/save.model.js";
import { ChatCohere } from "@langchain/cohere";

const mistral = new ChatMistralAI({
  apiKey: process.env.MISTRAL_API_KEY,
  model: "mistral-large-latest",
});

const cohereLLM = new ChatCohere({
 model: "command-a-03-2025",
    apiKey: process.env.COHERE_API_KEY,
});

const State = Annotation.Root({
  url: Annotation(),
  userId: Annotation(),
  title: Annotation(),
  description: Annotation(),
  content: Annotation(),
  decision: Annotation(),
  library: Annotation(),
  summary: Annotation(),
  tags: Annotation(),
  folderId: Annotation(),
});

async function inspectorNode(state) {
const folders = await foldermodel.find(
  { username: state.userId },
  "title"
);


const libraries = folders.map((f) => f.title);

  const prompt = `
You are Inspector AI for a Personal Knowledge Management System.

Your responsibility is to determine whether the given content belongs to one of the user's existing libraries.

## Existing Libraries
${libraries.length ? libraries.join(", ") : "No libraries available"}

## URL
${state.url}

## Page Title
${state.title}

## Description
${state.description}

## Extracted Content
${state.content}

Instructions:

1. Read the content semantically.
2. Compare it against the existing libraries.
3. If one library clearly matches, return:
{
  "decision":"existing",
  "library":"Library Name",
  "confidence":95
}

4. If none matches, return:
{
  "decision":"create_new",
  "library":null,
  "confidence":95
}

Rules:
- Return ONLY valid JSON.
- Never explain your reasoning.
- Never create a new library.
`;

  const res = await mistral.invoke(prompt);

const raw =
  typeof res.content === "string"
    ? res.content
    : Array.isArray(res.content)
      ? res.content.map(c => c.text ?? "").join("")
      : JSON.stringify(res.content);

const output = parseLlmJson(raw);


if (!output.decision || !["existing", "create_new"].includes(output.decision)) {
  throw new Error("Inspector output was invalid or missing a decision.");
}
const folder = await foldermodel.findOne({
    title: output.library,
    username: state.userId
});
if (output.decision === "existing" && !folder) {
  throw new Error("Inspector returned an existing library that was not found in the database.");
}
return {
    ...state,
    decision: output.decision,
    library: output.library,
    folderId: folder?._id,
    title: state.title,
    description: state.description,
    content: state.content,
}
}

function route(state) {
  if (state.decision === "existing") {
    return "metadataNode";
  }

  return "librarianNode";
}

function parseLlmJson(raw) {
  const cleaned = raw
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  try {
    return JSON.parse(cleaned);
  } catch (err) {
    const jsonMatch = cleaned.match(/({[\s\S]*})/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[1]);
    }
    throw new Error(`Unable to parse LLM response as JSON. Raw output: ${raw}`);
  }
}

function normalizeTags(tags) {
  if (Array.isArray(tags)) {
    return tags
      .filter((tag) => typeof tag === "string" && tag.trim())
      .map((tag) => tag.trim());
  }

  if (typeof tags === "string") {
    const trimmed = tags.trim();
    if (!trimmed) return [];

    try {
      const parsed = JSON.parse(trimmed);
      return normalizeTags(parsed);
    } catch {
      return trimmed
        .split(/[\n,;]+/)
        .map((tag) => tag.trim())
        .filter((tag) => tag);
    }
  }

  return [];
}
function fallbackTagsFromText(state) {
  const stopwords = new Set([
    "https", "http", "www", "youtube", "com", "org", "net", "pdf",
    "this", "that", "with", "from", "about", "into", "using", "user",
    "users", "article", "page", "learn", "learned", "learns", "data",
    "information", "system", "systems", "web", "site", "post",
    "linkedin", "posts", "feed", "activity", "update", "share",
    "home", "login", "account",
  ]);

  function extractTags(rawText) {
    const cleaned = rawText
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, " ");

    const counts = {};
    for (const token of cleaned.split(/\s+/).filter(Boolean)) {
      if (token.length < 4 || stopwords.has(token)) continue;
      counts[token] = (counts[token] || 0) + 1;
    }

    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([token]) => token);
  }

  // Step 1: title + description + content se try karo
  const primaryText = [state.title, state.description, state.content]
    .filter(Boolean)
    .join(" ")
    .trim();

  let tags = primaryText ? extractTags(primaryText) : [];

  // Step 2: agar step 1 se kuch nahi mila (khaali text YA sab filter ho gaya),
  // tab URL slug try karo
  if (tags.length === 0 && state.url) {
    try {
      const { pathname } = new URL(state.url);
      const urlText = pathname.replace(/[-_/]/g, " ").replace(/\d+/g, " ");
      tags = extractTags(urlText);
    } catch {
      // invalid URL, ignore
    }
  }

  // Step 3: fir bhi kuch na mile toh ek safe generic tag de do
  // (taaki "Array(empty)" kabhi bhi na dikhe DB me)
  if (tags.length === 0) {
    tags = ["uncategorized"];
  }

  return tags;
}

async function librarianNode(state) {

  const prompt = `
You are Librarian AI.

The Inspector could not find a matching library.

## URL
${state.url}

## Title
${state.title}

## Description
${state.description}

## Extracted Content
${state.content}

Create the following JSON object only:
{
  "library": "name of the new library",
  "description": "short description of the library",
  "summary": "summary of this content",
  "tags": ["tag1", "tag2"]
}

- Return only valid JSON.
- Always return "tags" as an array of strings.
- If there are no tags, return an empty array.
- Do not include any markdown formatting.
- Do not include any extra text outside the JSON object.
- Use a single string for library.
`;

  const res = await cohereLLM.invoke(prompt);

 const raw =
  typeof res.content === "string"
    ? res.content
    : Array.isArray(res.content)
    ? res.content.map(c => c.text ?? "").join("")
    : JSON.stringify(res.content);

const output = parseLlmJson(raw); 
  const fallbackLibraryName =
    state.title?.trim() ||
    (state.url ? new URL(state.url).hostname : null) ||
    "New Library";

  const libraryName =
    output.library && typeof output.library === "string" && output.library.trim()
      ? output.library.trim()
      : fallbackLibraryName;

  if (!output.library || typeof output.library !== "string" || !output.library.trim()) {
    console.warn(
      `Librarian output missing valid library name, falling back to '${libraryName}'. Raw response: ${res.content}`
    );
  }

  let folder = await foldermodel.findOne({
    title: libraryName,
    username: state.userId,
  });

  if (!folder) {
    folder = await foldermodel.create({
      username: state.userId,
      url: state.url,
      title: libraryName,
      description: output.description?.trim() || "",
    });
  }

const librarianTags = normalizeTags(output.tags);

return {
  ...state,
  folderId: folder?._id,
  library: folder.title,
  summary: output.summary ?? "",
  tags: librarianTags.length ? librarianTags : fallbackTagsFromText(state),
  title: state.title,
  description: state.description,
  content: state.content,
};
}
async function metadataNode(state) {
if (
  typeof state.summary === "string" &&
  state.summary.trim() &&
  Array.isArray(state.tags) &&
  state.tags.length > 0
) {
  return state;
}
  const prompt = `
You are Metadata AI.

Analyze this content and return ONLY valid JSON.

Title:
${state.title}

Description:
${state.description}

Content:
${state.content}

Return:
{
  "summary": "short summary",
  "tags": ["tag1","tag2","tag3"]
}

- Return only valid JSON.
- Always return tags as an array of strings.
- If there are no tags, return an empty array.
`;
  const res = await cohereLLM.invoke(prompt);

  const output = parseLlmJson(
    typeof res.content === "string"
      ? res.content
      : Array.isArray(res.content)
      ? res.content.map(c => c.text ?? "").join("")
      : JSON.stringify(res.content)
  );

  const metadataTags = normalizeTags(output.tags);

  return {
    ...state,
    summary: output.summary ?? "",
    tags: metadataTags.length ? metadataTags : fallbackTagsFromText(state),
  };
}
async function saveNode(state) {
  const existing = await saveModel.findOne({
    username: state.userId,
    folder: state.folderId,
    url: state.url,
  });

  if (existing) {
    return state;
  }

  const saved = await saveModel.create({
    folder: state.folderId,
    username: state.userId,
    url: state.url,
    title: state.title,
    summary: state.summary,
    tags: state.tags,
  });

  if (state.folderId) {
    await foldermodel.findByIdAndUpdate(state.folderId, {
      $addToSet: { saves: saved._id },
    });
  }

  return state;
}


const graph = new StateGraph(State)
  .addNode("inspectorNode", inspectorNode)
  .addNode("librarianNode", librarianNode)
  .addNode("metadataNode", metadataNode)
  .addNode("saveNode", saveNode)
  .addEdge(START, "inspectorNode")
  .addConditionalEdges("inspectorNode", route)
  .addEdge("librarianNode", "metadataNode")
  .addEdge("metadataNode", "saveNode")
  .addEdge("saveNode", END);

export const queryGraph = graph.compile();





