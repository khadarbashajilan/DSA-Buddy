import { useState } from "react";
import Form from "./components/Form";
import Header from "./components/Header";
import Prompts from "./components/Prompts";

const Page = () => {
 const [submited, setIsSubmitted] = useState<boolean>(false);
  function setSubmitted() {
    setIsSubmitted((prev)=> !prev);
  }
  return (
    <>
      <main className="overflow-hidden  justify-around p-2 h-screen">
        <div className="h-[88vh] md:h-[95vh] gap-2 border-3 w-full flex flex-col  rounded-2xl p-4 overflow-hidden">
          {!submited && (
            <>
              <Header />
              <div className="flex flex-col gap-5 items-center justify-end h-full">
                <Prompts />
              </div>
            </>
          )}
            <Form setSubmitted={setSubmitted} />
          </div>
      </main>
    </>
  );
};

export default Page;
