"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.queueGeneration = queueGeneration;
exports.runGenerationJob = runGenerationJob;
const node_crypto_1 = __importDefault(require("node:crypto"));
const mongodb_ts_1 = require("../lib/mongodb.ts");
const redis_ts_1 = require("../lib/redis.ts");
const realtime_ts_1 = require("../lib/realtime.ts");
const gemini_ts_1 = require("../lib/gemini.ts");
const Assignment_ts_1 = require("../models/Assignment.ts");
const promptBuilder_ts_1 = require("./promptBuilder.ts");
function serializeAssignment(doc) {
    return JSON.parse(JSON.stringify(doc));
}
async function queueGeneration(assignmentId) {
    await (0, mongodb_ts_1.connectToDatabase)();
    const jobId = node_crypto_1.default.randomUUID();
    const assignment = await Assignment_ts_1.AssignmentModel.findByIdAndUpdate(assignmentId, { status: "queued", jobId }, { new: true });
    if (!assignment) {
        throw new Error("Assignment not found");
    }
    await (0, redis_ts_1.deleteCache)("assignments:list", `assignments:${assignmentId}`);
    await (0, realtime_ts_1.emitGenerationEvent)(assignmentId, "generation-started", {
        assignmentId,
        status: "queued",
        message: "Generation queued"
    });
    return { jobId, assignment: serializeAssignment(assignment) };
}
async function runGenerationJob(assignmentId) {
    await (0, mongodb_ts_1.connectToDatabase)();
    const assignmentDoc = await Assignment_ts_1.AssignmentModel.findByIdAndUpdate(assignmentId, { status: "processing" }, { new: true });
    if (!assignmentDoc) {
        throw new Error("Assignment not found");
    }
    await (0, realtime_ts_1.emitGenerationEvent)(assignmentId, "generation-progress", {
        assignmentId,
        status: "processing",
        message: "Generating structured paper"
    });
    try {
        const assignment = serializeAssignment(assignmentDoc);
        const prompt = (0, promptBuilder_ts_1.buildGenerationPrompt)(assignment);
        const generatedPaper = await (0, gemini_ts_1.generateStructuredPaper)(prompt);
        await Assignment_ts_1.AssignmentModel.findByIdAndUpdate(assignmentId, {
            status: "completed",
            generatedPaper
        });
        await (0, redis_ts_1.deleteCache)("assignments:list", `assignments:${assignmentId}`);
        await (0, realtime_ts_1.emitGenerationEvent)(assignmentId, "generation-complete", {
            assignmentId,
            status: "completed",
            message: "Generation completed",
            generatedPaper
        });
        return generatedPaper;
    }
    catch (error) {
        await Assignment_ts_1.AssignmentModel.findByIdAndUpdate(assignmentId, { status: "failed" });
        await (0, redis_ts_1.deleteCache)("assignments:list", `assignments:${assignmentId}`);
        await (0, realtime_ts_1.emitGenerationEvent)(assignmentId, "generation-failed", {
            assignmentId,
            status: "failed",
            message: error instanceof Error ? error.message : "Generation failed"
        });
        throw error;
    }
}
