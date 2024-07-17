import React, { useState } from "react";
import { Button, Collapse } from "react-bootstrap";
import { ParBoxProps } from "../types";
import chevron_down from "../assets/svg/chevron_down.svg";
import chevron_up from "../assets/svg/chevron_up.svg";

const ParBox: React.FC<ParBoxProps> = ({ userArr }) => {
  const [open, setOpen] = useState(true);

  return (
    <div className="par-cmp">
      <Button variant="" onClick={() => setOpen(!open)}>
        <span> Online participants ( {userArr?.length} )</span>
        <img
          src={chevron_up}
          className={open ? "chevron" : "chevron down"}
          alt="chevron"
        />
      </Button>
      <Collapse className="par-collapse" appear={open} in={open}>
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
