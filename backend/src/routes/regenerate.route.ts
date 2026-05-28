import { Router } from "express";
import { queueGeneration, runGenerationJob } from "../../../src/services/generationService.ts";
import { generationQueue } from "../queues/generation.queue.ts";

export const regenerateRouter = Router();

regenerateRouter.post("/:assignmentId", async (req, res) => {
  try {
    const { assignmentId } = req.params;
    const queued = await queueGeneration(assignmentId);
    const job = generationQueue ? await generationQueue.add("generation", { assignmentId }) : null;

    if (!generationQueue) {
      await runGenerationJob(assignmentId);
    }

    return res.json({
      data: {
        assignmentId,
        jobId: job?.id ?? null,
        status: generationQueue ? queued.assignment.status : "completed"
      }
    });
  } catch (error) {
    return res.status(500).json({ error: error instanceof Error ? error.message : "Failed to regenerate assignment" });
  }
});
