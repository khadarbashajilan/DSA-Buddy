// This file initializes and exports the core components for a LangChain RAG application,
// connecting a Google Generative AI model with a Supabase vector store.

// Load environment variables from a .env file for secure configuration.
// Import classes for interacting with Google's Generative AI models and creating text embeddings.
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai'; 
// Import the Supabase vector store and client library.
import { SupabaseVectorStore } from '@langchain/community/vectorstores/supabase'; 
import { createClient } from "@supabase/supabase-js";

const sburl:string|undefined = import.meta.env.VITE_SBURL
const sbapi=import.meta.env.VITE_SBAPI

// Initialize the Supabase client using environment variables.
// This client provides the connection to your Supabase database instance.


  const client = createClient(sburl!, sbapi!);
  
  // Initialize the Language Model (LLM) using a specific Google Gemini model.
// This model will be used to generate standalone questions and final responses.
const llm = new ChatGoogleGenerativeAI({
  model: "gemini-1.5-flash",
  apiKey: import.meta.env.VITE_LLM_API_KEY,
});

// Initialize the embeddings model from Google Generative AI.
// This is crucial for converting text into numerical vectors, enabling
// semantic search in the vector store.
const embeddings = new GoogleGenerativeAIEmbeddings({
  apiKey: import.meta.env.VITE_LLM_API_KEY,
});

// Initialize the Supabase vector store.
// This class acts as the bridge between LangChain and your Supabase database,
// using the embeddings model to store and retrieve documents from the 'documents' table.
const vectorStore = new SupabaseVectorStore(embeddings, {
  client,
  tableName: 'documents',
  queryName: 'match_documents'
});

// Create a retriever from the vector store.
// The retriever is the component responsible for taking a user's query
// and fetching the most relevant documents from the vector store.
const retriever = vectorStore.asRetriever();

// Export the initialized LLM and retriever so they can be used in other parts of the application.
export { retriever, llm };
