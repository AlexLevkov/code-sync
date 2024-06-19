import React from "react";
import LessonPreview from "../components/LessonPreview";
import HeroSection from "../components/HeroSection.tsx";
import Footer from "../components/Footer.tsx";

import { Lesson, RootState } from "../types";
import { useSelector } from "react-redux";

const LessonsListPage: React.FC = () => {
  const { lessonList } = useSelector((state: RootState) => state.lessons);

  return (
    <>
      <div className="lobby-wrapper">
        <HeroSection />
        {!lessonList.length && (
          <h1 className="animate__heartBeat loading">Loading...</h1>
        )}
        <div className="main-layout">
          <div className="lessons-preview-container">
            {lessonList.map((lesson: Lesson) => (
              <LessonPreview key={lesson._id} lesson={lesson} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LessonsListPage;
