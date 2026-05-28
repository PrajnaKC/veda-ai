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
    function normalizePaper(p: unknown): GeneratedPaper | unknown {
      if (!p || typeof p !== "object") return p;
      const paper = p as GeneratedPaper;
      if (!Array.isArray(paper.sections)) return p;

      const letters = ["A","B","C","D"];
      paper.sections = paper.sections.map((sec, sidx) => {
        const title = sec.title || `Section ${sidx + 1}`;
        const instruction = sec.instruction || "";
        const questions = (sec.questions || []).map((q, qidx) => {
          const qRaw = q as unknown as {
            question?: string;
            prompt?: string;
            text?: string;
            type?: string;
            marks?: number;
            difficulty?: string;
            options?: unknown[];
            answer?: string | number;
            meta?: Record<string, unknown>;
          };

          const text = qRaw.text || qRaw.question || qRaw.prompt || `Question ${qidx + 1}`;
          const type = (qRaw.type || "short") as GeneratedPaper["sections"][number]["questions"][number]["type"] | undefined;
          const marks = qRaw.marks || 1;
          const difficulty = ((qRaw.difficulty || "easy").toLowerCase() as "easy" | "medium" | "hard");

          const outQ: GeneratedPaper["sections"][number]["questions"][number] = {
            text,
            difficulty,
            marks,
            type,
          } as GeneratedPaper["sections"][number]["questions"][number];

          if (type === "mcq") {
            let opts = Array.isArray(qRaw.options) ? qRaw.options.map(String).filter(Boolean) : [];
            opts = Array.from(new Set(opts));
            for (let i = opts.length; i < 4; i++) opts.push(`Option ${letters[i] || i + 1}`);
            if (opts.length > 4) opts = opts.slice(0, 4);
            outQ.options = opts;
            if (typeof qRaw.answer === "string" && opts.includes(qRaw.answer)) outQ.answer = qRaw.answer;
            else if (typeof qRaw.answer === "number" && qRaw.answer >= 0 && qRaw.answer < opts.length) outQ.answer = opts[qRaw.answer];
            else outQ.answer = opts[0];
          }

          if (qRaw.meta) outQ.meta = qRaw.meta;

          return outQ;
        });

        return {
          title,
          instruction,
          questions,
        } as GeneratedPaper["sections"][number];
      });

      return paper;
    }

    const normalized = normalizePaper(generatedPaper);

    // Validate best-effort against schema; if fails, still persist normalized version
    generatedPaperSchema.safeParse(normalized as GeneratedPaper);

    await AssignmentModel.findByIdAndUpdate(assignmentId, {
      status: "completed",
      generatedPaper: normalized as GeneratedPaper
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
