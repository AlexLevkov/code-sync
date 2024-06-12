import { createSlice } from "@reduxjs/toolkit";
import { Lesson } from "@/types";

const lessonsSlice = createSlice({
  name: "Lessons",
  initialState: {
    lessonList: [] as Lesson[],
  },
  reducers: {
    addLessons(state, action) {
      state.lessonList = action.payload;
    },
    updateLesson(state, action) {
      let { _id, content, title } = action.payload;
      const index = state.lessonList.findIndex((lesson) => lesson._id === _id);
      state.lessonList[index].content = content;
      state.lessonList[index].title = title;
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
  },
});

export const lessonActions = lessonsSlice.actions;

export default lessonsSlice;
