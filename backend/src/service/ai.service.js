
import { ChatMistralAI } from "@langchain/mistralai"
import { ChatCohere } from "@langchain/cohere"

 export const cohereLLM = new ChatCohere({
    model: "command-r-plus",
   apiKey: process.env.COHERE_API_KEY,
    
})

export const mistralLLM = new ChatMistralAI({
    model: "mistral-large-latest",
   apiKey: process.env.MISTRAL_API_KEY,
   
})










