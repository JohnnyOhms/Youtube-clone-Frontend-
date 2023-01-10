import { Avatar, Button, Stack, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import React from "react";
import ReactPlayer from "react-player";
import Video from "../video/video";

const PlayVideo = () => {
  return (
    <div className="playVideo">
      <Stack
        sx={{ height: "100%", background: "inherit" }}
        direction="row"
        spacing={2}
      >
        <div className="youtube-play">
          <ReactPlayer
            url="https://www.youtube.com/watch?v=8PjwMqDMjxI"
            controls
            height="100%"
            width="100%"
          />
          <Stack direction="row" sx={{ justifyContent: "space-between" }}>
            <Stack direction="row" spacing={2} margin="20px">
              <Avatar sx={{ ml: "5px", marginRight: "8px" }} />
              <Stack sx={{ marginTop: "5px" }}>
                <Typography variant="h6" sx={{ color: "white" }}>
                  new video
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "grey", fontSize: "18px", cursor: "pointer" }}
                >
                  Maroon 5 <CheckCircleIcon sx={{ fontSize: 10 }} />
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "grey", fontSize: "15px" }}
                >
                  25-06-2019
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
        <div className="related-videos">
          <Stack spacing={2}>
            <Video />
            <Video />
            <Video />
            <Video />
            <Video />
            <Video />
            <Video />
            <Video />
            <Video />
            <Video />
          </Stack>
        </div>
      </Stack>
    </div>
  );
};

export default PlayVideo;
