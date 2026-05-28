import { Router } from "express";
import { connectToDatabase } from "../../../src/lib/mongodb.ts";
import { AssignmentModel } from "../models/Assignment.ts";
import { createAssignmentPdf } from "../../../src/services/pdfService.ts";
import { pdfQueue } from "../queues/pdf.queue.ts";
import { GeneratedPaperModel } from "../models/GeneratedPaper.ts";

export const pdfRouter = Router();

pdfRouter.get("/:assignmentId", async (req, res) => {
  try {
    const { assignmentId } = req.params;
    await connectToDatabase();

    const assignment = await AssignmentModel.findById(assignmentId).lean();
    if (!assignment) {
      return res.status(404).json({ error: "Assignment not found" });
    }

    const pdf = createAssignmentPdf(assignment as never);
    await pdfQueue?.add("pdf", { assignmentId });

    await GeneratedPaperModel.findOneAndUpdate(
      { assignmentId },
      { assignmentId, pdfUrl: `/api/pdf/${assignmentId}` },
      { upsert: true, new: true }
    );

    return res
      .status(200)
      .setHeader("content-type", "application/pdf")
      .setHeader("content-disposition", `attachment; filename="${assignment.title.replaceAll('"', "")}.pdf"`)
      .send(Buffer.from(pdf));
  } catch (error) {
    return res.status(500).json({ error: error instanceof Error ? error.message : "Failed to create PDF" });
  }
});
