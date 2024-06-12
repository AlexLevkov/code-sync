import { configureStore } from "@reduxjs/toolkit";

import lessonsSlice from "./slices/lessons-slice.ts";
import notificationsSlice from "./slices/notifications-slice.ts";
import usersSlice from "./slices/users-slice.ts";

export const store = configureStore({
  reducer: {
    lessons: lessonsSlice.reducer,
    notifications: notificationsSlice.reducer,
    users: usersSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
