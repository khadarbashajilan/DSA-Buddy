import { llm, embeddings } from "./gemini";
// This file initializes and exports the core components for a LangChain RAG application,

// Import the Supabase vector store and client library.
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { createClient } from "@supabase/supabase-js";
const sburl = import.meta.env.VITE_SBURL;
const sbapi = import.meta.env.VITE_SBAPI;

// Initialize the Supabase client using environment variables.
// This client provides the connection to your Supabase database instance.

const client = createClient(sburl!, sbapi!);

// Initialize the Supabase vector store.
// This class acts as the bridge between LangChain and your Supabase database,
// using the embeddings model to store and retrieve documents from the 'documents' table.
const vectorStore = new SupabaseVectorStore(embeddings, {
  client,
  tableName: "documents",
  queryName: "match_documents",
});

// Create a retriever from the vector store.
// The retriever is the component responsible for taking a user's query
// and fetching the most relevant documents from the vector store.
const retriever = vectorStore.asRetriever();

// Export the initialized LLM and retriever so they can be used in other parts of the application.
export { retriever, llm };
