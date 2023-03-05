import React, { useState, useContext } from "react";
import { Axios } from "../../utils/axiosInstance";
import { useLocation, useNavigate } from "react-router";
import Navbar from "../Navbar/Navbar";
import SideBar from "../sideBar/SideBar";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography/Typography";
import { AuthContextAPI } from "../../context/authContext";
import {
  addCredentialToLocalStorage,
  addTokenToLocalStorage,
} from "../../utils/localStorage";
import Avatar from "@mui/material/Avatar/Avatar";

const Login = () => {
  const [inputValues, setInputValue] = useState({
    email: "",
    password: "",
    authMssg: "",
  });
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser, userImg, setUserImg } = useContext(AuthContextAPI);
  const redirect = location.state?.path || "/";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = inputValues;
    if (!email || !password || !userImg) {
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
        addCredentialToLocalStorage([email, password, userImg]);
      })
      .then(() => {
        setInputValue((prev) => ({ ...prev, authMssg: "" }));
        setUser((prev) => ({ ...prev, loading: false }));
        navigate(redirect, { replace: true });
      })
      .catch((err) =>
        setInputValue((prev) => ({ ...prev, authMssg: err.response.data }))
      );
  };

  const addImage = () => {
    const filePath = document.getElementById("add-image") as HTMLInputElement;
    filePath.click();
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = function () {
        setUserImg(reader.result);
      };
      reader.onerror = function (error) {
        console.log("Error: ", error);
      };
    }
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
            <div className="site__logo">
              <input type="file" hidden id="add-image" onChange={handleFile} />
              <Typography sx={{ fontSize: "13px", marginBottom: "10px" }}>
                Click to add Image (required)
              </Typography>
              <Avatar
                sx={{
                  margin: "0 auto",
                  cursor: "pointer",
                  height: "5rem",
                  width: "5rem",
                }}
                onClick={addImage}
                src={userImg}
              />
            </div>

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
                  value="Log in"
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
