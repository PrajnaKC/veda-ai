import { Worker } from "bullmq";
import { getRedisConnection } from "../config/redis";
import { connectToDatabase } from "../../../src/lib/mongodb";
import { createAssignmentPdf } from "../../../src/services/pdfService";
import { AssignmentModel } from "../../../src/models/Assignment";

export function startPdfWorker() {
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
      connection: getRedisConnection() as never,
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
