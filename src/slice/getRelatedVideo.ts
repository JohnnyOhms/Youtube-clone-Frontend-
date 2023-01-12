import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { requestType, responseType, videoResult } from "../utils/types";
import axios from "axios";

export const APIlink: string = "https://youtube-v31.p.rapidapi.com";

export const RelatedVideoAPI = createAsyncThunk(
  "RelatedVideos/API",
  async (req: requestType<string>) => {
    const response = await axios.get(`${APIlink}/${req}`, {
      params: {
        maxResult: "50",
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

const RelatedVideoSlice = createSlice({
  name: "relatedVideos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(RelatedVideoAPI.pending, (state) => {
      state.loading = true;
      state.erroMssg = false;
    });
    builder.addCase(
      RelatedVideoAPI.fulfilled,
      (state, Action: PayloadAction<responseType>) => {
        state.loading = false;
        state.videoResult = Action.payload;
      }
    );
    builder.addCase(RelatedVideoAPI.rejected, (state) => {
      state.loading = false;
      state.erroMssg = true;
    });
  },
});

export default RelatedVideoSlice.reducer;
