import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { red } from "@mui/material/colors";
import { Stack } from "@mui/material";
import MicOffIcon from "@mui/icons-material/MicOff";
import MicIcon from "@mui/icons-material/Mic";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { videoAPI } from "../../slice/getAPIslice";
import { useAppDispatch } from "../../hooks/hooks";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { contextType } from "../../utils/types";
import { ContextAPI } from "../../context/context";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "20px",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  marginLeft: " 20px",
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  right: 0,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(2)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  paddingRight: "30px",
}));

function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [inputValue, setInputValue] = React.useState<string>("");
  const { transcript, resetTranscript, listening } = useSpeechRecognition();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const dataContext = React.useContext<contextType>(ContextAPI);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const dispatch = useAppDispatch();

  const handleSubmit = (
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    if (!inputValue) return;
    resetTranscript();
    setInputValue("");
    dataContext.inputValue = inputValue;
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
    } else {
      listenContinuously();
      // transValue += transcript;
      // setInputValue(transcript);
    }
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Stack
      position="fixed"
      sx={{ top: "0", left: "0", position: "fixed", width: "100vw", zIndex: 2 }}
    >
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <Link to="/" style={{ zIndex: 2 }}>
              <YouTubeIcon
                sx={{ fontSize: "50px", color: red[500], zIndex: 1 }}
              />
            </Link>
            <div
              style={{
                width: "20px",
                height: "20px",
                background: "#ffff",
                position: "absolute",
              }}
            ></div>
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            YouTube
          </Typography>
          <form
            onSubmit={(e) => handleSubmit(e)}
            style={{ marginRight: "15px" }}
          >
            <Search>
              <SearchIconWrapper
                onClick={(e) => handleSubmit}
                sx={{ cursor: "pointer" }}
              >
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                onChange={(e) => setInputValue(e.target.value)}
                value={inputValue || transcript}
                fullWidth
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </form>
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

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      {/* <Outlet /> */}
    </Stack>
  );
}

export default Navbar;
