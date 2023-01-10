import { Store, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import VideoSlice from "../slice/getAPIslice";

export const store = configureStore({
  reducer: {
    video: VideoSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
