import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import VideoSlice from "../slice/getAPIslice";
import RelatedVideoSlice from "../slice/getRelatedVideo";

export const store = configureStore({
  reducer: {
    video: VideoSlice,
    relatedVideo: RelatedVideoSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
