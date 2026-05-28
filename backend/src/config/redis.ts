import IORedis from "ioredis";

let redisConnection: IORedis | null = null;

export function getRedisConnection() {
  const redisUrl = process.env.REDIS_URL;

  if (!redisUrl) {
    return null;
  }

  redisConnection ??= new IORedis(redisUrl, {
    maxRetriesPerRequest: null,
    enableReadyCheck: false
  });

  return redisConnection;
}
