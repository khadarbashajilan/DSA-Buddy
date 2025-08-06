import { createContext, useContext, useEffect, useRef, useState } from "react";
import { gemini } from "../apiresponse/apiresponse";
import type { BotContextType } from "../types/type";
import { testGeminiConnection } from "../testapi/test";

const BotContext = createContext<BotContextType | undefined>(undefined);
// Custom hook to access the bot context
export default function BotProvider({
  children,
}: {
  children: React.ReactNode;
}) {

//Error state
 const [Error, setError] = useState<boolean>(false);

 const test = async () =>{
  const isError = await testGeminiConnection();
  setError(isError);
 } 


  // State to track if the form has been submitted
  const [submited, setIsSubmitted] = useState<boolean>(false);
  // State to manage the delay between responses
  const [delay, setdelay] = useState(false);
  // Reference to the scrollable container
  const scrollref = useRef<HTMLDivElement>(null);
  // Title for the chat interface
  const title: string =
    "Stuck on a data structure? Let’s simplify it together!";
  // State to store the responses from the chatbot
  const [responses, setResponses] = useState<string[]>([]);
  // Function to add a new response to the responses array
  function setSubmitted(ans: string) {
    setIsSubmitted(true);
    setResponses((prev) => [...prev, ans]);
  }

  //form :
// State to store the user's input
  const [convoHistory, setconvoHistory] = useState<string[]>([]);
  const [human, sethuman] = useState("");

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (human.trim() === "") return;
    setSubmitted(human.trim());
    setconvoHistory((prev) => [...prev, human]);
    sethuman("");
    const ans = await gemini(human, convoHistory);
    setSubmitted(ans!);
    console.log(ans);
  };

  //Prompts
  const promptslist = {
    1: "Can you give a real-life example of how Stacks work? ",
    2: "What are Arrays and how do they make coding easier?",
    3: "Where do we actually use Queues in everyday life?",
  };

  // Function to handle prompt click
  async function handlePromptClick(prompt: string) {
    setResponses((prev) => [...prev, prompt]);
    setIsSubmitted(true);
    const ans = await gemini(prompt, convoHistory);
    setSubmitted(ans!);
  }

  
  useEffect(() => {
    const scrollElement = scrollref.current;
    if (scrollElement) {
      /**
       * Scrolls the chat container to the bottom to ensure the most recent message is visible.
       * This is done by setting the scrollTop property to the scrollHeight, which forces
       * the container to scroll to its maximum scroll position.
       */
      // Add a small delay to ensure the content has been rendered
      setTimeout(() => {
                // Scroll the parent element to the bottom of the scroll element
        scrollElement.parentElement!.scrollTop = scrollElement!.scrollHeight;
      }, 100);
    }
        // Set the delay state to true to indicate that a delay is in progress
    setdelay(true);
        // After 1 second, set the delay state to false to indicate that the delay has completed
    setTimeout(() => {
      setdelay(false);
    }, 1000);
    test();
  }, [responses]);

  return (
    // Provide the context values to the children components
    <BotContext.Provider
      value={{
        responses,
        setSubmitted,
        scrollref,
        delay,
        setdelay,
        submited,
        setIsSubmitted,
        setResponses,
        handleSubmit,
        convoHistory,
        setconvoHistory,
        human,
        sethuman,
        promptslist,
        handlePromptClick,
        title,
        Error,
      }}
    >
      {children}
    </BotContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useBotContext() {
  // Use the useContext hook to access the BotContext
  const context = useContext(BotContext);
  if (!context) {
    throw new Error("useBotContext must be used within a BotProvider");
  }
  return context;
}
