import HomeIcon from "@mui/icons-material/Home";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { SideBarContextAPI } from "../../context/toggleSideBar";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import { AuthContextAPI } from "../../context/authContext";
import { deleteTokenFromLocalStorage } from "../../utils/localStorage";

const SideBar = () => {
  const toggleContextData = useContext(SideBarContextAPI);
  const { sideBar } = toggleContextData;
  const { user, setUser } = useContext(AuthContextAPI);

  return (
    <>
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
            {!user.user && (
              <li>
                <Link to="/auth/register" className="active">
                  <span className="icon">
                    <MeetingRoomIcon />
                  </span>
                  <span className="item">Login</span>
                </Link>
              </li>
            )}
            {user.user && (
              <li
                onClick={() => {
                  setUser({ user: "", token: "", loading: false });
                  deleteTokenFromLocalStorage();
                }}
              >
                <Link to="/" className="active">
                  <span className="icon">
                    <MeetingRoomIcon />
                  </span>
                  <span className="item">Log Out</span>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default SideBar;
