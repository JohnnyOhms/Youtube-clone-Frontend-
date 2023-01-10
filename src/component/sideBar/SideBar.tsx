import { Stack } from "@mui/material";
import React from "react";
import { sideBarItem } from "../../utils/data";

const SideBar = () => {
  const sideBar = sideBarItem.map((item, index) => {
    return (
      <li key={index}>
        <a href="#" className="active">
          <span className="icon">
            <item.icon />
          </span>
          <span className="item">{item.name}</span>
        </a>
      </li>
    );
  });
  return (
    <div className="wrapper">
      <div className="sidebar">
        <ul>{sideBar}</ul>
      </div>
    </div>
  );
};

export default SideBar;
