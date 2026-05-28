import pdfParse from "pdf-parse";

let ocrWorkerPromise: Promise<any> | null = null;

async function getOcrWorker() {
  ocrWorkerPromise ??= (async () => {
    const { createWorker } = await import("tesseract.js");
    const worker: any = createWorker();
    await worker.load();
    await worker.loadLanguage("eng");
    await worker.initialize("eng");
    return worker as any;
  })();

  return ocrWorkerPromise;
}

async function ocrBuffer(buffer: Buffer) {
  const worker = await getOcrWorker();
  const { data } = await worker.recognize(buffer);
  return data?.text?.trim() || "";
}

async function extractImagesFromPdf(buffer: Buffer) {
  try {
    const { PDFDocument, PDFName, PDFRawStream } = await import("pdf-lib");
    const pdfDoc = await PDFDocument.load(buffer);
    const extracted: Buffer[] = [];

    const context: any = (pdfDoc as any).context;

    const pages = pdfDoc.getPages();
    for (const page of pages) {
      // @ts-ignore - use low-level API to find XObject images
      const resources = (page as any).node.Resources();
      if (!resources) continue;

      // try to get XObject dictionary
      let xObject = null;
      try {
        xObject = resources.get(PDFName.of("XObject"));
      } catch (e) {
        xObject = null;
      }

      if (!xObject) continue;

      const xObjectDict = context.lookup(xObject);
      if (!xObjectDict || typeof xObjectDict.keys !== "function") continue;

      for (const key of xObjectDict.keys()) {
        try {
          const val = xObjectDict.get(key);
          const xObjectEntry: any = context.lookup(val);
          // image objects are streams (raw streams)
          if (xObjectEntry && xObjectEntry instanceof PDFRawStream) {
            const subtype = xObjectEntry.dict.get(PDFName.of("Subtype"));
            if (subtype && (subtype as any).name === "Image") {
              const bytes = xObjectEntry.contents;
              if (bytes) extracted.push(Buffer.from(bytes));
            }
          }
        } catch (e) {
          // ignore individual image extraction errors
        }
      }
    }

    return extracted;
  } catch (err) {
    return [];
  }
}

export async function extractUploadedFile(file: Express.Multer.File) {
  let extractedText = "";

  if (file.mimetype === "application/pdf" || file.originalname.toLowerCase().endsWith(".pdf")) {
    const parsed = await pdfParse(file.buffer);
    extractedText = parsed.text || "";

    // If parsed text is short, attempt to OCR embedded images (scanned PDF pages)
    if ((extractedText || "").trim().length < 200) {
      const images = await extractImagesFromPdf(file.buffer);
      if (images.length > 0) {
        const ocrResults: string[] = [];
        for (const imgBuf of images) {
          try {
            const t = await ocrBuffer(imgBuf as Buffer);
            if (t) ocrResults.push(t);
          } catch (e) {
            // continue
          }
        }
        if (ocrResults.length > 0) {
          // append OCRed page texts after parsed text
          extractedText = ([extractedText || ""].concat(ocrResults)).join("\n\n");
        }
      }
    }
  } else if (file.mimetype.startsWith("text/") || file.originalname.toLowerCase().endsWith(".txt")) {
    extractedText = file.buffer.toString("utf8");
  } else if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    extractedText = await ocrBuffer(file.buffer);
  }

  return {
    name: file.originalname,
    type: file.mimetype || "application/octet-stream",
    size: file.size,
    extractedText,
    originalName: file.originalname,
    mimeType: file.mimetype || "application/octet-stream"
  };
}
