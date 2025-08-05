import { createContext, useContext, useEffect, useRef, useState } from "react";
import { gemini } from "../challenge";

const BotContext = createContext(undefined);

export default function BotProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [submited, setIsSubmitted] = useState<boolean>(false);
  const [responses, setResponses] = useState<string[]>([
    "Hello! How can I help you today?",
    "I'm here to answer questions about data structures.",
    "What would you like to know?",
    "I can explain concepts, provide examples, or help with algorithms.",
    "Let's get started!",
    "What data structure are you interested in?",
    "I can help with arrays, linked lists, trees, graphs, and more.",
    "What's your favorite data structure?",
    "I'm always learning new things about data structures.",
    "What's the most important data structure you've learned?",
    "Hello! How can I help you today?",
    "I'm here to answer questions about data structures.",
    "What would you like to know?",
    "I can explain concepts, provide examples, or help with algorithms.",
    "Let's get started!",
    "What data structure are you interested in?",
    "I can help with arrays, linked lists, trees, graphs, and more.",
    "What's your favorite data structure?",
    "I'm always learning new things about data structures.",
    "What's the most important data structure you've learned?",
  ]);
  const scrollref = useRef<HTMLDivElement>(null);
  function setSubmitted(ans: string) {
    setIsSubmitted(true);
    setResponses((prev) => [...prev, ans]);
  }
  /**
   * Automatically scrolls the chat container to the bottom whenever new responses are added.
   * This effect runs whenever the responses array changes, ensuring the most recent message
   * is always visible to the user.
   */
  const [delay, setdelay] = useState(false);
  useEffect(() => {
    const scrollElement = scrollref.current;
    if (scrollElement) {
      /**
       * Scrolls the chat container to the bottom to ensure the most recent message is visible.
       * This is done by setting the scrollTop property to the scrollHeight, which forces
       * the container to scroll to its maximum scroll position.
       */
      scrollElement.scrollTop = scrollElement.scrollHeight;
    }
    setdelay(true);
    setTimeout(() => {
      setdelay(false);
    }, 1000);
  }, [responses]);

  //form : 

  const [convoHistory, setconvoHistory] = useState<string[]>([]);
  const [human, sethuman] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    setSubmitted(human);
    setconvoHistory((prev) => [...prev, human]);
    sethuman("");
    const ans = await gemini(human, convoHistory);
    setSubmitted(ans!);
    console.log(ans);
  };

  //prompts:
   const promptslist = {
    1: "Can you give a real-life example of how Stacks work? ",
    2: "What are Arrays and how do they make coding easier?",
    3: "Where do we actually use Queues in everyday life?",
  };
  
  return (
    <BotContext.Provider
     value={{
        responses: responses,
        setSubmitted:setSubmitted ,
        scrollref:scrollref,
        delay:delay,
        setdelay:setdelay,
        submited:submited,
        setIsSubmitted:setIsSubmitted,
        setResponses:setResponses,
        handleSubmit:handleSubmit,
        convoHistory:convoHistory,
        setconvoHistory:setconvoHistory,
        human:human,
        sethuman:sethuman, 
        promptslist:promptslist
      }}
      >
   {children}
   </BotContext.Provider>   
);
}

export function useBotContext() {
  const context = useContext(BotContext);
  if (!context) {
    throw new Error("useBotContext must be used within a BotProvider");
  }
  return context;
}

