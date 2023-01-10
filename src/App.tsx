import React from "react";
import Navbar from "./component/Navbar/Navbar";
import SideBar from "./component/sideBar/SideBar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Category from "./component/categories/category";
import VideoSection from "./component/video section/VideoSection";
import PlayVideo from "./component/play Video/PlayVideo";
import VideoChannel from "./component/Video channel/VideoChannel";
import SearchFeed from "./component/searchfeed/SearchFeed";
import { Provider } from "react-redux";
import { store } from "./store/store";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#151414",
      },
      secondary: {
        main: "#d88507",
      },
    },
  });

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Navbar />
          <SideBar />
          <Category />
          <Routes>
            <Route path="/" element={<VideoSection />} />
            <Route path="/video/:videoId" element={<PlayVideo />} />
            <Route path="channel/:channelId" element={<VideoChannel />} />
            <Route path="search/" element={<SearchFeed />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
