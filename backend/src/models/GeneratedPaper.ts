import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const generatedPaperSchema = new Schema(
  {
    assignmentId: { type: String, required: true, index: true },
    paperInfo: {
      schoolName: { type: String, required: true },
      subject: { type: String, required: true },
      className: { type: String, required: true },
      examTitle: { type: String, required: true },
      timeAllowed: { type: String, required: true },
      maximumMarks: { type: Number, required: true }
    },
    studentInfo: {
      showName: { type: Boolean, default: true },
      showRollNumber: { type: Boolean, default: true },
      showSection: { type: Boolean, default: true }
    },
    sections: [
      {
        title: { type: String, required: true },
        instruction: { type: String, required: true },
        questions: [
          {
            questionNumber: { type: Number, required: true },
            question: { type: String, required: true },
            difficulty: { type: String, enum: ["Easy", "Moderate", "Hard"], required: true },
            marks: { type: Number, required: true }
          }
        ]
      }
    ],
    answerKey: [
      {
        questionNumber: { type: Number, required: true },
        answer: { type: String, required: true }
      }
    ],
    pdfUrl: { type: String, required: false }
  },
  { timestamps: true }
);

export type GeneratedPaperDocument = InferSchemaType<typeof generatedPaperSchema>;

export const GeneratedPaperModel =
  (mongoose.models.GeneratedPaper as Model<GeneratedPaperDocument>) ??
  mongoose.model<GeneratedPaperDocument>("GeneratedPaper", generatedPaperSchema);
