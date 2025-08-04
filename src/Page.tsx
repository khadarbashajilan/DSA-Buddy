import { ChevronRightCircle } from "lucide-react";
import { useState } from "react";
import { gemini } from "./challenge"; // Import the gemini function

const Page = () => {
  const [human, sethuman] = useState("");
  const [convoHistory, setconvoHistory] = useState<string[]>([]);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setconvoHistory((prev) => [...prev, human]);
    const ans = await gemini(human, convoHistory);
    setconvoHistory((prev) => [...prev, ans]);
    sethuman("");
    console.log(ans);
    console.log(convoHistory)
  };
  return (
    <>
      <main className="overflow-hidden p-2 h-screen">
        <div className="h-[88vh] md:h-[95vh] gap-2 w-full flex flex-col  rounded-2xl border-5 p-4 overflow-hidden">
          <center className="flex flex-col justify-center text-center h-full items-center">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold">
              Stuck on a data structure? Let’s simplify it together!
            </h1>
          </center>
          <div className="flex flex-col gap-3 justify-end h-full">
            <div className="flex *:cursor-pointer flex-wrap justify-center gap-2 text-center *:text-center *:bg-gray-100 *:hover:bg-gray-200 *:text-gray-800 *:font-semibold *:py-5 *:px-6 *:rounded-3xl *:text-sm *:md:text-base ">
              {" "}
              {/* Flexbox for horizontal prompts, wrap for overflow */}
              <p className="md:py-10 md:h-30  ">
                Can you give a real-life example of how Stacks work?
              </p>
              <p className="md:py-10 md:h-30 ">
                What are Arrays and how do they make coding easier?
              </p>
              <p className="md:py-10 md:h-30 ">
                Where do we actually use Queues in everyday life?
              </p>
            </div>
            <form
              className="rounded-4xl flex items-center gap-2 w-full py-2 px-4 border-2"
              onSubmit={(e) => handleSubmit(e)}
            >
              <input
                type="text"
                value={human}
                onChange={(e) => sethuman(e.target.value)}
                className="w-full h-12 md:h-16 lg:h-20 lg:text-2xl md:text-xl outline-none shadow-none"
                placeholder="Ask me anything about Data Structures..."
              />
              <button aria-label="Send">
                <ChevronRightCircle className="size-8 md:size-10 cursor-pointer" />
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default Page;
