import { Server as SocketIOServer } from "socket.io";
import type { Server as HttpServer } from "node:http";
import { setRealtimeServer } from "../../../src/lib/realtime";

export function createSocketServer(httpServer: HttpServer) {
  const socketUrl = process.env.CLIENT_URL || "http://localhost:3000";

  const io = new SocketIOServer(httpServer, {
    cors: {
      origin: socketUrl,
      methods: ["GET", "POST", "DELETE"]
    }
  });

  setRealtimeServer(io);

  io.on("connection", (socket) => {
    socket.on("join-assignment", (assignmentId: string) => {
      socket.join(`assignment-${assignmentId}`);
    });

    socket.on("leave-assignment", (assignmentId: string) => {
      socket.leave(`assignment-${assignmentId}`);
    });
  });

  return io;
}
