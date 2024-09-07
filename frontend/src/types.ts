export type Lesson = {
  _id: string;
  title: string;
  content: string;
};

export type Script = {
  content: string;
  result?: string;
  error?: string;
  isLoading?: boolean;
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
    error: boolean;
  };
  users: {
    userName: string;
  };
  notifications: {
    notification: { isInit: boolean };
  };
  scripts: {
    script: Script;
    isLoading: boolean;
  };
  presences: Presence[];
};

export type CodeEditorProps = {
  content: string;
  customOptions?: {};
  onCodeChange?: (arg0: string, arg1: string) => void;
  onLineChange?: (arg0: CurrPos) => void;
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
  lesson: Lesson;
};

export type SaveLessonArgs = {
  lessonToEdit: Lesson;
};

export type StatusMessageProps = {
  error: boolean;
};

export type CurrPos = {
  start?: {
    ch: number;
    line: number;
    sticky?: string;
    xRel?: number;
  };
  end: {
    ch: number;
    line: number;
    sticky?: string;
    xRel?: number;
  };
};

export type UserPos = {
  userName: string;
  currPos: CurrPos;
};

export type Presence = {
  _id: string;
  users: UserPos[];
};
