import HomeIcon from "@mui/icons-material/Home";
import { useContext } from "react";
import { Link } from "react-router-dom";
import MobileSideBar from "./mobileSideBar";
import { SideBarContextAPI } from "../../context/toggleSideBar";

const SideBar = () => {
  const toggleContextData = useContext(SideBarContextAPI);
  const { sideBar } = toggleContextData;

  return (
    <>
      <MobileSideBar />;
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
    </>
  );
};

export default SideBar;
