import * as React from "react";
import { useContext } from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { SideBarContextAPI } from "../../context/toggleSideBar";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import { sideBarItem } from "../../utils/data";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import { AuthContextAPI } from "../../context/authContext";
import {
  deleteTokenFromLocalStorage,
  deleteUserFromLocalStorage,
} from "../../utils/localStorage";

type Anchor = "left";

export default function MobileSideBar() {
  const { toggleDrawer, state, handleClick } = useContext(SideBarContextAPI);
  const { user, setUser, setUserImg } = useContext(AuthContextAPI);

  const list = (anchor: Anchor) => (
    <Box
      sx={{
        width: 250,
        background: "#151414",
        color: "white",
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List sx={{ background: "#151414", height: "100vh" }}>
        <Link to="/" style={{ color: "white" }}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon
                sx={{
                  color: "white",
                  "&:hover": {
                    color: "#dee4ec",
                    background: "grey",
                    borderRight: "2px solid #000",
                    borderRadius: "10px",
                  },
                }}
              >
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
        </Link>
        {sideBarItem.map((item, index) => (
          <Link
            key={index}
            to={
              item.name === "Saved Videos"
                ? "/saved_videos"
                : `/PlayList?filter=${item.name}`
            }
            onClick={(event) => handleClick(event, item.name)}
            style={{ color: "white" }}
          >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon sx={{ color: "white" }}>
                  {index === 0 && <LocalFloristIcon />}
                  {index === 1 && <LocalFireDepartmentIcon />}
                  {index === 2 && <OndemandVideoIcon />}
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
        {/* auth tab */}
        {!user.user && (
          <Link to="/auth/register" style={{ color: "white" }}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon sx={{ color: "white" }}>
                  <MeetingRoomIcon />
                </ListItemIcon>
                <ListItemText primary="Login" />
              </ListItemButton>
            </ListItem>
          </Link>
        )}
        {user.user && (
          <Link
            to="/"
            style={{ color: "white" }}
            onClick={() => {
              setUser({ user: "", token: "", loading: false });
              deleteTokenFromLocalStorage();
              deleteUserFromLocalStorage();
              setUserImg("");
            }}
          >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon sx={{ color: "white" }}>
                  <MeetingRoomIcon />
                </ListItemIcon>
                <ListItemText primary="Log out" />
              </ListItemButton>
            </ListItem>
          </Link>
        )}
        {/*  */}
      </List>
    </Box>
  );

  return (
    <div>
      {(["left"] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}
