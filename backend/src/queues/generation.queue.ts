import { Queue } from "bullmq";
import { getRedisConnection } from "../config/redis.ts";

export const generationQueue = new Queue("generationQueue", {
  connection: getRedisConnection() as never
});
