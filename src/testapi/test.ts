import { GoogleGenAI } from "@google/genai";

// Initialize the GoogleGenAI with your API key
const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_LLM_API_KEY,
});

export async function testGeminiConnection(): Promise<boolean> {
  try {
    await ai.models.generateContent({
      model: "gemini-2.0-flash-lite",
      contents: "Hi",
    });
    return false;
  } catch (error) {
    console.error("Error generating content:", error);
    return true;
  }
}

