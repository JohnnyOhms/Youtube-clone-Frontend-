import React from "react";
import Navbar from "../Navbar/Navbar";
import SideBar from "../sideBar/SideBar";
import PlayListVideo from "./PlayListVideos";

const PlayList = () => {
  return (
    <div>
      <React.Fragment>
        <Navbar />
        <SideBar />
        <div className="sideBar-video">
          {/* saved component to be passed here */}
          <PlayListVideo />
        </div>
      </React.Fragment>
    </div>
  );
};

export default PlayList;
