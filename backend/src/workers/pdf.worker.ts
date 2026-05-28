import { Worker } from "bullmq";
import { getRedisConnection } from "../config/redis.ts";
import { connectToDatabase } from "../../../src/lib/mongodb.ts";
import { createAssignmentPdf } from "../../../src/services/pdfService.ts";
import { AssignmentModel } from "../../../src/models/Assignment.ts";

export function startPdfWorker() {
  const connection = getRedisConnection();
  if (!connection) {
    console.warn("PDF worker disabled: REDIS_URL is not configured");
    return null;
  }

  const worker = new Worker(
    "pdfQueue",
    async (job) => {
      const { assignmentId } = job.data as { assignmentId: string };

      await connectToDatabase();
      const assignment = await AssignmentModel.findById(assignmentId).lean();
      if (!assignment) {
        throw new Error("Assignment not found");
      }

      const pdf = createAssignmentPdf(assignment as never);
      return { assignmentId, pdfSize: pdf.length };
    },
    {
      connection: connection as never,
      concurrency: 1
    }
  );

  worker.on("failed", (job, error) => {
    console.error("PDF worker job failed", {
      jobId: job?.id,
      assignmentId: job?.data?.assignmentId,
      error: error?.message
    });
  });

  worker.on("error", (error) => {
    console.error("PDF worker error", error);
  });

  return worker;
}
