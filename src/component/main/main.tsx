import React from "react";
import Navbar from "../Navbar/Navbar";
import SideBar from "../sideBar/SideBar";
import Category from "../categories/category";
import VideoSection from "../video section/VideoSection";

const Main = () => {
  return (
    <div className="main">
      <Navbar />
      <SideBar />
      <Category />
      <VideoSection />
    </div>
  );
};

export default Main;
