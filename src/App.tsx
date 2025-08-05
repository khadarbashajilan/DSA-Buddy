import Chat from "./components/Chat";
import Inputform from "./components/InputForm";
import Title from "./components/Title";
import Prompts from "./components/Prompts";
import { useBotContext } from "./context/BotContext";

const App = () => {
  const { submited } = useBotContext();

  return (
    <>
      <main className="justify-around p-2 h-screen">
        <div className="h-[88vh] justify-end md:h-[95vh] bg-gray-100 gap-3 border-3 w-full flex flex-col items-center rounded-2xl p-4">
          {!submited ? (
            <>
              <Title />
              <Prompts />
            </>
          ) : (
            <Chat />
          )}
          <Inputform />
        </div>
      </main>
    </>
  );
};
export default App;
