import React from "react";
import LessonPreview from "../components/LessonPreview.tsx";
import HeroSection from "../components/HeroSection.tsx";
import StatusMessage from "../components/StatusMessage.tsx";
import { Lesson, RootState } from "../types.ts";
import { useSelector } from "react-redux";

const Lobby: React.FC = () => {
  const { lessonList, error } = useSelector(
    (state: RootState) => state.lessons
  );

  return (
    <div className="lobby-wrapper">
      <HeroSection />
      {!lessonList.length && <StatusMessage error={error} />}
      <div className="main-layout">
        <div className="lessons-preview-container">
          {lessonList.map((lesson: Lesson) => (
            <LessonPreview key={lesson._id} lesson={lesson} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Lobby;
