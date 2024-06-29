import { configureStore } from "@reduxjs/toolkit";

import lessonsSlice from "./slices/lessons-slice";
import notificationsSlice from "./slices/notifications-slice";
import usersSlice from "./slices/users-slice";

export const store = configureStore({
  reducer: {
    lessons: lessonsSlice.reducer,
    notifications: notificationsSlice.reducer,
    users: usersSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
