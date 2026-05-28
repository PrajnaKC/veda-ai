import { Router } from "express";
import { connectToDatabase } from "../../../src/lib/mongodb";
import { AssignmentModel } from "../models/Assignment";
import { findGeneratedPaper } from "../repositories/generatedPaper.repository";

function serialize(doc: unknown) {
  return JSON.parse(JSON.stringify(doc));
}

export const outputRouter = Router();

outputRouter.get("/:assignmentId", async (req, res) => {
  try {
    const { assignmentId } = req.params;
    await connectToDatabase();

    const assignment = await AssignmentModel.findById(assignmentId).lean();
    if (!assignment) {
      return res.status(404).json({ error: "Assignment not found" });
    }

    const paper = await findGeneratedPaper(assignmentId);

    return res.json({
      data: {
        assignment: serialize(assignment),
        generatedPaper: paper ?? serialize(assignment.generatedPaper ?? null)
      }
    });
  } catch (error) {
    return res.status(500).json({ error: error instanceof Error ? error.message : "Failed to fetch output" });
  }
});
