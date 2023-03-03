import React, { useState } from "react";
import { Axios } from "../../utils/axiosInstance";
import { useNavigate } from "react-router";
import Navbar from "../Navbar/Navbar";
import SideBar from "../sideBar/SideBar";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography/Typography";

const ForgetPassword = () => {
  const [inputValues, setInputValue] = useState({
    email: "",
    authMssg: "",
  });
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email } = inputValues;
    if (!email) {
      return alert("provide an existing email to proceed");
    }

    Axios.post("/auth/forgot-password", {
      email,
    })
      .then((res) =>
        navigate(`/auth/reset-password/${res.data.id}/${res.data.token}`)
      )
      .catch((err) =>
        setInputValue((prev) => ({ ...prev, authMssg: err.response.data }))
      );
  };

  return (
    <React.Fragment>
      <Navbar />
      <SideBar />
      <div className="root">
        <div className="grid align__item">
          <Typography sx={{ fontSize: "13px", marginBottom: "10px" }}>
            {inputValues.authMssg ? inputValues.authMssg : null}
          </Typography>
          <div className="register">
            <h2>Provide Email to reset Password</h2>

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
                  type="submit"
                  value="Proceed"
                  style={{ cursor: "pointer" }}
                />
              </div>
            </form>
            <Link to="/auth/login">
              <p>Return to login</p>
            </Link>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ForgetPassword;
