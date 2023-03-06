import React, { useEffect, useContext } from "react";
import { Avatar, Button, Stack, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ReactPlayer from "react-player";
import Video from "../video/video";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { videoAPI } from "../../slice/getAPIslice";
import { contextType, videoResult } from "../../utils/types";
import Loader from "../loader/Loader";
import ErrorMssg from "../error/errorMssg";
import Navbar from "../Navbar/Navbar";
import { RelatedVideoAPI } from "../../slice/getRelatedVideo";
import { ContextAPI } from "../../context/context";
import { Axios } from "../../utils/axiosInstance";
import MobileSideBar from "../sideBar/mobileSideBar";

const PlayVideo = (): JSX.Element => {
  const { videoId } = useParams();
  const dispatch = useAppDispatch();
  const dataContext = useContext<contextType>(ContextAPI);
  const { apiData, setApiData } = dataContext;
  const navigate = useNavigate();

  const video: videoResult<null> = useAppSelector(
    (state) => state.video.videoResult
  );

  useEffect(() => {
    dispatch(videoAPI(`videos?part=snippet,statistics&id=${videoId}`));
    // related videos
    dispatch(
      RelatedVideoAPI(
        `search?part=snippet&relatedToVideoId=${videoId}&type=video`
      )
    );
  }, [dispatch]);

  useEffect(() => {
    if (apiData.title) {
      return;
    }
    if (video) {
      setApiData({
        title: video[0].snippet.title,
        channel: video[0].snippet.channelTitle,
        thumbnail: dataContext.avatarImg,
        videoId: videoId,
      });
    }
  }, [video]);

  let relatedVideo: videoResult<null> = useAppSelector(
    (state) => state.relatedVideo.videoResult
  );
  const loading = useAppSelector((state) => state.video.loading);
  const error = useAppSelector((state) => state.video.erroMssg);
  const loadingRelated = useAppSelector((state) => state.relatedVideo.loading);
  const errorRelated = useAppSelector((state) => state.relatedVideo.erroMssg);

  let title: string | undefined,
    channel: string | undefined,
    date: string | undefined;

  let play: JSX.Element;

  if (video) {
    title = video[0].snippet.title;
    channel = video[0].snippet.channelTitle;
    date = video[0].snippet.publishTime;
  }

  const SaveVideo = () => {
    if (video) {
      Axios.post("/videos", {
        title: apiData.title,
        channel: apiData.channel,
        thumbnail: apiData.thumbnail,
        videoId: apiData.videoId,
      })
        .then((res) => {
          dataContext.setSavedVideos((prev: any) => {
            return [...prev, res.data.videos];
          });
          alert("Video saved, check on the saved bar to watch later");
        })
        .catch((err) => {
          if (err.message === "Request failed with status code 500") {
            alert("video already saved in Database");
          } else {
            alert(err.message);
          }

          console.log(err);
        });
    }
  };

  const videoPlayer: JSX.Element = (
    <Stack
      sx={{
        width: { sm: "100%", md: "100%", lg: "60rem" },
        height: "34rem",
        margin: { sm: 0, md: "20px", lg: "30px" },
        maxWidth: "60rem",
      }}
    >
      <ReactPlayer
        url={`https://www.youtube.com/watch?v=${videoId}`}
        controls
        height="100%"
        width="100%"
      />
      <Stack direction="row" sx={{ justifyContent: "space-between" }}>
        <Stack
          direction="row"
          spacing={2}
          margin="20px"
          sx={{ cursor: "pointer" }}
        >
          <Avatar
            sx={{
              ml: { sm: 0, md: "5px", lg: "5px" },
              marginRight: { sm: 0, md: "8px", lg: "8px" },
            }}
            src={dataContext.avatarImg}
          />

          <Stack sx={{ marginTop: { sm: "1px", md: "5px", lg: "5px" } }}>
            <Typography variant="h6" sx={{ color: "white" }}>
              {title?.substring(0, 40)}
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: "grey",
                fontSize: { sm: "13px", md: "18px", lg: "18px" },
                cursor: "pointer",
              }}
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
            fontSize: "12px",

            "&:hover": {
              background: "#807979",
              boder: "2px solid #e0e0e0",
            },
          }}
          onClick={SaveVideo}
        >
          Save
        </Button>
      </Stack>
    </Stack>
  );

  let showRelatedVideo: videoResult<null> = null;

  if (loading) {
    play = <Loader />;
  } else {
    if (error) {
      play = <ErrorMssg />;
    } else {
      play = videoPlayer;
      showRelatedVideo = relatedVideo;
    }
  }

  let relatedSection;

  if (loadingRelated) {
    relatedSection = <Loader />;
  } else {
    if (errorRelated) {
    } else {
      relatedSection = relatedVideo?.map((item, index) => {
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
      });
    }
  }
  return (
    <React.Fragment>
      <Navbar />
      <MobileSideBar />
      <div className="playVideo">
        <Stack
          sx={{
            height: "100%",
            width: "100%",
            background: "inherit",
            display: "flex",
            flexDirection: { sm: "column", md: "column", lg: "row" },
          }}
          spacing={2}
        >
          {play}
          <Stack
            sx={{
              width: { sm: "100%", md: "100px", lg: "25vw" },
            }}
            className="related-videos"
          >
            {relatedSection}
          </Stack>
        </Stack>
      </div>
    </React.Fragment>
  );
};

export default PlayVideo;
