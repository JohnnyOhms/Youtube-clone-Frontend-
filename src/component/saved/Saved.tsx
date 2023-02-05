import React from "react";
import VideoSection from "../video section/VideoSection";
import Navbar from "../Navbar/Navbar";
import SideBar from "../sideBar/SideBar";
import Category from "../categories/category";

const Saved = () => {
  return (
    <React.Fragment>
      <Navbar />
      <SideBar />
      <div className="saved-video">
        <VideoSection videos={undefined} />
      </div>
    </React.Fragment>
  );
};

export default Saved;
