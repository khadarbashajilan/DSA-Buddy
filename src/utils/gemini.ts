import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
// Initialize the Language Model (LLM) using a specific Google Gemini model.
// This model will be used to generate standalone questions and final responses.
export const llm = new ChatGoogleGenerativeAI({
  model: "gemini-2.0-flash-lite",
  temperature: 1,
  apiKey: import.meta.env.VITE_LLM_API_KEY,
});

// Initialize the embeddings model from Google Generative AI.
// This is crucial for converting text into numerical vectors, enabling
// semantic search in the vector store.
export const embeddings = new GoogleGenerativeAIEmbeddings({
  apiKey: import.meta.env.VITE_LLM_API_KEY,
});

