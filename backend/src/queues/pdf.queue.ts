import { Queue } from "bullmq";
import { getRedisConnection } from "../config/redis.ts";

export const pdfQueue = new Queue("pdfQueue", {
  connection: getRedisConnection() as never
});
