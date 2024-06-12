import React from "react";
import LessonPreview from "../components/LessonPreview";
import HeroSection from "../components/HeroSection.tsx";

import { Lesson, RootState } from "../types";
import { useSelector } from "react-redux";

const LessonsListPage: React.FC = () => {
  const { lessonList } = useSelector((state: RootState) => state.lessons);

  return (
    <>
      <HeroSection />
      <div className="lessons-preview-section">
        {!lessonList.length && (
          <h1 className="animate__heartBeat">Loading...</h1>
        )}
        <div className="lessons-preview-container">
          {lessonList.map((lesson: Lesson) => (
            <LessonPreview key={lesson._id} lesson={lesson} />
          ))}
        </div>
      </div>
    </>
  );
};

export default LessonsListPage;
