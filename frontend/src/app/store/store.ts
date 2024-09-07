import { configureStore } from "@reduxjs/toolkit";

import lessonsSlice from "./slices/lessons-slice";
import notificationsSlice from "./slices/notifications-slice";
import usersSlice from "./slices/users-slice";
import scriptsSlice from "./slices/scripts-slice";
import presencesSlice from "./slices/presences-slice.ts";

export const store = configureStore({
  reducer: {
    lessons: lessonsSlice.reducer,
    notifications: notificationsSlice.reducer,
    users: usersSlice.reducer,
    scripts: scriptsSlice.reducer,
    presences: presencesSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
