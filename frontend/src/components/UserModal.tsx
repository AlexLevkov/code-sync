import React, { useRef, useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UserModalProp } from "../types";

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
          <dialog ref={refDialog} className="dialog-modal " open>
            <Form onSubmit={handleSumbit} method="dialog">
              <h4>Welcome! </h4>
              <h5>Please enter your name:</h5>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={inputValue}
                ref={refInput}
                onChange={handleInputChange}
                required
              />
              <div className="modal-btn-box">
                <Button variant="dark">
                  <Link to="/">Go Back</Link>
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
