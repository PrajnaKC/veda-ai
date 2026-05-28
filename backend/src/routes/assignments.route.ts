import { Router } from "express";
import multer from "multer";
import { connectToDatabase } from "../../../src/lib/mongodb";
import { deleteCache, getCache, setCache } from "../../../src/lib/redis";
import { assignmentCreateSchema } from "../../../src/lib/validators";
import { AssignmentModel } from "../models/Assignment";
import { extractUploadedFile } from "../utils/upload";

const upload = multer({ storage: multer.memoryStorage() });

function serialize(doc: unknown) {
  return JSON.parse(JSON.stringify(doc));
}

async function parseRequest(req: import("express").Request) {
  if (!req.is("multipart/form-data")) {
    return req.body;
  }

  const rawPayload = req.body.payload;
  if (typeof rawPayload !== "string") {
    throw new Error("Multipart requests must include a JSON payload field");
  }

  const payload = JSON.parse(rawPayload);
  const file = req.file;

  if (file) {
    const uploadedFile = await extractUploadedFile(file);
    payload.uploadedFile = uploadedFile;
  }

  return payload;
}

export const assignmentsRouter = Router();

assignmentsRouter.get("/", async (_req, res) => {
  try {
    const cached = await getCache("assignments:list");
    if (cached) {
      return res.json({ data: cached });
    }

    await connectToDatabase();
    const assignments = await AssignmentModel.find().sort({ createdAt: -1 }).lean();
    const data = assignments.map(serialize);
    await setCache("assignments:list", data);

    return res.json({ data });
  } catch (error) {
    return res.status(500).json({ error: error instanceof Error ? error.message : "Failed to fetch assignments" });
  }
});

assignmentsRouter.post("/", upload.single("file"), async (req, res) => {
  try {
    const payload = await parseRequest(req);
    const parsed = assignmentCreateSchema.parse(payload);

    await connectToDatabase();
    const assignment = await AssignmentModel.create({
      ...parsed,
      status: "queued"
    });

    await deleteCache("assignments:list");
    return res.status(201).json({ data: serialize(assignment) });
  } catch (error) {
    const status = error instanceof Error && error.name === "ZodError" ? 400 : 500;
    return res.status(status).json({ error: error instanceof Error ? error.message : "Failed to create assignment" });
  }
});

assignmentsRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const cacheKey = `assignments:${id}`;
    const cached = await getCache(cacheKey);
    if (cached) {
      return res.json({ data: cached });
    }

    await connectToDatabase();
    const assignment = await AssignmentModel.findById(id).lean();
    if (!assignment) {
      return res.status(404).json({ error: "Assignment not found" });
    }

    const data = serialize(assignment);
    await setCache(cacheKey, data);

    return res.json({ data });
  } catch (error) {
    return res.status(500).json({ error: error instanceof Error ? error.message : "Failed to fetch assignment" });
  }
});

assignmentsRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await connectToDatabase();
    const assignment = await AssignmentModel.findByIdAndDelete(id);

    if (!assignment) {
      return res.status(404).json({ error: "Assignment not found" });
    }

    await deleteCache("assignments:list", `assignments:${id}`);
    return res.json({ data: { id } });
  } catch (error) {
    return res.status(500).json({ error: error instanceof Error ? error.message : "Failed to delete assignment" });
  }
});
