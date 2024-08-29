import React from "react";
// import { FaPlay, FaClipboard } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";
import { HiOutlineLink } from "react-icons/hi";
import { GrPlay } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { fetchLesson } from "../app/store/actions/lessons-action";
import { fetchScript } from "../app/store/actions/scripts-action.ts";
import { notificationActions } from "../app/store/slices/notifications-slice";
import { scriptActions } from "../app/store/slices/scripts-slice.ts";
import { copySuccess, resetSuccess } from "../utils/noticationContent";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { AppDispatch } from "../app/store/store";
import { ControlBoxProps, RootState } from "../types";

const ControlBox: React.FC<ControlBoxProps> = ({ lesson }) => {
  const dispatch: AppDispatch = useDispatch();
  const { id } = useParams<{ id: string }>();

  const script = useSelector((state: RootState) => state.scripts.script);

  const copyAddress = () => {
    navigator.clipboard.writeText(window.location.href);
    dispatch(notificationActions.updateNotification(copySuccess));
  };

  const resetLesson = () => {
    if (id) {
      dispatch(fetchLesson(id));
      dispatch(scriptActions.addResult(""));
      dispatch(notificationActions.updateNotification(resetSuccess));
    }
  };

  const runCode = () => {
    dispatch(fetchScript(script));
  };

  return (
    <div className="control-cmp">
      <h4 className="lesson-title">{lesson?.title}</h4>
      <div className="control-box">
        <div className="control-btn" onClick={runCode}>
          <motion.div style={{ display: "flex" }} whileTap={{ scale: 0.9 }}>
            <GrPlay title="Run code on Piston" />
          </motion.div>
        </div>
        <motion.div className="control-btn" onClick={resetLesson}>
          <motion.div style={{ display: "flex" }} whileTap={{ scale: 0.9 }}>
            <GrPowerReset
              className="reset-svg"
              title="Reset back to the start"
            />
          </motion.div>
        </motion.div>
        <div className="control-btn" onClick={copyAddress}>
          <motion.div style={{ display: "flex" }} whileTap={{ scale: 0.9 }}>
            <HiOutlineLink className="copy-svg" title="Copy to clipboard" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ControlBox;
