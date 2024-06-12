import { createSlice } from "@reduxjs/toolkit";
import { Store } from "react-notifications-component";

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
      // animationIn: ["animate__animated", "animate__fadeIn"],
      // animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        click: true,
        duration: 4000,
        // showIcon: true,
        // onScreen: true,
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
      state.notification = { ...state.notification, isInit: true };
    },
  },
});

export const notificationActions = notificationsSlice.actions;

export default notificationsSlice;
