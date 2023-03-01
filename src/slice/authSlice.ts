import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { authType } from "../utils/types";

const initialState: authType<null> = {
  user: "",
  token: "",
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<authType<null>>) => {
      if (action.payload) {
        state = {
          user: action.payload.user,
          token: action.payload.token,
          loading: action.payload.loading,
        };
      }
    },
    logoutUser: (state, action: PayloadAction<authType<null>>) => {
      state = {
        user: "",
        token: "",
        loading: action.payload?.loading,
      };
    },
  },
});

export const { loginUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;
