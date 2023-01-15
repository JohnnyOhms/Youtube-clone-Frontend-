import HomeIcon from "@mui/icons-material/Home";
import React from "react";
import { sideBarItem } from "../../utils/data";
import { Link } from "react-router-dom";

const SideBar = () => {
  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault();
    console.log(event.target);
  };
  const sideBar = sideBarItem.map((item, index) => {
    return (
      <li key={index}>
        <a href="#" className="active" onClick={handleClick}>
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
        <ul>
          <li>
            <Link to="/" className="active">
              <span className="icon">
                <HomeIcon />
              </span>
              <span className="item">Home</span>
            </Link>
          </li>
          {sideBar}
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
