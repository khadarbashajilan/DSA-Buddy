// Load environment variables from a .env file.
import "dotenv/config"; 
import { StringOutputParser } from "@langchain/core/output_parsers";
import { llm, retriever } from "./utils/retriever.js";
import { PromptTemplate } from "@langchain/core/prompts";


// This is an example of how to use the retriever directly.
// The retriever searches the vector store for documents semantically similar to the input.
// const response1 = await retriever.invoke('hi');
// console.log(response1);

// A template for converting a conversational question into a standalone question.
// This is essential for ensuring the language model understands the user's intent
// without needing the full chat history.
const standaloneQuestionTemplate = 'Given a question, convert it to a standalone question. question: {question} standalone question:';
const standaloneQuestionPrompt = PromptTemplate.fromTemplate(standaloneQuestionTemplate);

// Create a chain that processes a user's question to retrieve relevant documents.
// This is a common pattern for building a RAG (Retrieval-Augmented Generation) application.
const chain = standaloneQuestionPrompt 
  // Step 1: Format the user's question using the standalone question template.
  .pipe(llm) 
  // Step 2: Use the LLM to generate the standalone question.
  .pipe(new StringOutputParser()) 
  // Step 3: Parse the LLM's output to get a clean string.
  .pipe(retriever)
  // Step 4: Use the standalone question to search the vector store for relevant documents.

// Execute the chain with a sample question and log the results.
const response2 = await chain.invoke({
  question: "what is string"
});
console.log(response2);