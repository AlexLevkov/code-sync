import React, { useEffect, useState } from "react";
import socketService from "../services/socket-client.ts";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { lessonActions } from "../app/store/slices/lessons-slice.ts";
import { userActions } from "../app/store/slices/users-slice.ts";
import { scriptActions } from "../app/store/slices/scripts-slice.ts";
import ParBox from "../components/ParBox";
import Chat from "../components/Chat.tsx";
import CodeEditor from "../components/CodeEditor.tsx";
import ControlBox from "../components/ControlBox";
import UserModal from "../components/UserModal.tsx";
import { Message, User, Lesson, RootState } from "../types.ts";
import { AppDispatch } from "../app/store/store";

const Room: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const [userArr, setUserArr] = useState<User[]>([]); // participants
  const [messages, setMessages] = useState<Message[]>([]); // chat messages

  const userName = useSelector((state: RootState) => state.users.userName);
  const script = useSelector((state: RootState) => state.scripts.script);

  // console.log("scripts:", scripts);
  // const scripts = useSelector((state: RootState) => state.scripts.scripts);
  // const { lessonList, error } = useSelector((state: RootState) => state.lessons  );

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
      dispatch(scriptActions.addResult(""));
    };
  }, []);

  useEffect(() => {
    if (userName) {
      socketService.emit("room:join", lesson.title, { userName });
    }
  }, [userName]);

  const handleCodeChange = (_: unknown, content: string) => {
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
    <div>
      <UserModal userName={userName} onUserNameSubmit={handleUserUpdate} />
      <div className="animate__animated animate__fadeIn  ">
        <ControlBox lesson={lesson} />
        <div className="lesson-wrapper">
          <section className="code-section">
            <CodeEditor
              content={lesson?.content}
              onCodeChange={handleCodeChange}
              lesson={lesson}
            />
            <div className="output-box">
              <h4 className="output-title">
                Execution Result (Powered by Piston API)
              </h4>
              <p className="output-result">{script?.result}</p>
            </div>
          </section>
          <section className="chat-par-section">
            <ParBox userArr={userArr} />
            <Chat onChatMessage={handleChatMessage} messages={messages} />
          </section>
        </div>
      </div>
    </div>
  );
};

export default Room;
