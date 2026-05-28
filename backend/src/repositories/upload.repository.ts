import { UploadModel } from "../models/Upload";

export async function createUpload(payload: Record<string, unknown>) {
  return UploadModel.create(payload);
}
