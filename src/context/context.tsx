import { createContext } from "react";
import { contextType } from "../utils/types";

export const ContextAPI = createContext<contextType>({ inputValue: "" });
const Context = ({ children }: any) => {
  const contextData = {
    inputValue: "",
  };
  return (
    <ContextAPI.Provider value={contextData}>{children}</ContextAPI.Provider>
  );
};

export default Context;
