import { Worker } from "bullmq";
import { getRedisConnection } from "../config/redis.ts";
import { runGenerationJob } from "../../../src/services/generationService.ts";

export function startGenerationWorker() {
  const worker = new Worker(
    "generationQueue",
    async (job) => {
      const { assignmentId } = job.data as { assignmentId: string };
      await runGenerationJob(assignmentId);
      return { assignmentId };
    },
    {
      connection: getRedisConnection() as never,
      concurrency: 2
    }
  );

  worker.on("failed", (job, error) => {
    console.error("Generation worker job failed", {
      jobId: job?.id,
      assignmentId: job?.data?.assignmentId,
      error: error?.message
    });
  });

  worker.on("error", (error) => {
    console.error("Generation worker error", error);
  });

  return worker;
}
