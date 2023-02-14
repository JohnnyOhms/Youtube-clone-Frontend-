import React, { useContext } from "react";
import { Avatar, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { red } from "@mui/material/colors";
import MicOffIcon from "@mui/icons-material/MicOff";
import MicIcon from "@mui/icons-material/Mic";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAppDispatch } from "../../hooks/hooks";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { contextType } from "../../utils/types";
import { ContextAPI } from "../../context/context";
import { showNotification } from "../../slice/notificationSlice";
import { SideBarContextAPI } from "../../context/toggleSideBar";

const Navbar = () => {
  const toggleContextData = useContext(SideBarContextAPI);
  const { toggleDrawer } = toggleContextData;
  const [inputValue, setInputValue] = React.useState<string>("");
  const { transcript, resetTranscript, listening } = useSpeechRecognition();
  const navigate = useNavigate();
  const dataContext = React.useContext<contextType>(ContextAPI);
  const dispatch = useAppDispatch();

  const handleSubmit = (
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    if (!inputValue) return;
    if (listening) SpeechRecognition.stopListening();
    resetTranscript();
    setInputValue("");
    dataContext.setInputValue(inputValue);
    navigate("/search");
  };

  const listenContinuously = () => {
    SpeechRecognition.startListening({
      continuous: true,
      language: "en-GB",
    });
  };

  const voiceSearch = () => {
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
      console.log(
        "Your browser does not support speech recognition software! Try Chrome desktop, maybe?"
      );
      return;
    }
    if (listening) {
      SpeechRecognition.stopListening();
      dispatch(showNotification({ message: "now recording...", open: true }));
    } else {
      listenContinuously();
      setInputValue(transcript);
      dispatch(showNotification({ message: "recording stop...", open: true }));
    }
  };

  return (
    <header>
      <nav id="main-nav">
        <div className="left-icons" style={{ display: "flex" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleDrawer("left", true)}
            sx={{ ml: 1, display: { xs: "block", sm: "block", md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <div className="logo">
            <Link to="/" style={{ zIndex: 2 }}>
              <YouTubeIcon sx={{ color: red[500], fontSize: "30px" }} />
            </Link>
            <div
              style={{
                width: "20px",
                height: "10px",
                background: "#ffff",
                position: "absolute",
                top: 26,
                marginLeft: "3px",
              }}
            />
            <span className="youtube-name">YouTube</span>
          </div>
        </div>

        <form onSubmit={(e) => handleSubmit(e)} className="search-bar">
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue || transcript}
          />
          <button className="search-icon" style={{ cursor: "pointer" }}>
            <SearchIcon sx={{ margin: "auto", color: "white" }} />
          </button>
        </form>

        <div className="right-icons">
          {listening ? (
            <MicOffIcon
              sx={{
                borderRadius: "50%",
                cursor: "pointer",
                p: 1,
                marginRight: "20px",
                fontSize: "37px",
                "&:hover": { background: "grey" },
              }}
              onClick={voiceSearch}
            />
          ) : (
            <MicIcon
              sx={{
                borderRadius: "50%",
                cursor: "pointer",
                p: 1,
                marginRight: "20px",
                fontSize: "37px",
                "&:hover": { background: "grey" },
              }}
              onClick={voiceSearch}
            />
          )}

          <Avatar />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
