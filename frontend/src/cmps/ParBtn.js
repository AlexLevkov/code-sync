import React, { useState } from 'react';
import { Button, Collapse } from 'react-bootstrap';

const ParBtn = ({mentorOnline,studentOnline,userArr,setUserArr}) => {
  const [open, setOpen] = useState(false);
  

  return (
    <div className='par-cmp'>
      <Button variant="" onClick={() => setOpen(!open)}>
        <span> Online Participants</span>
        {open ? ' ↑' : ' ↓'}
      </Button>
      <Collapse in={open} style={{    borderBottom: "1px solid #cccccc"}}>
        <div>
        {userArr.map((user, i) =>{ 
         return <div key={user} className="participant">
                  <div className='green-circle'></div>
                  <div className='user-type-par'>{user}</div>
                </div> })}
        </div>
      </Collapse>
    </div>
  );
};

export default ParBtn;


          {/* {mentorOnline ? <div className="participant"><div className='green-circle'></div><div className='user-type-par'>mentor</div></div>  : '' } 
          {studentOnline ? <div className="participant"><div className='green-circle'></div><div className='user-type-par'>student</div></div>  : '' }  */}
