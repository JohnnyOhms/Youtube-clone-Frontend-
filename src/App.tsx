import React, { lazy, Suspense } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchFeed from "./component/searchfeed/SearchFeed";
import Main from "./component/main/main";
import NotFoundPage from "./component/notFoundPage/NotFoundPage";
import LazyLoad from "./component/loader/LazyLoad";
import Context from "./context/context";
import AlertBar from "./component/alertBar/alertBar";
import { useAppSelector } from "./hooks/hooks";
import Saved from "./component/saved/Saved";
import SideBar from "./component/sideBar/SideBar";
import ContextSideBar from "./context/toggleSideBar";
import MobileSideBar from "./component/sideBar/mobileSideBar";
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
