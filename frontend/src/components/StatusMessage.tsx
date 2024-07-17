import React from "react";
import { StatusMessageProps } from "../types";

const StatusMessage: React.FC<StatusMessageProps> = ({ error }) => {
  return (
    <div>
      {error ? (
        <h2 className="loading">Server Error, please try again later.</h2>
      ) : (
        <h2 className="animate__animated animate__heartBeat animate__infinite loading">
          Loading...
        </h2>
      )}
    </div>
  );
};

export default StatusMessage;
