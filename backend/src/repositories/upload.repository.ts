import { UploadModel } from "../models/Upload.ts";

export async function createUpload(payload: Record<string, unknown>) {
  return UploadModel.create(payload);
}
