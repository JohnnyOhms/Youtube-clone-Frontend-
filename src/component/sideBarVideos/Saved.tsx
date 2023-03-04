import React, { useState, useContext } from "react";
import Navbar from "../Navbar/Navbar";
import SideBar from "../sideBar/SideBar";
import { ContextAPI } from "../../context/context";
import { Axios } from "../../utils/axiosInstance";
import SavedVideo from "./savedVideo";
import { savedVideoPropType } from "../../utils/types";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

const Saved = () => {
  const { savedVideos, setSavedVideos, display, setDisplay } =
    useContext(ContextAPI);
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  const handleClick = () => {
    setDisplay((prev) => !prev);
    Axios.get("/videos")
      .then((res) => {
        setSavedVideos((prev: any) => {
          return prev._id === res.data.videos._id
            ? prev
            : [...prev, ...res.data.videos];
        });
      })
      .catch((err) => {
        alert("failed to load, refreash page");
        navigate("/");
      });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {};

  return (
    <React.Fragment>
      <Navbar />
      <SideBar />
      {display && (
        <React.Fragment>
          <form onSubmit={(e) => handleSubmit(e)} className="search-saved-bar">
            <input
              type="text"
              placeholder="Search"
              onChange={(e) => setInputValue(e.target.value)}
              value={inputValue}
            />
            <button className="search-icon" style={{ cursor: "pointer" }}>
              <SearchIcon sx={{ margin: "auto", color: "white" }} />
            </button>
          </form>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              "& > *": {
                m: 1,
              },
            }}
          >
            <Typography sx={{ color: "white" }}>Filter by</Typography>
            <ButtonGroup variant="outlined" aria-label="outlined button group">
              <Button sx={{ borderColor: "#df3434", color: "white" }}>
                latest
              </Button>
              <Button sx={{ borderColor: "#df3434", color: "white" }}>
                oldest
              </Button>
              <Button sx={{ borderColor: "#df3434", color: "white" }}>
                A-Z
              </Button>
              <Button sx={{ borderColor: "#df3434", color: "white" }}>
                Z-A
              </Button>
            </ButtonGroup>
          </Box>
        </React.Fragment>
      )}
      <div className="sideBar-video">
        <div className="form__field">
          <button className="show-saved-vidoes" onClick={handleClick}>
            {display ? "Hide details" : "Show details"}
          </button>
        </div>

        <>
          {savedVideos.map((item: savedVideoPropType) => {
            return (
              <SavedVideo
                channel={item.channel}
                title={item.title}
                thumbnail={item.thumbnail}
                createdAt={item.createdAt}
                videoId={item.videoId}
                _id={item._id}
                key={item._id}
              />
            );
          })}
        </>
      </div>
    </React.Fragment>
  );
};

export default Saved;
