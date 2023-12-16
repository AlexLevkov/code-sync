import React from 'react'
import io from 'socket.io-client'
import { useState,useEffect,useRef } from 'react'
import { useParams } from "react-router-dom";
import Chat from './Chat';
import HintBtn from './HintBtn.js';
import CodeBlock from './CodeBlock.js';
import ClassRoomModal from './ClassRoomModal.js';

const CodeBlockRoom = ({userType,onChangeType,socketLink,httpLink,userId,setUserType}) => {

  const {id} = useParams()
  // const socket = io.connect(socketLink)
  const [socket, setSocket] = useState(null)
  const [codeQuestion, setCodeQuestion] = useState(`loading...`); // question fetched from database 
  const [codeSolution, setCodeSolution] = useState(null); // solution fetched from database
  const [codeAnswer, setCodeAnswer] = useState('loading...'); // answer provided by user
  const [codeTitle, setCodeTitle] = useState('loading...'); // title fetched from database 
  const [mentorOnline, setMentorOnline]= useState(null); // mentor online status
  const [studentOnline, setStudentOnline]= useState(null); // student online status

  const [userName,setUserName] = useState(null);
  const [userArr, setUserArr,] = useState([]);

  const fetchData = async () =>{
    const response = await fetch(`${httpLink}/${id}`)
    const data = await response.json()
    setCodeTitle(data.title)
    setCodeQuestion(data.content)
    setCodeAnswer(data.content)
    setCodeSolution(data.solution)
  }
  
 



  // life cycle

  useEffect( ()=>{
    fetchData()
    const socket = io(socketLink)
    setSocket(socket)
   
    socket.on("code-update",(data)=>{
      setCodeAnswer(data.message)
    })
  
    socket.on('set-user-name',(userArr)=>{
      setUserArr(userArr)
    })

    // fire when user is navigating to another page
    return () => {
      socket.emit('user-disconnected',userId)
    }
    
  }, [])
  
  
  // cmp functions

  const setUser=()=>{
    socket.emit('user-connected',{userId,userName})
  }

  const handleChange = (event) => {
    const message = event.target.innerText
    sendMessage(message)
  }

  const sendMessage = (message) =>{
    socket.emit('code-change',{message})
  }


  return (
    <div className='code-block-cmp animate__animated animate__pulse animate__fadeIn' >

      <ClassRoomModal userName={userName} setUserName={setUserName} setUserType={setUserType} codeTitle={codeTitle} setUser={setUser}/>
      <h2 className='code-title'>Dear {userName} welcome to {codeTitle}</h2>
      <h2>  {codeAnswer===codeSolution ? <div className="success-smiley animate__animated animate__rubberBand" >Good job! 😊</div> : <div>&nbsp;</div>}</h2>

      <div className="code-block-container">
        <CodeBlock className={userType+'-code-content'} codeString={ userType==='student' ? codeQuestion : codeAnswer} handleChange={handleChange}/>
        <Chat userName={userName} socketLink={socketLink} userType={userType} studentOnline={studentOnline} mentorOnline={mentorOnline} userArr={userArr} setUserArr={setUserArr}/>
      </div>

      {codeSolution && <HintBtn codeSolution={codeSolution}/>}
    </div>
  )
}

export default CodeBlockRoom
