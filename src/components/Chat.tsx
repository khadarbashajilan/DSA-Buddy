import { useBotContext } from "../context/BotContext";

const Chat = () => {
  const { responses, scrollref, delay } = useBotContext();
  return (
    <div
      className="scroll-smooth py-2 flex flex-col gap-4 w-[90%] overflow-y-auto scrollbar-hide items-center"
      ref={scrollref}
      style={{ scrollbarWidth: "none" }}
    >
      <div className="md:py-8 py-4 flex flex-col justify-end md:w-[90%] lg:w-[88%] w-[100%] gap-3 md:text-[15px] text-[12px] lg:text-[18px] font-medium  ">
        {responses.slice().map((response, index) => (
          <>
            {index % 2 != 0 ? (
              <>
                <div key={index} className="self-start  rounded-2xl p-3 px-2 ">
                  {delay && index === responses.length - 1 ? " ... " : response}
                </div>
              </>
            ) : (
              <div
                key={index}
                className="self-end  rounded-2xl p-3 px-2 bg-gray-200 "
              >
                {" " + response}
              </div>
            )}
          </>
        ))}
      </div>
    </div>
  );
};

export default Chat;
