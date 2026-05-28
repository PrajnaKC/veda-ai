import type { Server as SocketIOServer } from "socket.io";
import type { GenerationEventName, GenerationEventPayload } from "@/types/socket";

type RealtimeServer = SocketIOServer | null;

declare global {
  // eslint-disable-next-line no-var
  var vedaRealtimeServer: RealtimeServer | undefined;
}

export function setRealtimeServer(server: SocketIOServer) {
  globalThis.vedaRealtimeServer = server;
}

export function getRealtimeServer() {
  return globalThis.vedaRealtimeServer ?? null;
}

export async function emitGenerationEvent(
  assignmentId: string,
  event: GenerationEventName,
  payload: GenerationEventPayload
) {
  const server = getRealtimeServer();
  if (!server) return;

  server.to(`assignment-${assignmentId}`).emit(event, payload);
}
