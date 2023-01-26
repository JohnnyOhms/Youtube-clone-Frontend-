import React from "react";
import { useAppSelector } from "../../hooks/hooks";

const AlertBar = () => {
  const mssg = useAppSelector(state=>state.notification.message)
  return (
    <>
      <div className="alert">
        <input type="checkbox" id="alert1" />
        <label className="close" title="close" htmlFor="alert1">
          <i className="icon-remove"></i>
        </label>
        <p className="inner">
          <strong>Alert!</strong> {mssg}
        </p>
      </div>
    </>
  );
};

export default AlertBar;
