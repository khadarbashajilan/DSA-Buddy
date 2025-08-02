// Import necessary modules and classes from various libraries
import "dotenv/config"; // Used to load environment variables from a .env file
import { PromptTemplate } from "@langchain/core/prompts"; // A class for creating templates for prompts
import { ChatGoogleGenerativeAI } from "@langchain/google-genai"; // A class for interacting with Google's Generative AI models
import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai'; // A class for generating embeddings using Google's Generative AI
import { SupabaseVectorStore } from '@langchain/community/vectorstores/supabase'; // A class for using Supabase as a vector store
import { createClient } from "@supabase/supabase-js"; // A function to create a Supabase client
import { StringOutputParser } from "@langchain/core/output_parsers";

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
const response1 = await retriever.invoke('hi');

// Log the response from the retriever to the console 
// This will output the relevant documents that were retrieved.
// console.log(response1);
    
// Define a template for creating a "standalone question"
// This is often used in conversational chains to ensure each question can be understood
// without the context of the previous conversation.
const standaloneQuestionTemplate = 'Given a question, convert it to a standalone question. question: {question} standalone question:';

// Create a PromptTemplate instance from the template string
const standaloneQuestionPrompt = PromptTemplate.fromTemplate(standaloneQuestionTemplate);

// Creates a sequence of operations that will be executed in order.
// Each step's output is passed as the input to the next step.
const chain = standaloneQuestionPrompt 
// Step 1: Takes a question as input, and formats it using the "standaloneQuestionTemplate".
 // This turns a potentially conversational question like "What about the second one?"
 // into a complete, standalone question like "What about the second topic?"
 .pipe(llm) 
 // Step 2: Passes the formatted prompt to the language model (llm).
 // The LLM generates a response, which is a complex object (an AIMessage or similar).
 .pipe(new StringOutputParser()) 
 // Step 3: This is a crucial step. The StringOutputParser takes the LLM's complex output
 // and extracts just the plain text string content. This is necessary because the next
 // step (the retriever) expects a simple string as input for its search query.
 .pipe(retriever)
 // Step 4: Takes the cleaned, standalone question string from the output parser
 // and uses it to query the vector store. The retriever will find and return
 // the most relevant documents based on the question.


const response2 = await chain.invoke({
 question: "Why should i use TypeScript"
})

// The `invoke` method executes the entire chain with the provided input
// The final result `response2` is an array of `Document` objects from the vector store.

console.log(response2);
// This logs the array of retrieved documents to the console.