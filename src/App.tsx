import React, { lazy, Suspense } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchFeed from "./component/searchfeed/SearchFeed";
import Main from "./component/main/main";
import NotFoundPage from "./component/notFoundPage/NotFoundPage";
import LazyLoad from "./component/loader/LazyLoad";
import Context from "./context/context";
import { useAppSelector } from "./hooks/hooks";
import Saved from "./component/sideBarVideos/Saved";
import ContextSideBar from "./context/toggleSideBar";
import PlayList from "./component/PlayList/PlayList";
const PlayVideo = React.lazy(() => import("./component/playVideo/PlayVideo"));
const VideoChannel = lazy(
  () => import("./component/Video channel/VideoChannel")
);

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

  const notify = useAppSelector((state) => state.notification.open);

  return (
    <>
      <Context>
        <ContextSideBar>
          <ThemeProvider theme={theme}>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Main />} />
                <Route
                  path="/video/:videoId"
                  element={
                    <Suspense fallback={<LazyLoad />}>
                      <PlayVideo />
                    </Suspense>
                  }
                />
                <Route
                  path="/channel/:channelId"
                  element={
                    <Suspense fallback={<LazyLoad />}>
                      <VideoChannel />
                    </Suspense>
                  }
                />
                <Route path="/saved_videos" element={<Saved />} />
                <Route path="/playList" element={<PlayList />} />
                <Route path="/search" element={<SearchFeed />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </BrowserRouter>
          </ThemeProvider>
        </ContextSideBar>
      </Context>
    </>
  );
}

export default App;
