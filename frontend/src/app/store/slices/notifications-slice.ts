import { createSlice } from "@reduxjs/toolkit";

const notificationsSlice = createSlice({
  name: "Notifications",
  initialState: {
    notification: {
      isInit: true,
      title: "",
      message: "",
      type: "success",
      insert: "top",
      container: "top-center",
      dismiss: {
        click: true,
        duration: 4000,
      },
    },
  },
  reducers: {
    updateNotification(state, action) {
      state.notification = {
        ...state.notification,
        ...action.payload,
        isInit: false,
      };
    },
    endNotification(state) {
      state.notification = {
        ...state.notification,
        isInit: true,
      };
    },
  },
});

export const notificationActions = notificationsSlice.actions;

export default notificationsSlice;
