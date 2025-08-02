// Import necessary modules and classes from various libraries
import "dotenv/config"; // Used to load environment variables from a .env file
import { PromptTemplate } from "@langchain/core/prompts"; // A class for creating templates for prompts
import { ChatGoogleGenerativeAI } from "@langchain/google-genai"; // A class for interacting with Google's Generative AI models
import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai'; // A class for generating embeddings using Google's Generative AI
import { SupabaseVectorStore } from '@langchain/community/vectorstores/supabase'; // A class for using Supabase as a vector store
import { createClient } from "@supabase/supabase-js"; // A function to create a Supabase client


// Create a Supabase client using environment variables for the URL and API key
// These are loaded from the .env file by the "dotenv/config" import
const client = createClient(process.env.VITE_SBURL, process.env.VITE_SBAPI);

// Initialize the ChatGoogleGenerativeAI model
// We specify the model name and pass the API key from environment variables
const llm = new ChatGoogleGenerativeAI({
  model: "gemini-1.5-flash",
  apiKey: process.env.VITE_LLM_API_KEY,
});

// Initialize the GoogleGenerativeAIEmbeddings model
// This will be used to convert text into vector embeddings
const embeddings = new GoogleGenerativeAIEmbeddings({
  apiKey: process.env.VITE_LLM_API_KEY,
});

// Initialize the SupabaseVectorStore
// This connects LangChain to the 'documents' table in our Supabase instance
// It uses the embeddings model we just created and specifies the table and query names
const vectorStore = new SupabaseVectorStore(embeddings, {
  client,
  tableName: 'documents',
  queryName: 'match_documents'
});

// Create a retriever from the vector store
// The retriever is a key component in a RAG (Retrieval-Augmented Generation) system.
// It is responsible for fetching relevant documents from the vector store based on a query.
const retriever = vectorStore.asRetriever();

// Invoke the retriever with the query 'hi'
// The retriever will search for documents in the Supabase vector store that are semantically
// similar to 'hi'.
const response = await retriever.invoke('hi');

// Log the response from the retriever to the console 
// This will output the relevant documents that were retrieved.
console.log(response);
    
// Define a template for creating a "standalone question"
// This is often used in conversational chains to ensure each question can be understood
// without the context of the previous conversation.
const standaloneQuestionTemplate = 'Given a question, convert it to a standalone question. question: {question} standalone question:';

// Create a PromptTemplate instance from the template string
const standaloneQuestionPrompt = PromptTemplate.fromTemplate(standaloneQuestionTemplate);

// Create a chain that pipes the standalone question prompt to the language model
// This chain will take a question, format it using the prompt, and then get a response from the LLM.
const standaloneQuestionChain = standaloneQuestionPrompt.pipe(llm);

