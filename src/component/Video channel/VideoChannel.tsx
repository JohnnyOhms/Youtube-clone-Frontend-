import React from "react";
import { Box } from "@mui/material";
import Navbar from "../Navbar/Navbar";
import SideBar from "../sideBar/SideBar";
import { Avatar, Stack, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import VideoSection from "../video section/VideoSection";

const VideoChannel = () => {
  return (
    <React.Fragment>
      <Navbar />
      <SideBar />
      <Box
        // minHeight="95vh"
        sx={{
          marginTop: "10vh",
          marginLeft: { sm: "100vw", md: "35vh", lg: "30vh" },
        }}
      >
        <Box>
          <div
            style={{
              height: "180px",
              background:
                "linear-gradient(90deg, rgba(0,238,247,1) 0%, rgba(206,3,184,1) 100%, rgba(0,212,255,1) 100%)",
              zIndex: 10,
            }}
          />
        </Box>
        <Stack direction="row" sx={{ justifyContent: "space-between" }}>
          <Stack direction="row" spacing={2} margin="20px">
            <Avatar />
            <Stack sx={{ marginTop: "5px" }}>
              <Typography variant="h6" sx={{ color: "white" }}>
                title
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "grey", fontSize: "18px", cursor: "pointer" }}
              >
                channel <CheckCircleIcon sx={{ fontSize: 10 }} />
              </Typography>
            </Stack>
          </Stack>
          <Typography
            variant="body2"
            sx={{ color: "grey", fontSize: "15px", margin: "1.5rem" }}
          >
            subscribers
          </Typography>
        </Stack>
      </Box>
      <VideoSection />
    </React.Fragment>
  );
};

export default VideoChannel;
