import { ChevronRightCircle } from "lucide-react";
import { useBotContext } from "../context/BotContext";

  type FormProps = {
  setSubmitted: (ans:string) => void; 
};

const FormTSX = ({setSubmitted}:FormProps) => {
  const {handleSubmit, sethuman, human} = useBotContext();
  return (
    <form
      className="rounded-4xl md:w-[80%] sm:w-[75%] flex items-center gap-2 py-2 px-4 border-2"
      onSubmit={(e) => handleSubmit(e)}
    >
      <input
        type="text"
        value={human}
        onChange={(e) => sethuman(e.target.value)}
        className=" w-full px-3 h-12 lg:h-20 lg:text-xl md:text-md outline-none shadow-none"
        placeholder="Ask me anything about Data Structures..."
      />
      <button aria-label="Send">
        <ChevronRightCircle className="size-8 md:size-10 cursor-pointer" />
      </button>
    </form>
  );
};

export default FormTSX;
