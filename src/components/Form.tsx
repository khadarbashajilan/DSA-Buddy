import React, { useState } from "react";
import { gemini } from "../challenge";
import { ChevronRightCircle } from "lucide-react";

type FormProps = {
  setSubmitted: () => void;   // the prop you expect
};

const Form = ({setSubmitted}:FormProps) => {
  const [convoHistory, setconvoHistory] = useState<string[]>([]);
  const [human, sethuman] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    setSubmitted();
    setconvoHistory((prev) => [...prev, human]);
    sethuman("");
    const ans = await gemini(human, convoHistory);
    // setconvoHistory((prev) => [...prev, ans]);
    console.log(ans);
  };
  return (
    <form
      className="rounded-4xl fixed bottom-10  lg:w-[95%] flex items-center gap-2 w-full  py-2 px-4 border-2"
      onSubmit={(e) => handleSubmit(e)}
    >
      <input
        type="text"
        value={human}
        onChange={(e) => sethuman(e.target.value)}
        className=" w-full h-12 lg:h-20 lg:text-xl md:text-md outline-none shadow-none"
        placeholder="Ask me anything about Data Structures..."
      />
      <button aria-label="Send">
        <ChevronRightCircle className="size-8 md:size-10 cursor-pointer" />
      </button>
    </form>
  );
};

export default Form;
