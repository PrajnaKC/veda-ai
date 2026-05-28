import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

declare global {
  var mongooseCache: MongooseCache | undefined;
}

const cache = globalThis.mongooseCache ?? { conn: null, promise: null };

if (!globalThis.mongooseCache) {
  globalThis.mongooseCache = cache;
}

export async function connectToDatabase() {
  if (!uri) {
    throw new Error("MONGODB_URI is not configured");
  }

  if (cache.conn) {
    return cache.conn;
  }

  cache.promise ??= mongoose.connect(uri, {
    bufferCommands: false
  });

  cache.conn = await cache.promise;
  return cache.conn;
}
