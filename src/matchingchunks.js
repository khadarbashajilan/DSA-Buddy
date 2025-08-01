import "dotenv/config";
import { PromptTemplate } from "@langchain/core/prompts";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai' 
import { SupabaseVectorStore } from '@langchain/community/vectorstores/supabase'
import { createClient } from "@supabase/supabase-js";


const client = createClient(process.env.VITE_SBURL, process.env.VITE_SBAPI)
const llm = new ChatGoogleGenerativeAI({ model: "gemini-1.5-flash", apiKey: process.env.VITE_LLM_API_KEY,});    
const embeddings = new GoogleGenerativeAIEmbeddings({apiKey: process.env.VITE_LLM_API_KEY,})
const vectorStore = new SupabaseVectorStore(embeddings,{
    client,
    tableName: 'documents',
    queryName: 'match_documents'
})

try{
    
    const retriever = vectorStore.asRetriever();
    
    const standaloneQuestionTemplate = 'Given a question, convert it to a standalone question. question: {question} standalone question:'

    const standaloneQuestionPrompt = PromptTemplate.fromTemplate(standaloneQuestionTemplate)

    const standaloneQuestionChain = standaloneQuestionPrompt.pipe(llm)

// const response = await standaloneQuestionChain.invoke({
//         question: 'What are the technical requirements for running Scrimba? I only have a very old laptop which is not that powerful.'
//     })
    
    const response2 = await retriever.invoke('hi')
    
    console.log(response2)
}
    catch(e){
        console.log("ERROROR"+e);
    }