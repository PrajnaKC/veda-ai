import crypto from "node:crypto";
import { connectToDatabase } from "../lib/mongodb.ts";
import { deleteCache } from "../lib/redis.ts";
import { emitGenerationEvent } from "../lib/realtime.ts";
import { generateStructuredPaper } from "../lib/gemini.ts";
import { AssignmentModel } from "../models/Assignment.ts";
import { buildGenerationPrompt } from "./promptBuilder.ts";
import type { Assignment, GeneratedPaper } from "../types/assignment.ts";
import { generatedPaperSchema } from "../lib/validators.ts";

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

    // Normalize generated paper: ensure MCQs have exactly 4 options and safe defaults
    function normalizePaper(p: any): any {
      if (!p || !Array.isArray(p.sections)) return p;
      const letters = ["A","B","C","D"];
      p.sections = p.sections.map((sec: any, sidx: number) => {
        sec.title = sec.title || `Section ${sidx + 1}`;
        sec.instruction = sec.instruction || "";
        sec.questions = (sec.questions || []).map((q: any, qidx: number) => {
          q.text = q.text || q.question || q.prompt || `Question ${qidx + 1}`;
          q.type = q.type || "short";
          q.marks = q.marks || 1;
          q.difficulty = (q.difficulty || "easy").toLowerCase();

          if (q.type === "mcq") {
            let opts = Array.isArray(q.options) ? q.options.map(String).filter(Boolean) : [];
            // ensure unique
            opts = Array.from(new Set(opts));
            // pad or trim to 4
            for (let i = opts.length; i < 4; i++) opts.push(`Option ${letters[i] || i + 1}`);
            if (opts.length > 4) opts = opts.slice(0, 4);
            q.options = opts;
            // normalize answer
            if (!q.answer || !opts.includes(String(q.answer))) {
              // if numeric index provided, convert
              if (typeof q.answer === "number" && q.answer >= 0 && q.answer < opts.length) q.answer = opts[q.answer];
              else q.answer = opts[0];
            }
          } else {
            // remove options for non-mcq
            if (q.options) delete q.options;
          }

          return q;
        });

        return sec;
      });

      return p;
    }

    const normalized = normalizePaper(generatedPaper);

    // Validate best-effort against schema; if fails, still persist normalized version
    const validation = generatedPaperSchema.safeParse(normalized);

    await AssignmentModel.findByIdAndUpdate(assignmentId, {
      status: "completed",
      generatedPaper: normalized
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
