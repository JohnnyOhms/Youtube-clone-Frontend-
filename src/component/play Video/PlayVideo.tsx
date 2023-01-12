import React, { FC, useEffect, useState } from "react";
import { Avatar, Button, Stack, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ReactPlayer from "react-player";
import Video from "../video/video";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { videoAPI } from "../../slice/getAPIslice";
import { videoResult } from "../../utils/types";
import Loader from "../loader/Loader";
import ErrorMssg from "../error/errorMssg";
import Navbar from "../Navbar/Navbar";

const PlayVideo = () => {
  const [relatedVideo, setRelatedVideo] = useState<videoResult<null>>(null);
  const { videoId } = useParams();
  const dispatch = useAppDispatch();
  const video = useAppSelector((state) => state.video.videoResult);
  const loading = useAppSelector((state) => state.video.loading);
  const error = useAppSelector((state) => state.video.erroMssg);

  useEffect(() => {
    dispatch(videoAPI(`videos?part=snippet,statistics&id=${videoId}`));
  }, [dispatch]);

  let title: string | undefined,
    channel: string | undefined,
    date: string | undefined;

  if (video) {
    title = video[0].snippet.title;
    channel = video[0].snippet.channelTitle;
    date = video[0].snippet.publishTime;
  }

  const videoPlayer: JSX.Element = (
    <div className="youtube-play">
      <ReactPlayer
        url={`https://www.youtube.com/watch?v=${videoId}`}
        controls
        height="100%"
        width="100%"
      />
      <Stack direction="row" sx={{ justifyContent: "space-between" }}>
        <Stack direction="row" spacing={2} margin="20px">
          <Avatar sx={{ ml: "5px", marginRight: "8px" }} />
          <Stack sx={{ marginTop: "5px" }}>
            <Typography variant="h6" sx={{ color: "white" }}>
              {title?.substring(0, 40)}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "grey", fontSize: "18px", cursor: "pointer" }}
            >
              {channel} <CheckCircleIcon sx={{ fontSize: 10 }} />
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "grey", fontSize: "15px" }}
            >
              {date}
            </Typography>
          </Stack>
        </Stack>
        <Button
          variant="contained"
          endIcon={<ArrowDownwardIcon />}
          sx={{
            background: "#3a3636",
            color: "white",
            height: "50px",
            marginTop: "27px",
            margingRight: "20px",
            borderRadius: "2rem",

            "&:hover": {
              background: "#807979",
              boder: "2px solid #e0e0e0",
            },
          }}
        >
          Save to Favourite
        </Button>
      </Stack>
    </div>
  );

  let play: JSX.Element;

  if (loading) {
    play = <Loader />;
  } else {
    if (error) {
      play = <ErrorMssg />;
    } else {
      play = videoPlayer;
    }
  }

  return (
    <React.Fragment>
      <Navbar />
      <div className="playVideo">
        <Stack
          sx={{ height: "100%", background: "inherit" }}
          direction="row"
          spacing={2}
        >
          {play}

          <div className="related-videos">
            <Stack spacing={2}>
              {relatedVideo?.map((item, index) => {
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
            </Stack>
          </div>
        </Stack>
      </div>
    </React.Fragment>
  );
};

export default PlayVideo;
