import { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const ClassRoomModal = ({
  setUserName,
  userName,
  codeTitle,
  setUserArr,
  setUser,
  setUserType,
}) => {
  const setMentor = (e) => {
    if (e.target.checked) setUserType("mentor");
    else setUserType("student");
  };

  const [show, setShow] = useState(true);
  const handleClose = () => {
    setShow(false);
    setUser(userName);
    // setUserArr((prevNames)=>[...prevNames,userName])
  };

  return (
    <Modal className="class-room-modal-cmp" show={show}>
      <Modal.Header>
        <Modal.Title>Welcome to {codeTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input
          onChange={(e) => {
            setUserName(e.target.value);
          }}
          type="text"
          required
          placeholder="Please enter your name"
        />
        <br />
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant=""
          onClick={() => {
            window.history.back();
            handleClose();
          }}
        >
          Go back
        </Button>
        <Button variant="" disabled={!userName} onClick={handleClose}>
          Join room
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ClassRoomModal;
