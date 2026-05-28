import { z } from "zod";

export const questionTypeSchema = z.object({
  type: z.string().trim().min(1, "Question type is required"),
  count: z.coerce.number().int().positive("Question count must be greater than zero"),
  marks: z.coerce.number().int().positive("Marks must be greater than zero")
});

export const uploadedFileSchema = z.object({
  name: z.string().trim().min(1),
  type: z.string().trim().min(1),
  size: z.number().nonnegative(),
  extractedText: z.string().optional()
});

export const generatedQuestionSchema = z.object({
  text: z.string().trim().min(1),
  difficulty: z.enum(["easy", "medium", "hard"]),
  marks: z.number().int().positive()
});

export const generatedPaperSchema = z.object({
  sections: z.array(
    z.object({
      title: z.string().trim().min(1),
      instruction: z.string().trim().min(1),
      questions: z.array(generatedQuestionSchema).min(1)
    })
  ).min(1)
});

export const assignmentCreateSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  institutionName: z.string().trim().min(1, "Institution name is required"),
  collegeName: z.string().trim().optional(),
  department: z.string().trim().min(1, "Department is required"),
  subject: z.string().trim().min(1, "Subject is required"),
  courseCode: z.string().trim().min(1, "Course code is required"),
  examType: z.string().trim().min(1, "Exam type is required"),
  semester: z.string().trim().min(1, "Semester is required"),
  duration: z.string().trim().min(1, "Duration is required"),
  totalMarks: z.coerce.number().int().positive("Total marks must be greater than zero"),
  dueDate: z.string().trim().min(1, "Due date is required"),
  instructions: z.string().trim().optional(),
  questionTypes: z.array(questionTypeSchema).min(1, "At least one question type is required"),
  uploadedFile: uploadedFileSchema.optional()
});

export const assignmentUpdateSchema = assignmentCreateSchema.partial();

export const generateRequestSchema = z.object({
  assignmentId: z.string().trim().min(1, "Assignment id is required")
});

export const pdfRequestSchema = z.object({
  assignmentId: z.string().trim().min(1, "Assignment id is required")
});
