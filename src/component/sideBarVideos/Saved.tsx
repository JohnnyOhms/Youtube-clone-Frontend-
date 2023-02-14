import React from "react";
import Navbar from "../Navbar/Navbar";
import SideBar from "../sideBar/SideBar";

const Saved = () => {
  return (
    <React.Fragment>
      <Navbar />
      <SideBar />
      <div className="sideBar-video">
        {/* saved component to be passed here */}
      </div>
    </React.Fragment>
  );
};

export default Saved;
