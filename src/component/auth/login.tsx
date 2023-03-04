import React, { useState, useContext } from "react";
import { Axios } from "../../utils/axiosInstance";
import { useNavigate } from "react-router";
import Navbar from "../Navbar/Navbar";
import SideBar from "../sideBar/SideBar";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography/Typography";
import { AuthContextAPI } from "../../context/authContext";
import { addTokenToLocalStorage } from "../../utils/localStorage";

const Login = () => {
  const [inputValues, setInputValue] = useState({
    email: "",
    password: "",
    authMssg: "",
  });
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContextAPI);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = inputValues;
    if (!email || !password) {
      return alert("input fields cannot be blank");
    }

    Axios.post("/auth/login", {
      email,
      password,
    })
      .then((res) => {
        setUser({
          user: res.data.user.user,
          token: res.data.user.token,
          loading: true,
        });
        setInputValue((prev) => ({
          ...prev,
          authMssg: "Acoount Created",
        }));
        addTokenToLocalStorage(res.data.user.token);
      })
      .then(() => {
        setInputValue((prev) => ({ ...prev, authMssg: "" }));
        setUser((prev) => ({ ...prev, loading: false }));
        navigate("/");
      })
      .catch((err) =>
        setInputValue((prev) => ({ ...prev, authMssg: err.response.data }))
      );
  };

  return (
    <>
      <Navbar />
      <SideBar />
      <div className="root">
        <div className="grid align__item">
          <Typography sx={{ fontSize: "13px", marginBottom: "10px" }}>
            {inputValues.authMssg ? inputValues.authMssg : null}
          </Typography>
          <div className="register">
            <h2>Sign In</h2>

            <form className="form" onSubmit={handleSubmit}>
              <div className="form__field">
                <input
                  type="email"
                  placeholder="email@example.com"
                  value={inputValues.email}
                  onChange={(e) =>
                    setInputValue((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="form__field">
                <input
                  type="password"
                  placeholder="password"
                  value={inputValues.password}
                  onChange={(e) =>
                    setInputValue((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="form__field">
                <input
                  type="submit"
                  value="Sign In"
                  style={{ cursor: "pointer" }}
                />
              </div>
            </form>
            <Link to="/auth/register">
              <p>Don't have an accout? Register</p>
            </Link>
            <Link to="/auth/forgot-password">
              <p>Forgot password ? click Here</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
