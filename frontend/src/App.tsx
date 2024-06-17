import React, { useEffect } from "react";
// components
import LessonsListPage from "./pages/LessonsListPage";
import LessonPage from "./pages/LessonPage";
import EditPage from "./pages/EditPage";
import Navbar from "./components/Navbar";
// router and store
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchLessons } from "./app/store/actions/lessons-action.ts";
import { AppDispatch } from "./app/store/store";
// hooks
import useNotification from "./hooks/useNotification";

const App: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  useNotification();

  // move it to the home page only to avoid fetching all the lessons when not necessary
  useEffect(() => {
    dispatch(fetchLessons());
  }, [dispatch]);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LessonsListPage />} />
        <Route path="/lesson/:id" element={<LessonPage />} />
        <Route path="/edit/:id?" element={<EditPage />} />
        <Route path="/*" element={<h1>404</h1>} />
      </Routes>
    </Router>
  );
};

export default App;
