import React from "react";
import { useAppSelector } from "../../hooks/hooks";
import Video from "../video/video";
import { DisplayVideoType } from "../../utils/types";
import ErrorMssg from "../error/errorMssg";
import Loader from "../loader/Loader";

const VideoSection = () => {
  const videos = useAppSelector((state) => state.video.videoResult);
  const error = useAppSelector((state) => state.video.erroMssg);
  const loading = useAppSelector((state) => state.video.loading);

  return (
    <div className="video-section">
      {error && <ErrorMssg />}
      {loading && <Loader />}
      {videos &&
        videos?.map((item, index) => {
          return (
            <Video
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
  );
};

export default VideoSection;
