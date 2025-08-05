
export type BotContextType = {
  responses: string[];
  setSubmitted: (ans: string) => void;
  scrollref:   React.RefObject<HTMLDivElement|null>;
  delay: boolean;
  setdelay: React.Dispatch<React.SetStateAction<boolean>>;
  submited: boolean;
  setIsSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
  setResponses: React.Dispatch<React.SetStateAction<string[]>>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  convoHistory: string[];
  setconvoHistory: React.Dispatch<React.SetStateAction<string[]>>;
  human: string;
  sethuman: React.Dispatch<React.SetStateAction<string>>;
  handlePromptClick:(prompt:string)=>void;
  title:string
  promptslist: {
    [key: number]: string;
  };
};
