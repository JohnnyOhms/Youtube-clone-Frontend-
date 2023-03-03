import React, { useState, useEffect } from "react";
import { Axios } from "../../utils/axiosInstance";
import { useNavigate, useParams } from "react-router";
import Navbar from "../Navbar/Navbar";
import SideBar from "../sideBar/SideBar";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography/Typography";

const ResetPassword = () => {
  const [inputValues, setInputValue] = useState({
    Password: "",
    ConfirmPassword: "",
    authMssg: "",
  });
  const { _id, token } = useParams();
  const navigate = useNavigate()

  useEffect(() => {
    Axios.post("/auth/reset-password", {
      _id,
      token,
    }).catch((err) => console.log(err));
  }, [_id, token]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { Password, ConfirmPassword } = inputValues;
    if (!Password || !ConfirmPassword) {
      return alert("fields cannot be empty");
    }
    if (Password.trim() !== ConfirmPassword.trim()) {
      return alert("passwords did not match");
    }

    Axios.put("/auth/confirm-reset-password", {
      _id,
      ConfirmPassword,
    }).then(res => {
      alert("Password Updated")
      navigate("/auth/login")
    })
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
            <h2>Reset Password</h2>

            <form className="form" onSubmit={handleSubmit}>
              <div className="form__field">
                <input
                  type="text"
                  placeholder="enter password"
                  value={inputValues.Password}
                  onChange={(e) =>
                    setInputValue((prev) => ({
                      ...prev,
                      Password: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="form__field">
                <input
                  type="text"
                  placeholder="confirm password@"
                  value={inputValues.ConfirmPassword}
                  onChange={(e) =>
                    setInputValue((prev) => ({
                      ...prev,
                      ConfirmPassword: e.target.value,
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

export default ResetPassword;
