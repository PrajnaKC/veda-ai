import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const questionTypeSchema = new Schema(
  {
    type: { type: String, required: true, trim: true },
    count: { type: Number, required: true, min: 1 },
    marks: { type: Number, required: true, min: 1 }
  },
  { _id: false }
);

const uploadedFileSchema = new Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    size: { type: Number, required: true },
    extractedText: { type: String }
  },
  { _id: false }
);

const generatedPaperSchema = new Schema(
  {
    sections: [
      {
        title: { type: String, required: true },
        instruction: { type: String, required: true },
        questions: [
          {
            text: { type: String, required: true },
            difficulty: { type: String, enum: ["easy", "medium", "hard"], required: true },
            marks: { type: Number, required: true }
          }
        ]
      }
    ]
  },
  { _id: false }
);

const assignmentSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    institutionName: { type: String, required: true, trim: true },
    collegeName: { type: String, trim: true },
    department: { type: String, required: true, trim: true },
    subject: { type: String, required: true, trim: true },
    courseCode: { type: String, required: true, trim: true },
    examType: { type: String, required: true, trim: true },
    semester: { type: String, required: true, trim: true },
    duration: { type: String, required: true, trim: true },
    totalMarks: { type: Number, required: true, min: 1 },
    dueDate: { type: Date, required: true },
    instructions: { type: String },
    questionTypes: { type: [questionTypeSchema], default: [] },
    uploadedFile: uploadedFileSchema,
    status: {
      type: String,
      enum: ["queued", "processing", "completed", "failed"],
      default: "queued",
      index: true
    },
    generatedPaper: generatedPaperSchema,
    jobId: { type: String }
  },
  { timestamps: true }
);

export type AssignmentDocument = InferSchemaType<typeof assignmentSchema>;

export const AssignmentModel =
  (mongoose.models.Assignment as Model<AssignmentDocument>) ??
  mongoose.model<AssignmentDocument>("Assignment", assignmentSchema);
