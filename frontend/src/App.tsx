import React, { useEffect } from "react";
import Lobby from "./pages/Lobby";
import Room from "./pages/Room";
import EditPage from "./pages/EditPage";
import NotFoundPage from "./pages/NotFoundPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchLessons } from "./app/store/actions/lessons-action.ts";
import { AppDispatch } from "./app/store/store";
import useNotification from "./hooks/useNotification";

const App: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  useNotification();

  useEffect(() => {
    dispatch(fetchLessons());
  }, [dispatch]);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Lobby />} />
        <Route path="/lesson/:id" element={<Room />} />
        <Route path="/edit/:id?" element={<EditPage />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
