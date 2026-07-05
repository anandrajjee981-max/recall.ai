import { StateGraph, Annotation, START, END } from "@langchain/langgraph";
import { ChatMistralAI } from "@langchain/mistralai";
import foldermodel from "../models/folder.model.js";

const mistral = new ChatMistralAI({
  apiKey: process.env.MISTRAL_API_KEY,
  model: "mistral-large-latest",
});

const State = Annotation.Root({
  url: Annotation(),
  title: Annotation(),
  description: Annotation(),
  content: Annotation(),
  decision: Annotation(),
  library: Annotation(),
});

async function inspectorNode(state) {
  const folders = await foldermodel.find({}, "name");

  const libraries = folders.map((f) => f.name);

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

  const output = JSON.parse(res.content);

  return {
    ...state,
    decision: output.decision,
    library: output.library,
  };
}

function route(state) {
  if (state.decision === "existing") {
    return "saveNode";
  }

  return "librarianNode";
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

Create:

- Library Name
- Short Description
- Summary
- Tags

Return ONLY JSON.
`;

  const res = await cohereLLM.invoke(prompt);

  const output = JSON.parse(res.content);

  // Check if library already exists
  let folder = await foldermodel.findOne({
    name: output.library,
  });


  if (!folder) {
    folder = await foldermodel.create({
       url: state.url,
      name: output.library,
      description: output.description,
    });
  }

  return {
    ...state,
    folderId: folder._id,
    library: folder.name,
    summary: output.summary,
    tags: output.tags,
  };
}

async function saveNode(state) {
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

export const app = graph.compile();





