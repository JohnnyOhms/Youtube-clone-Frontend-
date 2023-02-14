import { createContext, useState } from "react";
import { contextType } from "../utils/types";

export let ContextAPI: React.Context<contextType>;

const Context = ({ children }: any) => {
  const [inputValue, setInputValue] = useState<string>("");

  const contextData = {
    inputValue,
    setInputValue,
    avatarImg: "",
    channelId: "",
  };

  ContextAPI = createContext(contextData);

  return (
    <ContextAPI.Provider value={contextData}>{children}</ContextAPI.Provider>
  );
};

export default Context;
