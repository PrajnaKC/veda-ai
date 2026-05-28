"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CACHE_TTL_SECONDS = void 0;
exports.getRedis = getRedis;
exports.getCache = getCache;
exports.setCache = setCache;
exports.deleteCache = deleteCache;
const redis_1 = require("@upstash/redis");
exports.CACHE_TTL_SECONDS = 3600;
let redisClient = null;
function getRedis() {
    const url = process.env.UPSTASH_REDIS_REST_URL;
    const token = process.env.UPSTASH_REDIS_REST_TOKEN;
    if (!url || !token) {
        return null;
    }
    redisClient !== null && redisClient !== void 0 ? redisClient : (redisClient = new redis_1.Redis({ url, token }));
    return redisClient;
}
async function getCache(key) {
    const redis = getRedis();
    if (!redis)
        return null;
    return redis.get(key);
}
async function setCache(key, value, ttl = exports.CACHE_TTL_SECONDS) {
    const redis = getRedis();
    if (!redis)
        return;
    await redis.set(key, value, { ex: ttl });
}
async function deleteCache(...keys) {
    const redis = getRedis();
    if (!redis || keys.length === 0)
        return;
    await redis.del(...keys);
}
