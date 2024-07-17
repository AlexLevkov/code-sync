import React, { useRef, useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UserModalProp } from "../types";
import { FaHand } from "react-icons/fa6";

const UserModal: React.FC<UserModalProp> = ({ onUserNameSubmit, userName }) => {
  const [inputValue, setInputValue] = useState("");
  const refDialog = useRef<HTMLDialogElement>(null);
  const refInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!userName && refInput.current) refInput.current.focus();
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSumbit = () => {
    onUserNameSubmit(inputValue);
  };

  const closeDialog = () => {
    if (refDialog.current) refDialog.current.close();
  };

  return (
    <>
      {!userName && (
        <>
          <div className="over-lay" />
          <dialog
            ref={refDialog}
            className="dialog-modal animate__animated animate__fadeInDown "
            open
          >
            <Form onSubmit={handleSumbit} method="dialog">
              <h4>
                Welcome <FaHand className="hello-icon" />
              </h4>
              <h5>Please enter your name</h5>
              <Form.Control
                type="text"
                placeholder="Your name"
                value={inputValue}
                ref={refInput}
                onChange={handleInputChange}
                required
              />
              <div className="modal-btn-box">
                <Button variant="dark" className="btn-back">
                  <Link to="/">Back</Link>
                </Button>
                <Button
                  variant="dark"
                  type="submit"
                  onClick={closeDialog}
                  disabled={!inputValue.trim()}
                >
                  Join
                </Button>
              </div>
            </Form>
          </dialog>
        </>
      )}
    </>
  );
};

export default UserModal;
