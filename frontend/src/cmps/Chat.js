import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import io from 'socket.io-client';
import ParBtn from './ParBtn.js';

const Chat=({socketLink,studentOnline,mentorOnline,userName,userArr,setUserArr})=> {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    
    const socket = io(socketLink)
    setSocket(socket)
    socket.on('message-update', (message) => {
      // console.log('message:', message)
      setMessages((prevMessages) => [...prevMessages, message])
    })

    return () => {
      socket.disconnect()
    }
  }, [])


  useEffect(() => {
    setName(userName)
    const chatCmp = document.querySelector('.chat-msg-container')
    chatCmp.scrollTop = chatCmp.scrollHeight
  },[messages])


  const handleNameChange = (e) => {
    setName(e.target.value)
  }

  const handleMessageChange = (e) => {
    setMessage(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!userName || !message) return
    socket.emit('chat-message', { userName, message })
    setMessage('')
  }

  return (
    <div className='chat-cmp'>

      <ParBtn userArr={userArr} setUserArr={setUserArr} studentOnline={studentOnline} mentorOnline={mentorOnline}/>
   
      <div className='chat-msg-container'>
        {messages.map((line, index) => (
          <div className='chat-msg-line' key={index}>
            <strong>{line.userName}</strong>: {line.message}
          </div>
        ))}
      </div>


      <Form className='chat-form' onSubmit={handleSubmit}>
      
      <div className="input-form">
        <Input type="text" name="message" id="message" onChange={handleMessageChange} value={message} />
      </div>
      <Button>Send</Button>
    </Form>

    </div>
  )
}

export default Chat