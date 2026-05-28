import { Router } from "express";
import { queueGeneration } from "../../../src/services/generationService";
import { generationQueue } from "../queues/generation.queue";

export const regenerateRouter = Router();

regenerateRouter.post("/:assignmentId", async (req, res) => {
  try {
    const { assignmentId } = req.params;
    const queued = await queueGeneration(assignmentId);
    const job = await generationQueue.add("generation", { assignmentId });

    return res.json({
      data: {
        assignmentId,
        jobId: job.id,
        status: queued.assignment.status
      }
    });
  } catch (error) {
    return res.status(500).json({ error: error instanceof Error ? error.message : "Failed to regenerate assignment" });
  }
});
