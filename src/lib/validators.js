"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pdfRequestSchema = exports.generateRequestSchema = exports.assignmentUpdateSchema = exports.assignmentCreateSchema = exports.generatedPaperSchema = exports.generatedQuestionSchema = exports.uploadedFileSchema = exports.questionTypeSchema = void 0;
const zod_1 = require("zod");
exports.questionTypeSchema = zod_1.z.object({
    type: zod_1.z.string().trim().min(1, "Question type is required"),
    count: zod_1.z.coerce.number().int().positive("Question count must be greater than zero"),
    marks: zod_1.z.coerce.number().int().positive("Marks must be greater than zero")
});
exports.uploadedFileSchema = zod_1.z.object({
    name: zod_1.z.string().trim().min(1),
    type: zod_1.z.string().trim().min(1),
    size: zod_1.z.number().nonnegative(),
    extractedText: zod_1.z.string().optional()
});
exports.generatedQuestionSchema = zod_1.z.object({
    text: zod_1.z.string().trim().min(1),
    difficulty: zod_1.z.enum(["easy", "medium", "hard"]),
    marks: zod_1.z.number().int().positive()
});
exports.generatedPaperSchema = zod_1.z.object({
    sections: zod_1.z.array(zod_1.z.object({
        title: zod_1.z.string().trim().min(1),
        instruction: zod_1.z.string().trim().min(1),
        questions: zod_1.z.array(exports.generatedQuestionSchema).min(1)
    })).min(1)
});
exports.assignmentCreateSchema = zod_1.z.object({
    title: zod_1.z.string().trim().min(1, "Title is required"),
    institutionName: zod_1.z.string().trim().min(1, "Institution name is required"),
    collegeName: zod_1.z.string().trim().optional(),
    department: zod_1.z.string().trim().min(1, "Department is required"),
    subject: zod_1.z.string().trim().min(1, "Subject is required"),
    courseCode: zod_1.z.string().trim().min(1, "Course code is required"),
    examType: zod_1.z.string().trim().min(1, "Exam type is required"),
    semester: zod_1.z.string().trim().min(1, "Semester is required"),
    duration: zod_1.z.string().trim().min(1, "Duration is required"),
    totalMarks: zod_1.z.coerce.number().int().positive("Total marks must be greater than zero"),
    dueDate: zod_1.z.string().trim().min(1, "Due date is required"),
    instructions: zod_1.z.string().trim().optional(),
    questionTypes: zod_1.z.array(exports.questionTypeSchema).min(1, "At least one question type is required"),
    uploadedFile: exports.uploadedFileSchema.optional()
});
exports.assignmentUpdateSchema = exports.assignmentCreateSchema.partial();
exports.generateRequestSchema = zod_1.z.object({
    assignmentId: zod_1.z.string().trim().min(1, "Assignment id is required")
});
exports.pdfRequestSchema = zod_1.z.object({
    assignmentId: zod_1.z.string().trim().min(1, "Assignment id is required")
});
