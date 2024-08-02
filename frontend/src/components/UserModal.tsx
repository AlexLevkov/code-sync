import React, { useRef, useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { UserModalProp } from "../types";
import { FaHand } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";

const UserModal: React.FC<UserModalProp> = ({ onUserNameSubmit, userName }) => {
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const refInput = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userName && refInput.current) refInput.current.focus();
  }, [userName]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onUserNameSubmit(inputValue);
    closeDialog();
  };

  const goHome = () => {
    closeDialog();
    setTimeout(() => {
      navigate("/");
    }, 350);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {!userName && isOpen && (
        <>
          <motion.div
            className="over-lay"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
          />
          <motion.dialog
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -300, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="dialog-modal"
            open
          >
            <Form onSubmit={handleSubmit} method="dialog">
              <h4>
                Welcome <FaHand className="hello-icon" />
              </h4>
              <h5 className="modal-sub-title" >Please enter your name</h5>
              <Form.Control
                className="modal-input-field"
                type="text"
                placeholder="Your name"
                value={inputValue}
                ref={refInput}
                onChange={handleInputChange}
                required
              />
              <div className="modal-btn-box">
                <Button variant="dark" className="btn-back" onClick={goHome}>
                  Back
                </Button>
                <Button
                  variant=""
                  type="submit"
                  className="btn-join"
                  disabled={!inputValue.trim()}
                >
                  Join
                </Button>
              </div>
            </Form>
          </motion.dialog>
        </>
      )}
    </AnimatePresence>
  );
};

export default UserModal;
