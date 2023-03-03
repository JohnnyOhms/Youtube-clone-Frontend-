import React, { useState, useContext } from "react";
import { Axios } from "../../utils/axiosInstance";
import { useAppDispatch } from "../../hooks/hooks";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import SideBar from "../sideBar/SideBar";
import Avatar from "@mui/material/Avatar/Avatar";
import Typography from "@mui/material/Typography/Typography";
import { AuthContextAPI } from "../../context/authContext";

const Register = () => {
  const [inputValues, setInputValue] = useState({
    name: "",
    email: "",
    password: "",
    authMssg: "",
  });
  const [userImg, setUserImg] = useState<any>("");
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContextAPI);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, email, password } = inputValues;
    if (name === "" || email === "" || password === "") {
      return alert("input fields cannot be blank");
    }
    Axios.post("/auth/register", {
      name,
      email,
      password,
      userImg,
      headers: {
        "content-type": "multipart/form-data",
      },
    })
      .then((res) => {
        setUser({
          user: res.data.user.user,
          token: res.data.user.token,
          loading: true,
        });
        setInputValue((prev) => ({ ...prev, authMssg: "Acoount Created" }));
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

  const addImage = () => {
    const filePath = document.getElementById("add-image") as HTMLInputElement;
    filePath.click();
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUserImg(e.target.files[0]);
      //   // const reader = new FileReader();
      //   // reader.readAsDataURL(e.target.files[0]);
      //   // reader.onload = function () {
      //   //   setUserImg(reader.result);
      //   // };
      //   // reader.onerror = function (error) {
      //   //   console.log("Error: ", error);
      //   // };
    }
    console.log(e.target.files);
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
            <div className="site__logo">
              <input type="file" hidden id="add-image" onChange={handleFile} />
              <Typography sx={{ fontSize: "13px", marginBottom: "10px" }}>
                Click to add Image (optional)
              </Typography>
              <Avatar
                sx={{
                  margin: "0 auto",
                  cursor: "pointer",
                  height: "5rem",
                  width: "5rem",
                }}
                onClick={addImage}
                // src={userImg}
              />
            </div>

            <h2>Sign Up</h2>

            <form className="form" onSubmit={handleSubmit}>
              <div className="form__field">
                <input
                  type="text"
                  placeholder="Name"
                  value={inputValues.name}
                  onChange={(e) =>
                    setInputValue((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                />
              </div>
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
                  value="Register"
                  style={{ cursor: "pointer" }}
                />
              </div>
            </form>

            <Link to="/auth/login">
              <p>Already have an accout? login</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
