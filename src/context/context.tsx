import { createContext } from "react";
import { contextType } from "../utils/types";

const contextData = {
  inputValue: "",
  avatarImg: "",
  channelId: "",
};

export const ContextAPI = createContext<contextType>(contextData);
const Context = ({ children }: any) => {
  return (
    <ContextAPI.Provider value={contextData}>{children}</ContextAPI.Provider>
  );
};

export default Context;
