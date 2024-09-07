import { Server, Socket } from "socket.io";

type User = {
  socketId: string;
  userName: string;
};

type ChatUpdate = {
  userName: string;
  message: string;
};

type CodeUpdate = {
  title: string;
  content: string;
  _id: string;
};

type PossUpdate = {
  userName: string;
  currPos: CurrPos;
  _id: string;
};

type CurrPos = {
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

export function setupSocket(io: Server) {
  let rooms: { [room: string]: User[] } = {};

  const csNamespace = io.of("/cs");
  csNamespace.on("connection", (socket: Socket) => {
    console.log("user connected " + socket.id);

    socket.on("room:join", (room: string, { userName }) => {
      socket.join(room);
      console.log(`userName: ${userName} id: ${socket.id} joined: ${room}`);

      const user = { socketId: socket.id, userName };
      if (!rooms[room]) rooms[room] = [];
      rooms[room].push(user);

      const userArr = rooms[room];
      csNamespace.to(room).emit("user:update", { userArr });
    });

    socket.on("chat:update", (room, { userName, message }: ChatUpdate) => {
      socket.broadcast.to(room).emit("chat:update", { userName, message });
    });

    socket.on("code:update", (room, { title, content, _id }: CodeUpdate) => {
      console.log("room:", room);
      console.log("_id:", _id);
      socket.broadcast.to(room).emit("code:update", { title, content, _id });
    });

    socket.on("line:update", (room, { userName, currPos, _id }: PossUpdate) => {
      console.log("userName:", userName);
      socket.broadcast.to(room).emit("line:update", { userName, currPos, _id });
    });

    socket.on("disconnecting", () => {
      const room = [...socket.rooms][1];
      if (rooms[room]) {
        rooms[room] = rooms[room].filter(
          (user: User) => user.socketId !== socket.id
        );
        const userArr = rooms[room];
        csNamespace.to(room).emit("user:update", { userArr });
      }
    });

    socket.on("disconnect", () => {
      console.log("disconnect " + socket.id);
    });
  });
}
