import { createContext } from "react";
import { contextType } from "../utils/types";
import { useAppSelector } from "../hooks/hooks";

const contextData = {
  inputValue: "",
  avatarImg: "",
  channelId: "",
};

export const ContextAPI = createContext<contextType>(contextData);
const Context = ({ children }: any) => {
  const notify = useAppSelector((state) => state.notification.open);
  console.log(notify);
  return (
    <ContextAPI.Provider value={contextData}>{children}</ContextAPI.Provider>
  );
};

export default Context;
