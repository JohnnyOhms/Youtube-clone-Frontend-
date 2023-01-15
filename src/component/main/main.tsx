import React from "react";
import Navbar from "../Navbar/Navbar";
import SideBar from "../sideBar/SideBar";
import Category from "../categories/category";
import VideoSection from "../video section/VideoSection";
import { useAppSelector } from "../../hooks/hooks";

const Main = () => {
  const videos = useAppSelector((state) => state.video.videoResult);
  const error = useAppSelector((state) => state.video.erroMssg);
  const loading = useAppSelector((state) => state.video.loading);

  return (
    <div className="main">
      <Navbar />
      <SideBar />
      <Category />
      <VideoSection videos={videos} error={error} loading={loading} />
    </div>
  );
};

export default Main;
