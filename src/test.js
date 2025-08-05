// import { PromptTemplate } from "@langchain/core/prompts";
// import { StringOutputParser } from "@langchain/core/output_parsers";
// import {
//   RunnablePassthrough,
//   RunnableSequence,
// } from "@langchain/core/runnables";
// import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
// import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
// import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
// import { createClient } from "@supabase/supabase-js";
// import "dotenv/config";

// // Load environment variables from .env file
// const supabaseUrl = process.env.VITE_SBURL;
// const supabaseApiKey = process.env.VITE_SBAPI;
// const llmApiKey = process.env.VITE_LLM_API_KEY;

// console.log("Environment variables loaded:");
// console.log("Supabase URL:", supabaseUrl ? "Set" : "Not set");
// console.log("Supabase API Key:", supabaseApiKey ? "Set" : "Not set");
// console.log("LLM API Key:", llmApiKey ? "Set" : "Not set");



// try {
//   console.log("Creating Supabase client...");
//   const client = createClient(supabaseUrl, supabaseApiKey);
//   console.log("Supabase client created successfully.");

//   console.log("Initializing LLM...");
//   const llm = new ChatGoogleGenerativeAI({
//     model: "gemini-1.5-flash-8b",
//     temperature: 1,
//     apiKey: llmApiKey,
//   });
//   console.log("LLM initialized successfully.");

//   console.log("Initializing embeddings...");
//   const embeddings = new GoogleGenerativeAIEmbeddings({
//     apiKey: llmApiKey,
//   });
//   console.log("Embeddings initialized successfully.");

//   console.log("Creating vector store...");
//   const vectorStore = new SupabaseVectorStore(embeddings, {
//     client,
//     tableName: "documents",
//     queryName: "match_documents",
//   });
//   console.log("Vector store created successfully.");

//   console.log("Creating retriever...");
//   const retriever = vectorStore.asRetriever();
//   console.log("Retriever created successfully.");

//   const history = [];
//   const standaloneQuestionTemplate =
//     "Given a question, convert it to a standalone question. question: {question} standalone question:";
//   const standaloneQuestionPrompt = PromptTemplate.fromTemplate(
//     standaloneQuestionTemplate
//   );

//   const answerTemplate = `You’re a friendly support bot that specializes in Data Structures.
// Use the provided context and the conversation history as your memory, remember it before answering the next question.
// Answer the new question as naturally as possible, without restating prior responses and give a clear, concise answer to the question.
// If the answer isn’t in the context or memory, say: “I’m sorry, I don’t know the answer to that.”
// Chat like you’re texting a close friend.

// context: {context}
// convo_history: {convo_history}
// question: {question}
// answer: `;
//   const answerPrompt = PromptTemplate.fromTemplate(answerTemplate);

//   console.log("Creating standalone question chain...");
//   const standaloneQuestionChain = standaloneQuestionPrompt
//     .pipe(llm)
//     .pipe(new StringOutputParser());
//   console.log("Standalone question chain created successfully.");

//   console.log("Creating retrieval chain...");

//   const retrievalChain = RunnableSequence.from([
//   (prevResult) => prevResult.standalone_question,
//   retriever,
//   (docs) => (Array.isArray(docs) ? docs : [])
//     .map((d) => d?.pageContent ?? '')
//     .join("\n\n"),
// ]);
//   console.log("Retrieval chain created successfully.");

//   console.log("Creating answer generation chain...");
//   const answerGenerationChain = answerPrompt
//     .pipe(llm)
//     .pipe(new StringOutputParser());
//   console.log("Answer generation chain created successfully.");

//   console.log("Creating main RAG chain...");
//    const mainRagChain = RunnableSequence.from([
//     {
//       standalone_question: standaloneQuestionChain,
//       question: new RunnablePassthrough(),
//       convo_history: () =>
//         history
//           .map((str, idx) => (idx % 2 === 0 ? `Human: ${str}` : `AI: ${str}`))
//           .join("\n"),
//     },
//     {
//       context: retrievalChain,
//       question: ({ question }) => question,
//       convo_history: ({ convo_history }) => convo_history,
//     },
//     answerGenerationChain,
//   ]);

  
//   console.log("Main RAG chain created successfully.");

//   const userQuestion = "hi";

//   console.log("Invoking main RAG chain with question:", userQuestion);
//   console.log(standaloneQuestionChain)
//   const finalAnswer = await mainRagChain.invoke({
//     question: userQuestion,
//   });
//   console.log("Final Answer:", finalAnswer);
// } catch (error) {
//   console.error("Error:", error);
//   if (error.response) {
//     console.error("Response data:", error.response.data);
//     console.error("Response status:", error.response.status);
//     console.error("Response headers:", error.response.headers);
//   } else if (error.request) {
//     console.error("Request:", error.request);
//   } else {
//     console.error("Error message:", error.message);
//   }
// }