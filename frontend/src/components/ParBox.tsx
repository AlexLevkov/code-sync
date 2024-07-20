import React, { useState } from "react";
import { Button, Collapse } from "react-bootstrap";
import { ParBoxProps } from "../types";
import chevron_down from "../assets/svg/chevron_down.svg";
import chevron_up from "../assets/svg/chevron_up.svg";
import { motion, AnimatePresence } from "framer-motion";
const ParBox: React.FC<ParBoxProps> = ({ userArr }) => {
  const [open, setOpen] = useState(true);
  return (
    <div
      className="par-cmp"
    >
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
          <ul>
            <AnimatePresence>
              {userArr.map((user) => {
                return (
                  <motion.li
                    className="participant"
                    key={user.userName}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                    <div className="green-circle" />
                    <span>{user.userName}</span>
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </ul>
        </div>
      </Collapse>
    </div>
  );
};
export default ParBox;
