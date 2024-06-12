import React, { useState } from "react";
import { Button, Collapse } from "react-bootstrap";
import { ParBoxProps } from "../types";

const ParBox: React.FC<ParBoxProps> = ({ userArr }) => {
  const [open, setOpen] = useState(true);

  return (
    <div className="par-cmp">
      <Button variant="" onClick={() => setOpen(!open)}>
        <span> Online Participants</span>
        {open ? " ↑" : " ↓"}
      </Button>
      <Collapse
        className="par-collapse"
        appear={open}
        in={open}
      >
        <div>
          {userArr.map((user) => {
            return (
              <div key={user.userName} className="participant">
                <div className="green-circle"></div>
                <div className="user-type-par">{user.userName}</div>
              </div>
            );
          })}
        </div>
      </Collapse>
    </div>
  );
};

export default ParBox;
