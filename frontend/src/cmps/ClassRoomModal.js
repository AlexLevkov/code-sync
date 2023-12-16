import {useState} from 'react'
import { Modal, Button } from "react-bootstrap";

const ClassRoomModal = ({setUserName,userName,codeTitle,setUserArr,setUser,setUserType}) => {

  const setMentor = (e) =>{
    if (e.target.checked) setUserType('mentor')
    else setUserType('student')
  }
  
  const [show, setShow] = useState(true);
  const handleClose = () => {
    setShow(false)
    setUser(userName)
    // setUserArr((prevNames)=>[...prevNames,userName])

  };

  return (
  <Modal className='class-room-modal-cmp' show={show} >
    <Modal.Header>
      <Modal.Title>
        Welcome to {codeTitle}
        <br />
        Please enter your name 
      </Modal.Title>  
    </Modal.Header>
    <Modal.Body>

      <input 
        onChange = {(e)=>{setUserName(e.target.value)}}
        type="text" 
        required
        placeholder="Name" 
      />
      <br />
      <input onChange={setMentor} type="checkbox" name="" id="checkbox" />
      <label htmlFor="checkbox">&nbsp;I am a mentor</label>

    </Modal.Body>
    <Modal.Footer>
      <Button variant="" onClick={()=>{
       window.history.back()
        handleClose()}}>Go back</Button>
      <Button variant="" disabled={!userName} onClick={handleClose}>Join room</Button>
    </Modal.Footer>
  </Modal> 
  )
}

export default ClassRoomModal


