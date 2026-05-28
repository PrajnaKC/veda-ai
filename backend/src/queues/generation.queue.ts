import { Queue } from "bullmq";
import { getRedisConnection } from "../config/redis.ts";

const connection = getRedisConnection();

export const generationQueue = connection
  ? new Queue("generationQueue", { connection: connection as never })
  : null;
