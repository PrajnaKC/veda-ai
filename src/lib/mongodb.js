"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = connectToDatabase;
const mongoose_1 = __importDefault(require("mongoose"));
const uri = process.env.MONGODB_URI;
const cache = (_a = globalThis.mongooseCache) !== null && _a !== void 0 ? _a : { conn: null, promise: null };
if (!globalThis.mongooseCache) {
    globalThis.mongooseCache = cache;
}
async function connectToDatabase() {
    var _a;
    if (!uri) {
        throw new Error("MONGODB_URI is not configured");
    }
    if (cache.conn) {
        return cache.conn;
    }
    (_a = cache.promise) !== null && _a !== void 0 ? _a : (cache.promise = mongoose_1.default.connect(uri, {
        bufferCommands: false
    }));
    cache.conn = await cache.promise;
    return cache.conn;
}
