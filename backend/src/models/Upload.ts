import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const uploadSchema = new Schema(
  {
    assignmentId: { type: Schema.Types.ObjectId, required: true, index: true },
    originalName: { type: String, required: true },
    fileUrl: { type: String, required: false },
    mimeType: { type: String, required: true },
    extractedText: { type: String, default: "" }
  },
  { timestamps: true }
);

export type UploadDocument = InferSchemaType<typeof uploadSchema>;

export const UploadModel =
  (mongoose.models.Upload as Model<UploadDocument>) ?? mongoose.model<UploadDocument>("Upload", uploadSchema);
