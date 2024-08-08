import React from "react";
import { FaPlay, FaClipboard } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";
// import { TbCopy } from "react-icons/tb";
import { HiOutlineLink } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { fetchLesson } from "../app/store/actions/lessons-action";
import { notificationActions } from "../app/store/slices/notifications-slice";
import { copySuccess, resetSuccess } from "../utils/noticationContent";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { AppDispatch } from "../app/store/store";
import { ControlBoxProps } from "../types";

const ControlBox: React.FC<ControlBoxProps> = ({ title, userName }) => {
  const dispatch: AppDispatch = useDispatch();
  const { id } = useParams<{ id: string }>();

  const copyAddress = () => {
    navigator.clipboard.writeText(window.location.href);
    dispatch(notificationActions.updateNotification(copySuccess));
  };

  const resetLesson = () => {
    if (id) {
      dispatch(fetchLesson(id));
      dispatch(notificationActions.updateNotification(resetSuccess));
    }
  };

  return (
    <div className="control-cmp">
      <h4 className="lesson-title">{title}</h4>
      <div className="control-box">
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
