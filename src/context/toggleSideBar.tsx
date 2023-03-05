import React from "react";
import { createContext } from "react";
import { Link } from "react-router-dom";
import { sideBarItem } from "../utils/data";
import { Anchor, sideBarContextType } from "../utils/types";
import { useAppDispatch } from "../hooks/hooks";
import { videoAPI } from "../slice/getAPIslice";

export let SideBarContextAPI: React.Context<sideBarContextType>;

const ContextSideBar = ({ children }: any) => {
  const [state, setState] = React.useState({
    left: false,
  });

  // functionality of side bar
  const dispatch = useAppDispatch();

  const handleClick = (event: React.MouseEvent, name: string) => {
    dispatch(videoAPI(`search?part=snippet,id&q=${name}`));
  };

  const sideBar = sideBarItem.map((item, index) => {
    return (
      <Link
        key={index}
        to={
          item.name === "Saved Videos"
            ? "/saved_videos"
            : `/playList?filter=${item.name}`
        }
        onClick={(event) => handleClick(event, item.name)}
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
  //

  // mobile screen side bar
  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };
  //

  const toggleContextData = {
    toggleDrawer,
    state,
    sideBar,
    handleClick,
  };

  SideBarContextAPI = createContext(toggleContextData);

  return (
    <SideBarContextAPI.Provider value={toggleContextData}>
      {children}
    </SideBarContextAPI.Provider>
  );
};

export default ContextSideBar;
