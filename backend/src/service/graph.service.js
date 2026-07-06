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
const folders = await foldermodel.find({}, "title");


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

const raw = res.content
  .replace(/```json/g, "")
  .replace(/```/g, "")
  .trim();

const output = JSON.parse(raw);
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
    return "saveNode";
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

- Do not include any markdown formatting.
- Do not include any extra text outside the JSON object.
- Use a single string for library.
`;

  const res = await cohereLLM.invoke(prompt);

  const output = parseLlmJson(res.content);
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

return {
  ...state,
  folderId: folder?._id,
  library: folder.title,
  summary: output.summary,
  tags: output.tags,
  title: state.title,
  description: state.description,
  content: state.content,
};
}

async function saveNode(state){

    await saveModel.create({

        folder:state.folderId,

        username:state.userId,

        url:state.url,

        title:state.title,

        summary:state.summary,

        tags:state.tags

    });

    return state;

}

const graph = new StateGraph(State)
  .addNode("inspectorNode", inspectorNode)
  .addNode("librarianNode", librarianNode)
  .addNode("saveNode", saveNode)
  .addEdge(START, "inspectorNode")
  .addConditionalEdges("inspectorNode", route)
  .addEdge("librarianNode", "saveNode")
  .addEdge("saveNode", END);

export const queryGraph = graph.compile();





