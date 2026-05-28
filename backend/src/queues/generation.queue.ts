import { Queue } from "bullmq";
import { getRedisConnection } from "../config/redis";

export const generationQueue = new Queue("generationQueue", {
  connection: getRedisConnection() as never
});
