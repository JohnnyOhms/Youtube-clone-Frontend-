import Video from "../video/video";
import { videoSection } from "../../utils/types";
import ErrorMssg from "../error/errorMssg";
import Loader from "../loader/Loader";

const VideoSection = ({ videos, error, loading }: videoSection) => {
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
