import crypto from "node:crypto";
import { connectToDatabase } from "../lib/mongodb.ts";
import { deleteCache } from "../lib/redis.ts";
import { emitGenerationEvent } from "../lib/realtime.ts";
import { generateStructuredPaper } from "../lib/gemini.ts";
import { AssignmentModel } from "../models/Assignment.ts";
import { buildGenerationPrompt } from "./promptBuilder.ts";
import type { Assignment, GeneratedPaper } from "../types/assignment.ts";

function serializeAssignment(doc: unknown): Assignment {
  return JSON.parse(JSON.stringify(doc)) as Assignment;
}

export async function queueGeneration(assignmentId: string) {
  await connectToDatabase();
  const jobId = crypto.randomUUID();

  const assignment = await AssignmentModel.findByIdAndUpdate(
    assignmentId,
    { status: "queued", jobId },
    { new: true }
  );

  if (!assignment) {
    throw new Error("Assignment not found");
  }

  await deleteCache("assignments:list", `assignments:${assignmentId}`);
  await emitGenerationEvent(assignmentId, "generation-started", {
    assignmentId,
    status: "queued",
    message: "Generation queued"
  });

  return { jobId, assignment: serializeAssignment(assignment) };
}

export async function runGenerationJob(assignmentId: string): Promise<GeneratedPaper> {
  await connectToDatabase();

  const assignmentDoc = await AssignmentModel.findByIdAndUpdate(
    assignmentId,
    { status: "processing" },
    { new: true }
  );

  if (!assignmentDoc) {
    throw new Error("Assignment not found");
  }

  await emitGenerationEvent(assignmentId, "generation-progress", {
    assignmentId,
    status: "processing",
    message: "Generating structured paper"
  });

  try {
    const assignment = serializeAssignment(assignmentDoc);
    const prompt = buildGenerationPrompt(assignment);
    const generatedPaper = await generateStructuredPaper(prompt);

    await AssignmentModel.findByIdAndUpdate(assignmentId, {
      status: "completed",
      generatedPaper
    });

    await deleteCache("assignments:list", `assignments:${assignmentId}`);
    await emitGenerationEvent(assignmentId, "generation-complete", {
      assignmentId,
      status: "completed",
      message: "Generation completed",
      generatedPaper
    });

    return generatedPaper;
  } catch (error) {
    await AssignmentModel.findByIdAndUpdate(assignmentId, { status: "failed" });
    await deleteCache("assignments:list", `assignments:${assignmentId}`);
    await emitGenerationEvent(assignmentId, "generation-failed", {
      assignmentId,
      status: "failed",
      message: error instanceof Error ? error.message : "Generation failed"
    });
    throw error;
  }
}
