import React from "react";
import { useAppSelector } from "../../hooks/hooks";
import Video from "../video/video";
import { DisplayVideoType } from "../../utils/types";

const VideoSection = () => {
  const videos = useAppSelector((state) => state.video.videoResult);
  console.log(videos);

  return (
    <div className="video-section">
      {videos &&
        videos?.map((item) => {
          return (
            <Video
              key={item.id.videoId}
              id={item.id.videoId}
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
