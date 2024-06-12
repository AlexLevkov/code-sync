import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    userName: null,
  },
  reducers: {
    addUser(state, action) {
      state.userName = action.payload;
    },
  },
});

export const userActions = usersSlice.actions;

export default usersSlice;
