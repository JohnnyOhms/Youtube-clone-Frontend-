import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { notificationType } from "../utils/types";

const initialState: notificationType<null> = {
  message: "",
  open: true,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    showNotification: (
      state,
      action: PayloadAction<notificationType<null>>
    ) => {
      if (action.payload) {
        state = {
          message: action.payload.message,
          open: action.payload.open,
        };
      }
    },
  },
});

export const { showNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
