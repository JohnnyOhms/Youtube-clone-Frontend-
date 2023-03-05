import { useEffect, useContext } from "react";
import Navbar from "../Navbar/Navbar";
import SideBar from "../sideBar/SideBar";
import Category from "../categories/category";
import VideoSection from "../video section/VideoSection";
import { useAppSelector, useAppDispatch } from "../../hooks/hooks";
import MobileSideBar from "../sideBar/mobileSideBar";
import { deleteTokenFromLocalStorage } from "../../utils/localStorage";
import { AuthContextAPI } from "../../context/authContext";

const Main = () => {
  const videos = useAppSelector((state) => state.video.videoResult);
  const error = useAppSelector((state) => state.video.erroMssg);
  const loading = useAppSelector((state) => state.video.loading);
  const dispatch = useAppDispatch();
  const { user } = useContext(AuthContextAPI);

  useEffect(() => {
    if (!user.token) {
      deleteTokenFromLocalStorage();
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
