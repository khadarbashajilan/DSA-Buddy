import { useBotContext } from "../context/BotContext";

const Prompts = () => {
 const {promptslist, handlePromptClick} = useBotContext();
  return (
    <div className="flex md:mb-10 flex-col gap-5 items-center justify-end h-full">
                <div className="flex *:cursor-pointer flex-wrap justify-center gap-2 text-center *:text-center *:bg-gray-200 *:hover:bg-gray-300 *:hover:transition-colors:duration-300 *:text-gray-800 *:font-semibold *:py-5 *:px-6 *:rounded-3xl *:text-sm *:md:text-base ">
                  {/* Flexbox for horizontal prompts, wrap for overflow */}
                  <p
                    onClick={() => handlePromptClick(promptslist[1])}
                    className="md:py-10 md:h-25  "
                  >
                    {promptslist[1]}
                  </p>
                  <p
                    onClick={() => handlePromptClick(promptslist[2])}
                    className="md:py-10 md:h-25 "
                  >
                    {promptslist[2]}{" "}
                  </p>
                  <p
                    onClick={() => handlePromptClick(promptslist[3])}
                    className="md:py-10 md:h-25 "
                  >
                    {promptslist[3]}{" "}
                  </p>
                </div>
              </div>
  );
};

export default Prompts;
