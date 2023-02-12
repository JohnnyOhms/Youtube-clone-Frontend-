import React from "react";
import { createContext } from "react";

type Anchor = "top" | "left" | "bottom" | "right";
export let SideBarContextAPI: React.Context<{
  toggleDrawer: (
    anchor: Anchor,
    open: boolean
  ) => (event: React.KeyboardEvent | React.MouseEvent) => void;
  state: {
    left: boolean;
  };
}>;

const ContextSideBar = ({ children }: any) => {
  const [state, setState] = React.useState({
    left: false,
  });

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

  const toggleContextData = {
    toggleDrawer,
    state,
  };

  SideBarContextAPI = createContext(toggleContextData);

  return (
    <SideBarContextAPI.Provider value={toggleContextData}>
      {children}
    </SideBarContextAPI.Provider>
  );
};

export default ContextSideBar;
