import React, { useEffect, useState } from "react";
import socketService from "../services/socket-service";
// router
import { useParams } from "react-router-dom";
// state
import { useSelector, useDispatch } from "react-redux";
import { lessonActions } from "../app/store/slices/lessons-slice.ts";
import { userActions } from "../app/store/slices/users-slice.ts";
// cmps
import ParBox from "../components/ParBox";
import Chat from "../components/Chat.tsx";
import CodeEditor from "../components/CodeEditor.tsx";
import ControlBox from "../components/ControlBox";
import UserModal from "../components/UserModal.tsx";
//types
import { Message, User, Lesson, RootState } from "../types.ts";
import { AppDispatch } from "../app/store/store";

const LessonPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const [userArr, setUserArr] = useState<User[]>([]); // participants
  const [messages, setMessages] = useState<Message[]>([]); // chat messages

  const userName = useSelector((state: RootState) => state.users.userName);

  const lesson = useSelector((state: RootState) =>
    state.lessons.lessonList.find((lesson) => lesson._id === id)
  ) as Lesson;

  useEffect(() => {
    socketService.connect();
    socketService.on("code:update", (data) => {
      dispatch(lessonActions.updateLesson(data));
    });

    socketService.on("chat:update", ({ userName, message }) => {
      setMessages((pv) => [...pv, { message, userName }]);
    });

    socketService.on("user:update", ({ userArr }) => {
      setUserArr((pv) => [...userArr]);
    });

    return () => {
      socketService.disconnect();
    };
  }, []);

  useEffect(() => {
    if (userName) {
      socketService.emit("room:join", lesson.title, { userName });
    }
  }, [userName]);

  const handleCodeChange = (_: any, content: string) => {
    const title = lesson?.title;
    if (lesson) {
      socketService.emit("code:update", lesson.title, {
        title,
        content,
        _id: lesson._id,
      });
    }
  };

  const handleChatMessage = (message: string) => {
    setMessages((pv) => [...pv, { message, userName }]);
    socketService.emit("chat:update", lesson.title, { userName, message });
  };
  const handleUserUpdate = (userName: string) => {
    dispatch(userActions.addUser(userName));
  };

  return (
    <>
      <UserModal userName={userName} onUserNameSubmit={handleUserUpdate} />
      <div className="animate__animated animate__fadeIn  ">
        <ControlBox title={lesson?.title} userName={userName} />
        <div className="lesson-wrapper">
          <CodeEditor
            content={lesson?.content}
            onCodeChange={handleCodeChange}
            lesson={lesson}
          />
          <div className="chat-par-section">
            <ParBox userArr={userArr} />
            <Chat onChatMessage={handleChatMessage} messages={messages} />
          </div>
        </div>
      </div>
    </>
  );
};

export default LessonPage;
