import type { AssignmentStatus, GeneratedPaper } from "./assignment";

export type GenerationEventName =
  | "generation-started"
  | "generation-progress"
  | "generation-complete"
  | "generation-failed";

export type GenerationEventPayload = {
  assignmentId: string;
  status: AssignmentStatus;
  message: string;
  generatedPaper?: GeneratedPaper;
};
