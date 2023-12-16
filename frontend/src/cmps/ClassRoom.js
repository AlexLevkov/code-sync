import { useState,useEffect } from 'react';


const ClassRoom = () => {
  const [userType, setUserType] = useState('student');

  useEffect(() => {
    // create session on component mount
    fetch('http://localhost:3030/enter')
      .then(res => res.json())
      .then(data => {
        if (data.userType) {
          setUserType(data.userType);
        }
      })
      .catch(err => console.log(err));

    // cleanup function to destroy session on component unmount
    return () => {
      fetch('http://localhost:3030/exit');
    };
  }, []);

  return (
    <div>
      <h1>Welcome to the Class Room</h1>
      <h2>Your user type is: {userType}</h2>
    </div>
  );
};

export default ClassRoom;
