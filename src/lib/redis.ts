import { Redis } from "@upstash/redis";

export const CACHE_TTL_SECONDS = 3600;

let redisClient: Redis | null = null;

export function getRedis() {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    return null;
  }

  redisClient ??= new Redis({ url, token });
  return redisClient;
}

export async function getCache<T>(key: string): Promise<T | null> {
  const redis = getRedis();
  if (!redis) return null;
  return redis.get<T>(key);
}

export async function setCache<T>(key: string, value: T, ttl = CACHE_TTL_SECONDS) {
  const redis = getRedis();
  if (!redis) return;
  await redis.set(key, value, { ex: ttl });
}

export async function deleteCache(...keys: string[]) {
  const redis = getRedis();
  if (!redis || keys.length === 0) return;
  await redis.del(...keys);
}
