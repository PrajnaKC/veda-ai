import { Queue } from "bullmq";
import { getRedisConnection } from "../config/redis";

export const pdfQueue = new Queue("pdfQueue", {
  connection: getRedisConnection() as never
});
