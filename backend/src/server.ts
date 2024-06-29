import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { Server as SocketIOServer, Socket } from "socket.io";
import http from "http";
import cors from "cors";
import { setupSocket } from "./socketController";
import exercisesRoutes from "./routes/exercises";

const corsOptions: cors.CorsOptions = {
  origin: [
    "https://codesync.alexlevkov.com",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
  ],
};

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/exercises", exercisesRoutes);

const server = http.createServer(app);
const io = new SocketIOServer(server, { cors: corsOptions });
setupSocket(io);

const port = process.env.PORT || 2000;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
