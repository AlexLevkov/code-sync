export type Lesson = {
  _id: string;
  title: string;
  content: string;
};

export type LessonPreviewProps = {
  lesson: Lesson;
};

export type CodeBlockProps = {
  lesson: Lesson;
  onCodeChange: () => void;
  code: string;
};

export type RootState = {
  lessons: {
    lessonList: Lesson[];
  };
  users: {
    userName: string;
  };
  notifications: {
    notification: { isInit: boolean };
  };
};

export type CodeEditorProps = {
  content: string;
  customOptions?: {};
  onCodeChange?: (arg0: string, arg1: string) => void;
  lesson?: Lesson;
};

export type Message = {
  userName: string;
  message: string;
};

export type ChatProps = {
  messages: Message[];
  onChatMessage: (arg0: string) => void;
};

export type User = {
  socketId: string;
  userName: string;
};

export type ParBoxProps = {
  userArr: User[];
};

export type UserModalProp = {
  userName: string;
  onUserNameSubmit: (arg0: string) => void;
};

export type DeleteModalProps = {
  lessonName: string;
  isDelete: boolean;
  onDelete: (arg0: boolean) => void;
};

export type ControlBoxProps = {
  title: string;
  userName: string;
};

export type SaveLessonArgs = {
  lessonToEdit: Lesson;
};
