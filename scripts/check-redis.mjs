import dotenv from 'dotenv';
import IORedis from 'ioredis';

// Load .env.local explicitly (dev uses .env.local)
dotenv.config({ path: '.env.local' });

async function main() {
  const url = process.env.REDIS_URL;
  console.log('Using REDIS_URL:', url ? (url.slice(0, 40) + '...') : 'undefined');
  if (!url) {
    console.error('REDIS_URL not set');
    process.exit(2);
  }

  const redis = new IORedis(url, { enableReadyCheck: true });

  redis.on('error', (err) => {
    console.error('Redis error:', err);
  });

  try {
    const pong = await redis.ping();
    console.log('PING response:', pong);
    const info = await redis.info();
    console.log('INFO length:', info.length);
    await redis.quit();
    process.exit(0);
  } catch (err) {
    console.error('Redis connection failed:', err);
    try { await redis.quit(); } catch {}
    process.exit(1);
  }
}

void main();
