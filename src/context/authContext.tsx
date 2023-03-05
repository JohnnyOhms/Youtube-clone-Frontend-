import { createContext, useState } from "react";
import { AuthcontextType } from "../utils/types";

export let AuthContextAPI: React.Context<AuthcontextType>;

const AuthContext = ({ children }: any) => {
  const [user, setUser] = useState({
    user: "",
    token: "",
    loading: false,
  });
  const [userImg, setUserImg] = useState<any>("");

  const contextData = {
    user,
    setUser,
    userImg,
    setUserImg,
  };

  AuthContextAPI = createContext(contextData);

  return (
    <AuthContextAPI.Provider value={contextData}>
      {children}
    </AuthContextAPI.Provider>
  );
};

export default AuthContext;
