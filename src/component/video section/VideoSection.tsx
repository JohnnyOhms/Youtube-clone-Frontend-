import React from "react";
import { useAppSelector } from "../../hooks/hooks";

const VideoSection = () => {
  const videos = useAppSelector((state) => state.video.videoResult);
  console.log(videos);
  return <div className="video-section"></div>;
};

export default VideoSection;
