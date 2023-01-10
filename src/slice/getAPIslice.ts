import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const APIlink: string = "https://youtube-v31.p.rapidapi.com";
const options = {
  params: {
    q: "music",
    part: "snippet,id",
    regionCode: "US",
    order: "date",
    maxResults: "50",
  },
};

export type requestType<T> = T | null;

export const videoAPI = createAsyncThunk(
  "videos/videoAPI",
  async (req: requestType<string>) => {
    const response: object = await axios.get(`${APIlink}/${req}`, {
      params: {
        q: "All",
        part: "snippet,id",
        regionCode: "US",
        maxResults: "50",
      },
      headers: {
        "X-RapidAPI-Key": "059fb8fd44msh3479a5636de8da1p14d5e4jsne696f7c64d93",
        "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
      },
    });

    return response;
  }
);

interface initIalStateType {
  videoResult: null | object;
  loading: Boolean;
  erroMssg: string;
}

const initialState: initIalStateType = {
  videoResult: null,
  loading: false,
  erroMssg: "",
};

const VideoSlice = createSlice({
  name: "videos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(videoAPI.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      videoAPI.fulfilled,
      (state, Action: PayloadAction<object>) => {
        state.loading = false;
        state.videoResult = Action.payload;
      }
    );
    builder.addCase(videoAPI.rejected, (state) => {
      state.loading = false;
      state.erroMssg = "failed to get request";
    });
  },
});

export default VideoSlice.reducer;
