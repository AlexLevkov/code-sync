import React from "react";
import { Link } from "react-router-dom";
import CodeEditor from "../components/CodeEditor";
import { GoGear } from "react-icons/go";
import { LessonPreviewProps } from "../types";
import { motion } from "framer-motion";

const LessonPreview: React.FC<LessonPreviewProps> = ({ lesson }) => {
  const customOptions = {
    lineNumbers: false,
    readOnly: true,
    extraKeys: {
      Tab: false,
    },
  };

  return (
    <div className="animate__animated animate__fadeInLeft">
      <motion.div
        className="lesson-preview-item"
        whileHover={{
          y: [0, 2, -4], 
          x: [0, -2, 4],
          transition: {
            duration: 0.3, 
            ease: "easeInOut",
          },
        }}
        style={{ y: 0, x: 0 }} 
      >
        <Link to={"/room/" + lesson._id}>
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
      </motion.div>
    </div>
  );
};

export default LessonPreview;
