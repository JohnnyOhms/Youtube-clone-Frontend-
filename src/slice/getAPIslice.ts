import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { requestType, responseType, videoResult } from "../utils/types";

export const APIlink: string = "https://youtube-v31.p.rapidapi.com";

export const videoAPI = createAsyncThunk(
  "videos/videoAPI",
  async (req: requestType<string>, thunkAPI) => {
    const response = await axios.get(`${APIlink}/${req}`, {
      params: {
        maxResults: "50",
      },
      headers: {
        "X-RapidAPI-Key": "059fb8fd44msh3479a5636de8da1p14d5e4jsne696f7c64d93",
        "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
      },
    });
    return response.data.items;
  }
);

interface initIalStateType {
  videoResult: videoResult<null>;
  loading: Boolean;
  erroMssg: Boolean;
}

const initialState: initIalStateType = {
  videoResult: null,
  loading: false,
  erroMssg: false,
};

const VideoSlice = createSlice({
  name: "videos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(videoAPI.pending, (state) => {
      state.loading = true;
      state.erroMssg = false;
    });
    builder.addCase(
      videoAPI.fulfilled,
      (state, Action: PayloadAction<responseType>) => {
        state.loading = false;
        state.videoResult = Action.payload;
      }
    );
    builder.addCase(videoAPI.rejected, (state) => {
      state.loading = false;
      state.erroMssg = true;
    });
  },
});

export default VideoSlice.reducer;
