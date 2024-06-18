import { io, Socket } from "socket.io-client";

// const SOCKET_SERVER_URL = "http://localhost:2000/cs";
const SOCKET_SERVER_URL = "https://central-server.alexlevkov.com/cs";

class SocketService {
  private socket: Socket | null = null;

  connect(): void {
    if (!this.socket) {
      this.socket = io(SOCKET_SERVER_URL);
    }
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  on(event: string, callback: (data: any) => void): void {
    if (this.socket) {
      this.socket.on(event, callback);
    }
  }

  emit(event: string, room?: string | null, data?: any): void {
    if (this.socket) this.socket.emit(event, room, data);
  }
}

export default new SocketService();
