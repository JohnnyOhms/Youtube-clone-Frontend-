import React, { useContext, useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import SideBar from "../sideBar/SideBar";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import VideoSection from "../video section/VideoSection";
import { videoAPI } from "../../slice/getAPIslice";
import { ContextAPI } from "../../context/context";
import { contextType } from "../../utils/types";
import { useSearchParams } from "react-router-dom";

const SearchFeed = () => {
  const videos = useAppSelector((state) => state.video.videoResult);
  const error = useAppSelector((state) => state.video.erroMssg);
  const loading = useAppSelector((state) => state.video.loading);
  const dispatch = useAppDispatch();
  const dataContext = useContext<contextType>(ContextAPI);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setSearchParams({ search_query: dataContext.inputValue });
    dispatch(videoAPI(`search?part=snippet,id&q=${dataContext.inputValue}`));
  }, [dataContext.inputValue]);

  return (
    <div>
      <Navbar />
      <SideBar />
      <div className="Category"></div>
      <VideoSection videos={videos} error={error} loading={loading} />
    </div>
  );
};

export default SearchFeed;
