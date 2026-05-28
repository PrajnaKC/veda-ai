import PusherServer from "pusher";
import type { GenerationEventName, GenerationEventPayload } from "@/types/socket";

let pusherServer: PusherServer | null = null;

export function getPusherServer() {
  const appId = process.env.PUSHER_APP_ID;
  const key = process.env.PUSHER_KEY;
  const secret = process.env.PUSHER_SECRET;
  const cluster = process.env.PUSHER_CLUSTER;

  if (!appId || !key || !secret || !cluster) {
    return null;
  }

  pusherServer ??= new PusherServer({
    appId,
    key,
    secret,
    cluster,
    useTLS: true
  });

  return pusherServer;
}

export async function publishGenerationEvent(
  assignmentId: string,
  event: GenerationEventName,
  payload: GenerationEventPayload
) {
  const pusher = getPusherServer();
  if (!pusher) return;
  await pusher.trigger(`assignment-${assignmentId}`, event, payload);
}
