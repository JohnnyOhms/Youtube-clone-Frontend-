import React, { lazy, Suspense } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchFeed from "./component/searchfeed/SearchFeed";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Main from "./component/main/main";
import NotFoundPage from "./component/notFoundPage/NotFoundPage";
import LazyLoad from "./component/loader/LazyLoad";
import Dictaphone1 from "./test";
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

  return (
    <Provider store={store}>
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
              path="channel/:channelId"
              element={
                <Suspense fallback={<LazyLoad />}>
                  <VideoChannel />
                </Suspense>
              }
            />
            <Route path="search/:searchId" element={<SearchFeed />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="test" element={<Dictaphone1 />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
