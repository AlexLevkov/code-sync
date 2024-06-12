import React, { useEffect } from "react";
// cmps
import LessonsListPage from "./pages/LessonsListPage";
import LessonPage from "./pages/LessonPage";
import EditPage from "./pages/EditPage";
import Navbar from "./components/Navbar";
// router and store
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchLessons } from "./app/store/actions/lessons-action.ts";
import { AppDispatch } from "./app/store/store";
// hooks
import useNotification from "./hooks/useNotification";

const App: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  useNotification();

  useEffect(() => {
    dispatch(fetchLessons());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<LessonsListPage />} />
        <Route path="/lesson/:id" element={<LessonPage />} />
        <Route path="/edit/:id?" element={<EditPage />} />
        <Route path="/*" element={<h1>404</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
