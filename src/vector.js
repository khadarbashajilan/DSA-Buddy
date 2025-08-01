import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { createClient } from '@supabase/supabase-js'
import { SupabaseVectorStore } from '@langchain/community/vectorstores/supabase'
import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai' 
import { promises as fs } from 'fs'; // <-- This is the crucial import
import 'dotenv/config'

const fetchDataAndStoreEmbeddings = async () => {
  try {
    // THIS IS THE CORRECT LINE. It replaces the entire fetch() block.
    const text = await fs.readFile('data.txt', 'utf-8'); 

    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 100,
      separators: ["\n\n", "\n", " "]
    });
    
    const documents = await textSplitter.createDocuments([text]);
    
    console.log(`Successfully split document into ${documents.length} chunks.`);

    const supabase = createClient(
      process.env.VITE_SBURL,
      process.env.VITE_SBAPI
    );

    console.log("Supabase client initialized.");

    const vectorStore = await SupabaseVectorStore.fromDocuments(
      documents,
      new GoogleGenerativeAIEmbeddings({ apiKey: process.env.VITE_LLM_API_KEY }),
      {
        client: supabase,
        tableName: 'documents',
      }
    );
    
    console.log("Vector store successfully populated with Gemini embeddings.");

  } catch (error) { 
    console.error("Error fetching or processing data:", error);
  }
};

// fetchDataAndStoreEmbeddings();