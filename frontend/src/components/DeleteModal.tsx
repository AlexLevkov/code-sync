import React, { useRef, useState, useEffect, ReactHTML } from "react";
import { Button, Form } from "react-bootstrap";
import {DeleteModalProps} from "../types"

const DeleteModal:React.FC<DeleteModalProps> = ({ onDelete, isDelete, lessonName }) => {
  const refDialog = useRef<HTMLDialogElement>(null);

  const handleSumbit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onDelete(true);
  };

  const closeDialog = () => {
    if (refDialog.current) {
      refDialog.current.close();
      onDelete(false);
    }
  };

  return (
    <>
      {isDelete && (
        <>
          <div className="over-lay" />
          <dialog ref={refDialog} className="dialog-modal " open>
            <Form onSubmit={handleSumbit} method="dialog">
              <h3>Delete {lessonName}</h3>
              <h4>Are you sure?</h4>
              <div className="modal-btn-box">
                <Button variant="dark" onClick={closeDialog}>
                  Cancel
                </Button>
                <Button variant="dark" type="submit">
                  Delete
                </Button>
              </div>
            </Form>
          </dialog>
        </>
      )}
    </>
  );
};

export default DeleteModal;
