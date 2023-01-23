import React, { useContext, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import SideBar from "../sideBar/SideBar";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import VideoSection from "../video section/VideoSection";
import { videoAPI } from "../../slice/getAPIslice";
import { ContextAPI } from "../../context/context";
import { contextType } from "../../utils/types";

const SearchFeed = () => {
  const videos = useAppSelector((state) => state.video.videoResult);
  const error = useAppSelector((state) => state.video.erroMssg);
  const loading = useAppSelector((state) => state.video.loading);
  const dispatch = useAppDispatch();
  const dataContext = useContext<contextType>(ContextAPI);

  useEffect(() => {
    dispatch(videoAPI(`search?part=snippet,id&q=${dataContext.inputValue}`));
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <SideBar />
      <VideoSection videos={videos} error={error} loading={loading} />
    </div>
  );
};

export default SearchFeed;
