import dotenv from "dotenv";

// Load root .env.local for local dev when running backend directly
dotenv.config({ path: "../../.env.local" });
import http from "node:http";
import express from "express";
import cors from "cors";
import { connectToDatabase } from "../../src/lib/mongodb";
import { assignmentsRouter } from "./routes/assignments.route";
import { generateRouter } from "./routes/generate.route";
import { regenerateRouter } from "./routes/regenerate.route";
import { outputRouter } from "./routes/output.route";
import { pdfRouter } from "./routes/pdf.route";
import { healthRouter } from "./routes/health.route";
import { createSocketServer } from "./config/socket";
import { startGenerationWorker } from "./workers/generation.worker";
import { startPdfWorker } from "./workers/pdf.worker";

const port = Number(process.env.PORT || 4000);
const clientUrl = process.env.CLIENT_URL || "http://localhost:3000";

async function startServer() {
  await connectToDatabase();

  const app = express();
  app.use(cors({ origin: clientUrl, credentials: true }));
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: true }));

  app.use("/health", healthRouter);
  app.use("/api/assignments", assignmentsRouter);
  app.use("/api/generate", generateRouter);
  app.use("/api/regenerate", regenerateRouter);
  app.use("/api/output", outputRouter);
  app.use("/api/pdf", pdfRouter);

  const server = http.createServer(app);
  createSocketServer(server);
  startGenerationWorker();
  startPdfWorker();

  server.listen(port, () => {
    console.log(`Backend server listening on http://localhost:${port}`);
  });
}

void startServer().catch((error) => {
  console.error(error);
  process.exit(1);
});
