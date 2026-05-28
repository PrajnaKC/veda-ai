import pdfParse from "pdf-parse";

export async function extractUploadedFile(file: Express.Multer.File) {
  let extractedText = "";

  if (file.mimetype === "application/pdf" || file.originalname.toLowerCase().endsWith(".pdf")) {
    const parsed = await pdfParse(file.buffer);
    extractedText = parsed.text;
  } else if (file.mimetype.startsWith("text/") || file.originalname.toLowerCase().endsWith(".txt")) {
    extractedText = file.buffer.toString("utf8");
  }

  return {
    originalName: file.originalname,
    mimeType: file.mimetype || "application/octet-stream",
    size: file.size,
    extractedText
  };
}
