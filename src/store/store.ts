import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import VideoSlice from "../slice/getAPIslice";
import RelatedVideoSlice from "../slice/getRelatedVideo";
import notificationSlice from "../slice/notificationSlice";

export const store = configureStore({
  reducer: {
    video: VideoSlice,
    relatedVideo: RelatedVideoSlice,
    notification: notificationSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
