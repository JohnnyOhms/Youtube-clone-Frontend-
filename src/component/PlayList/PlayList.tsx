import React from "react";
import Navbar from "../Navbar/Navbar";
import SideBar from "../sideBar/SideBar";
import PlayListVideo from "./PlayListVideos";
import { useAppSelector } from "../../hooks/hooks";
import ErrorMssg from "../error/errorMssg";
import Loader from "../loader/Loader";

const PlayList = () => {
  const videos = useAppSelector((state) => state.video.videoResult);
  const error = useAppSelector((state) => state.video.erroMssg);
  const loading = useAppSelector((state) => state.video.loading);
  return (
    <div>
      <React.Fragment>
        <Navbar />
        <SideBar />
        {error && <ErrorMssg />}
        {loading && <Loader />}
        <div className="sideBar-video">
          {videos &&
            videos?.map((item, index) => {
              return (
                <PlayListVideo
                  key={index}
                  id={item.id.videoId}
                  cahnnelId={item.snippet.channelId}
                  imageUrl={item.snippet.thumbnails.high.url}
                  title={item.snippet.title}
                  channel={item.snippet.channelTitle}
                  publishTime={item.snippet.publishTime}
                />
              );
            })}
        </div>
      </React.Fragment>
    </div>
  );
};

export default PlayList;
