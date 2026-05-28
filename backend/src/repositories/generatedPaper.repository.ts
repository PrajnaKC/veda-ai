import { GeneratedPaperModel } from "../models/GeneratedPaper.ts";

export async function upsertGeneratedPaper(assignmentId: string, payload: Record<string, unknown>) {
  return GeneratedPaperModel.findOneAndUpdate({ assignmentId }, { ...payload, assignmentId }, { upsert: true, new: true });
}

export async function findGeneratedPaper(assignmentId: string) {
  return GeneratedPaperModel.findOne({ assignmentId }).lean();
}
