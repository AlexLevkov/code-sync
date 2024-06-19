import React from "react";
import { Link } from "react-router-dom";
import CodeEditor from "../components/CodeEditor";
import { GoGear } from "react-icons/go";
import { LessonPreviewProps } from "../types";

const LessonPreview: React.FC<LessonPreviewProps> = ({ lesson }) => {
  const customOptions = {
    lineNumbers: false,
  };

  return (
    <div className="lesson-preview-item animate__animated animate__fadeInLeft">
      <Link to={"/lesson/" + lesson._id}>
        <div className="title-box">
          <h5>{lesson.title}</h5>
          <Link to={"/edit/" + lesson._id}>
            <GoGear className="settings-icon" />
          </Link>
        </div>
        <CodeEditor
          content={lesson?.content.substring(0, 50) + " ..."}
          customOptions={customOptions}
        />
      </Link>
    </div>
  );
};

export default LessonPreview;
