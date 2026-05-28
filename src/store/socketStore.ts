"use client";

import { create } from "zustand";
import { io, type Socket } from "socket.io-client";
import type { GenerationEventPayload } from "@/types/socket";

type SocketState = {
  connection?: Socket;
  realtimeStatus?: GenerationEventPayload;
  liveUpdates: GenerationEventPayload[];
  connect: (assignmentId: string) => void;
  disconnect: () => void;
};

export const useSocketStore = create<SocketState>((set, get) => ({
  connection: undefined,
  realtimeStatus: undefined,
  liveUpdates: [],
  connect: (assignmentId) => {
    const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL;
    if (!socketUrl || get().connection) return;

    const connection = io(socketUrl, { transports: ["websocket"] });
    connection.emit("join-assignment", assignmentId);

    const handleEvent = (payload: GenerationEventPayload) => {
      set((state) => ({
        realtimeStatus: payload,
        liveUpdates: [...state.liveUpdates, payload]
      }));
    };

    connection.on("generation-started", handleEvent);
    connection.on("generation-progress", handleEvent);
    connection.on("generation-complete", handleEvent);
    connection.on("generation-failed", handleEvent);

    set({ connection });
  },
  disconnect: () => {
    get().connection?.disconnect();
    set({ connection: undefined, realtimeStatus: undefined, liveUpdates: [] });
  }
}));
