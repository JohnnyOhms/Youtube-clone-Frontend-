import { useEffect, useContext } from "react";
import Navbar from "../Navbar/Navbar";
import SideBar from "../sideBar/SideBar";
import Category from "../categories/category";
import VideoSection from "../video section/VideoSection";
import { useAppSelector, useAppDispatch } from "../../hooks/hooks";
import MobileSideBar from "../sideBar/mobileSideBar";
import {
  addCredentialToLocalStorage,
  addTokenToLocalStorage,
  deleteTokenFromLocalStorage,
  getUserFromLocalStorage,
} from "../../utils/localStorage";
import { AuthContextAPI } from "../../context/authContext";
import { Axios } from "../../utils/axiosInstance";

const Main = () => {
  const videos = useAppSelector((state) => state.video.videoResult);
  const error = useAppSelector((state) => state.video.erroMssg);
  const loading = useAppSelector((state) => state.video.loading);
  const dispatch = useAppDispatch();
  const { user, setUser, setUserImg } = useContext(AuthContextAPI);
  const credentials = getUserFromLocalStorage();

  useEffect(() => {
    if (!user.token) {
      deleteTokenFromLocalStorage();
    }

    if (!user.user && localStorage.getItem("user")) {
      // auto Login
      Axios.post("/auth/login", {
        email: credentials[0],
        password: credentials[1],
      })
        .then((res) => {
          setUser({
            user: res.data.user.user,
            token: res.data.user.token,
            loading: true,
          });

          addTokenToLocalStorage(res.data.user.token);
        })
        .then(() => {
          setUserImg(credentials[2]);
          setUser((prev) => ({ ...prev, loading: false }));
        });
    }
  }, [dispatch]);

  return (
    <div className="main">
      <Navbar />
      <SideBar />
      <MobileSideBar />;
      <Category />
      <VideoSection videos={videos} error={error} loading={loading} />
    </div>
  );
};

export default Main;
