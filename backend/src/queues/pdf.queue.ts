import { Queue } from "bullmq";
import { getRedisConnection } from "../config/redis.ts";

const connection = getRedisConnection();

export const pdfQueue = connection
  ? new Queue("pdfQueue", { connection: connection as never })
  : null;
