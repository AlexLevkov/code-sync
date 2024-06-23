import React, { useState, useEffect, useRef } from "react";
import { Button, Form } from "react-bootstrap";
import { FaArrowRight } from "react-icons/fa";
import { BiSolidSend } from "react-icons/bi";

import { RiSendPlaneLine } from "react-icons/ri";
import { AiOutlineSend } from "react-icons/ai";
import { ChatProps } from "../types";

const Chat: React.FC<ChatProps> = ({ onChatMessage, messages }) => {
  const refInput = useRef<HTMLInputElement>(null);

  const sendMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (refInput.current) {
      const message: string = refInput.current.value;
      if (!message) return;
      onChatMessage(message);
      refInput.current.value = "";
    }
  };

  return (
    <div className="chat-cmp">
      <div className="chat-msg-container">
        {messages.map((line) => (
          <div className="chat-msg-line">
            <strong>{line.userName}: </strong>
            {line.message}
          </div>
        ))}
      </div>

      <Form className="chat-form" onSubmit={sendMessage}>
        <Form.Control type="text" ref={refInput} />
        <button className="chat-btn" type="submit">
          <AiOutlineSend className="chat-send-icon" />
        </button>
      </Form>
    </div>
  );
};

export default Chat;
