import { createContext, useContext, useEffect, useRef, useState } from "react";
import { gemini } from "../challenge";
import type { BotContextType } from "../types/type";

const BotContext = createContext<BotContextType | undefined>(undefined);

export default function BotProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [submited, setIsSubmitted] = useState<boolean>(false);
  const [delay, setdelay] = useState(false);
  const scrollref = useRef<HTMLDivElement>(null);
  const title: string =
    "Stuck on a data structure? Let’s simplify it together!";
  const [responses, setResponses] = useState<string[]>([]);
  function setSubmitted(ans: string) {
    setIsSubmitted(true);
    setResponses((prev) => [...prev, ans]);
  }
  /**
   * Automatically scrolls the chat container to the bottom whenever new responses are added.
   * This effect runs whenever the responses array changes, ensuring the most recent message
   * is always visible to the user.
   */

  //form :

  const [convoHistory, setconvoHistory] = useState<string[]>([]);
  const [human, sethuman] = useState("");

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

  //prompts:
  const promptslist = {
    1: "Can you give a real-life example of how Stacks work? ",
    2: "What are Arrays and how do they make coding easier?",
    3: "Where do we actually use Queues in everyday life?",
  };

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
        scrollElement.parentElement!.scrollTop = scrollElement!.scrollHeight;
      }, 100);
    }
    setdelay(true);
    setTimeout(() => {
      setdelay(false);
    }, 1000);
  }, [responses]);

  return (
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
      }}
    >
      {children}
    </BotContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useBotContext() {
  const context = useContext(BotContext);
  if (!context) {
    throw new Error("useBotContext must be used within a BotProvider");
  }
  return context;
}
