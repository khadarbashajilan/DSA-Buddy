import { PromptTemplate } from "@langchain/core/prompts";
import { llm, retriever } from "./utils/retriever";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { RunnablePassthrough, RunnableSequence,} from "@langchain/core/runnables";
// ========================================================================================================
// --- Prompt Templates ---
// These are the instructions we give to the Language Model at different stages.
// ========================================================================================================

// This is the instruction for the LLM to rephrase a question so it can be understood
// on its own, without any previous conversation history.

// const AllHistory = (convos:string[]) =>{  
//   convos.map((str, idx) => (idx % 2 === 0 ? `Human: ${str}` : `AI: ${str}`)).join('\n');
// }

export async function gemini(question:string, history:string[]){

const standaloneQuestionTemplate ="Given a question, convert it to a standalone question. question: {question} standalone question:";
const standaloneQuestionPrompt = PromptTemplate.fromTemplate(standaloneQuestionTemplate);

// This is the instruction for the LLM to generate the final answer.
// It provides the retrieved context and the original question.
const answerTemplate = `You’re a friendly support bot that specializes in Data Structures.  
Use the provided context and the conversation history as your memory,remember it before answering next question.
Answer the new question as naturally as possible, without restating prior responses and give a clear, concise answer to the question.  
If the answer isn’t in the context or memory, say: “I’m sorry, I don’t know the answer to that.”  
Chat like you’re texting a close friend.

context: {context}
convo_history: {convo_history}
question: {question}

answer: `;
const answerPrompt = PromptTemplate.fromTemplate(answerTemplate);

// ========================================================================================================
// --- Building the Sub-Chains ---
// We break down the big task into smaller, more manageable chains.
// ========================================================================================================

// This chain's job is to take the user's question and convert it into a standalone question.
const standaloneQuestionChain = standaloneQuestionPrompt
  .pipe(llm)
  .pipe(new StringOutputParser());
  
  
  // This chain's job is to use the standalone question to retrieve relevant documents (in object).
  const retrievalChain = RunnableSequence.from([
    (prevResult) => {
      return prevResult.standalone_question;
    },
    retriever,
    //Below PrevResult means thats returned from retriever, dont get confused .i.e,. MATCHING CHUNKS[] from vetcor store SupaBase
    
    (prevResult)=>{
      return prevResult.map(chunk => chunk.pageContent).join("\n\n");
    }
    ]);

    
    // This chain's job is to take the context and the original question and generate the final answer.
  const answerGenerationChain = answerPrompt
      .pipe(llm)
      .pipe(new StringOutputParser());

// ========================================================================================================
// --- The Main RAG Chain ---
// This is the complete, high-level pipeline that combines all the smaller chains.
/**
 * This is the main RAG (Retrieval-Augmented Generation) chain.
 * It combines the standalone question generation, document retrieval, and answer generation chains
 * to create a complete question-answering pipeline.
 * The chain works as follows:
 * 1. Takes the user's question as input.
 * 2. Uses the standaloneQuestionChain to rephrase the question into a standalone question.
 * 3. Passes the original question through RunnablePassthrough().
 * 4. Uses the retrievalChain to retrieve relevant documents based on the standalone question.
 * 5. Uses the answerGenerationChain to generate the final answer based on the retrieved context and the original question.
 */
// ========================================================================================================
const mainRagChain = RunnableSequence.from([
  {
    standalone_question: standaloneQuestionChain,
    question: new RunnablePassthrough(),
    convo_history : ()=> history.map((str, idx) => (idx % 2 === 0 ? `Human: ${str}` : `AI: ${str}`)).join('\n'),
  },
  {
    context: retrievalChain,
    question: ({ question }) => question,
    convo_history: ({convo_history})=> convo_history,
    
  },
  answerGenerationChain,
]);

// ========================================================================================================
// --- Example Usage ---
// This is how you would run the entire RAG pipeline with a user's question.
// ========================================================================================================

  // const userQuestion1 = "Can you give a real-life example of how Stacks work?";
  // const userQuestion2 = "Where do we actually use Queues in everyday life?";
  // const userQuestion3 = "What are Arrays and how do they make coding easier?";
  const userQuestion = question;

  // Invoke the main RAG chain with the user's question.
  // In a real application, replace this with your actual invocation logic.
  // For now, this is a placeholder to show the structure.
  
  const finalAnswer = await mainRagChain.invoke({
    question: userQuestion,
  });

  return finalAnswer;
}
