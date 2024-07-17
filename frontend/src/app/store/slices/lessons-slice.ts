import { createSlice } from "@reduxjs/toolkit";
import { Lesson } from "@/types";

const lessonsSlice = createSlice({
  name: "Lessons",
  initialState: {
    lessonList: [] as Lesson[],
    error: false as boolean,
  },
  reducers: {
    addLessons(state, action) {
      state.lessonList = action.payload;
    },
    updateLesson(state, action) {
      let { _id, content, title } = action.payload;
      const index = state.lessonList.findIndex((lesson) => lesson._id === _id);
      if (index !== -1) {
        const updatedLesson = { ...state.lessonList[index], content, title };
        state.lessonList = [
          ...state.lessonList.slice(0, index),
          updatedLesson,
          ...state.lessonList.slice(index + 1),
        ];
      }
    },
    createLesson(state, action) {
      const newLesson = action.payload;
      state.lessonList.push(newLesson);
    },
    deleteLesson(state, action) {
      const id = action.payload;
      const index = state.lessonList.findIndex((lesson) => lesson._id === id);
      state.lessonList.splice(index, 1);
    },
    setError(state, _) {
      state.error = true;
    },
  },
});

export const lessonActions = lessonsSlice.actions;

export default lessonsSlice;
