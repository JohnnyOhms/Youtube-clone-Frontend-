import HomeIcon from "@mui/icons-material/Home";
import React from "react";
import { sideBarItem } from "../../utils/data";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const SideBar = () => {
  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault();
    console.log(useParams);
  };

  const sideBar = sideBarItem.map((item, index) => {
    return (
      <Link
        key={index}
        to={item.name === "Saved" ? "/saved_videos" : `?filter=${item.name}`}
        onClick={handleClick}
      >
        <li>
          <a className={`active ${item.name}`}>
            <span className="icon">
              <item.icon />
            </span>
            <span className="item">{item.name}</span>
          </a>
        </li>
      </Link>
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
