import FormTSX from "./components/FormTSX";
import Header from "./components/Header";
import Prompts from "./components/Prompts";
import { useBotContext } from "./context/BotContext";

const Page = () => {
  const {submited, scrollref, responses, delay} = useBotContext();
 
  return (
    <>
      <main className="  justify-around p-2 h-screen">
        <div className="h-[88vh] justify-end md:h-[95vh] bg-gray-100 gap-3 border-3 w-full flex flex-col items-center rounded-2xl p-4">
          {!submited ? (
            <>
              <Header />
              <div className="flex md:mb-10 flex-col gap-5 items-center justify-end h-full">
                <Prompts />
              </div>
            </>
          ) : (
            <div
              className="flex flex-col gap-4 w-[90%] overflow-y-auto scrollbar-hide items-center"
              ref={scrollref}
              style={{ scrollbarWidth: "none" }}
            >
              <div className=" flex flex-col justify-end md:w-[90%] lg:w-[88%] w-[100%] gap-3 md:text-sm text-[12px] lg:text-md font-medium  ">
                {responses.slice().map((response, index) => (
                  <>
                    {index % 2 != 0 ? (
                      <>
                        <div
                          key={index}
                          className="self-start  rounded-2xl p-3 px-2 "
                        >
                          {delay && index === responses.length - 1 ? " ... ": response}
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
          )}
          <FormTSX /> {/* Corrected prop passing */}
        </div>
      </main>
    </>
  );
};
export default Page;
