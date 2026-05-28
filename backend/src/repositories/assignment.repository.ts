import { AssignmentModel } from "../models/Assignment.ts";

export async function listAssignments() {
  return AssignmentModel.find().sort({ createdAt: -1 }).lean();
}

export async function findAssignmentById(id: string) {
  return AssignmentModel.findById(id).lean();
}

export async function createAssignment(payload: Record<string, unknown>) {
  return AssignmentModel.create(payload);
}

export async function updateAssignment(id: string, payload: Record<string, unknown>) {
  return AssignmentModel.findByIdAndUpdate(id, payload, { new: true });
}

export async function deleteAssignment(id: string) {
  return AssignmentModel.findByIdAndDelete(id);
}
