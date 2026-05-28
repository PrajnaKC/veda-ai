import { Router } from "express";
import { queueGeneration } from "../../../src/services/generationService";
import { generationQueue } from "../queues/generation.queue";

export const generateRouter = Router();

generateRouter.post("/:assignmentId", async (req, res) => {
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
    return res.status(500).json({ error: error instanceof Error ? error.message : "Failed to queue generation" });
  }
});

generateRouter.post("/", async (req, res) => {
  const assignmentId = req.body?.assignmentId;
  if (typeof assignmentId !== "string" || !assignmentId) {
    return res.status(400).json({ error: "Assignment id is required" });
  }

  try {
    const queued = await queueGeneration(assignmentId);
    const job = await generationQueue.add("generation", { assignmentId });
    return res.json({ data: { assignmentId, jobId: job.id, status: queued.assignment.status } });
  } catch (error) {
    return res.status(500).json({ error: error instanceof Error ? error.message : "Failed to queue generation" });
  }
});

generateRouter.post("/regenerate/:assignmentId", async (req, res) => {
  try {
    const { assignmentId } = req.params;
    const queued = await queueGeneration(assignmentId);
    const job = await generationQueue.add("generation", { assignmentId });
    return res.json({ data: { assignmentId, jobId: job.id, status: queued.assignment.status } });
  } catch (error) {
    return res.status(500).json({ error: error instanceof Error ? error.message : "Failed to regenerate assignment" });
  }
});
