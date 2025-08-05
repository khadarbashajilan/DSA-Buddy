import { useBotContext } from "../context/BotContext";

const Prompts = () => {
 const {promptslist} = useBotContext();
  return (
    <div className="flex *:cursor-pointer flex-wrap justify-center gap-2 text-center *:text-center *:bg-gray-100 *:hover:bg-gray-200 *:text-gray-800 *:font-semibold *:py-5 *:px-6 *:rounded-3xl *:text-sm *:md:text-base ">
      {/* Flexbox for horizontal prompts, wrap for overflow */}
      <p className="md:py-10 md:h-25  ">{promptslist[1]}</p>
      <p className="md:py-10 md:h-25 ">{promptslist[2]} </p>
      <p className="md:py-10 md:h-25 ">{promptslist[3]} </p>
    </div>
  );
};

export default Prompts;
