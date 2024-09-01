import { createSlice } from "@reduxjs/toolkit";
import { Script } from "../../../types";

const scriptsSlice = createSlice({
  name: "Scripts",
  initialState: {
    script: {} as Script,
  },
  reducers: {
    addContent(state, action) {
      const { content } = action.payload;
      state.script.content = content;
    },
    addResult(state, action) {
      state.script.result = action.payload;
    },
    changeLoadingState(state, action) {
      const { isLoading } = action.payload;
      state.script.isLoading = isLoading;
    },
  },
});

export const scriptActions = scriptsSlice.actions;

export default scriptsSlice;
