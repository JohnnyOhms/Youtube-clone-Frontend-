import React, { useContext } from "react";
import { AuthContextAPI } from "../../context/authContext";
import { Navigate, useLocation } from "react-router";

const ProtectedRoute = ({ children }: any) => {
  const { user } = useContext(AuthContextAPI);
  const location = useLocation();
  if (!user.user) {
    alert("login your account");
    return <Navigate to="/auth/register" state={{ path: location.pathname }} />;
  }

  return children;
};

export default ProtectedRoute;
