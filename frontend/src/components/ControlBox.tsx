import React from "react";
import { FaPlay, FaClipboard } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";
import { TbCopy } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { fetchLesson } from "../app/store/actions/lessons-action";
import { notificationActions } from "../app/store/slices/notifications-slice";
import { copySuccess, resetSuccess } from "../utils/noticationContent";
import { useParams } from "react-router-dom";

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
      <h3 className="lesson-title">
        {title} - Welcome {userName}
      </h3>
      <div className="control-box">
        <TbCopy
          className="copy-svg"
          title="Copy to clipboard"
          onClick={copyAddress}
        />
        <GrPowerReset
          className="reset-svg"
          title="Reset back to the start"
          onClick={resetLesson}
        />
      </div>
    </div>
  );
};

export default ControlBox;
