import React from "react";
import { createContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { sideBarItem } from "../utils/data";

type Anchor = "top" | "left" | "bottom" | "right";
export let SideBarContextAPI: React.Context<{
  toggleDrawer: (
    anchor: Anchor,
    open: boolean
  ) => (event: React.KeyboardEvent | React.MouseEvent) => void;
  state: {
    left: boolean;
  };
  sideBar: JSX.Element[];
  handleClick: (event: React.MouseEvent, name: string) => void;
}>;

const ContextSideBar = ({ children }: any) => {
  const [state, setState] = React.useState({
    left: false,
  });
  // const navigate = useNavigate();

  // functionality of side bar
  const handleClick = (event: React.MouseEvent, name: string) => {
    // navigate("/");
    console.log(name);
    // event.preventDefault();
    // console.log(useParams);
  };

  const sideBar = sideBarItem.map((item, index) => {
    return (
      <Link
        key={index}
        to={item.name === "Saved" ? "/saved_videos" : `?filter=${item.name}`}
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
