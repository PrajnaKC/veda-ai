import { generatedPaperSchema } from "./validators.ts";
import { GoogleGenAI } from "@google/genai";
import type { GeneratedPaper } from "../types/assignment.ts";

const GEMINI_MODELS = (process.env.GEMINI_MODEL || "gemini-2.5-flash,gemini-2.0-flash")
  .split(",")
  .map((model) => model.trim())
  .filter(Boolean);
const RETRYABLE_STATUS_CODES = new Set([429, 500, 503]);

let geminiClient: GoogleGenAI | null = null;

function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured");
  }

  if (!geminiClient) {
    geminiClient = new GoogleGenAI({ apiKey });
  }

  return geminiClient;
}

function normalizeJsonResponse(text: string) {
  return text
    .trim()
    .replace(/^```(?:json)?/i, "")
    .replace(/```$/i, "")
    .trim();
}

function parseStrictJson(text: string): GeneratedPaper {
  const parsed = JSON.parse(normalizeJsonResponse(text));
  return generatedPaperSchema.parse(parsed);
}

async function requestGemini(prompt: string): Promise<string> {
  const client = getGeminiClient();
  const maxAttempts = 3;
  let lastError: unknown;

  for (const model of GEMINI_MODELS) {
    for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
      try {
        const response = await client.models.generateContent({
          model,
          contents: prompt,
          config: {
            temperature: 0.35,
            responseMimeType: "application/json"
          }
        });

        const text = response.text;
        if (!text) {
          throw new Error("Gemini returned an empty response");
        }

        return text;
      } catch (error) {
        lastError = error;
        const statusCode = typeof error === "object" && error !== null && "status" in error ? Number((error as { status?: unknown }).status) : undefined;
        const isRetryable = statusCode !== undefined && RETRYABLE_STATUS_CODES.has(statusCode);

        if (!isRetryable || attempt === maxAttempts) {
          break;
        }

        const delayMs = 500 * attempt * attempt;
        await new Promise((resolve) => setTimeout(resolve, delayMs));
      }
    }
  }

  throw lastError instanceof Error ? lastError : new Error("Gemini request failed after retries");
}

export async function generateStructuredPaper(prompt: string): Promise<GeneratedPaper> {
  let lastError: unknown;

  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      const text = await requestGemini(prompt);
      return parseStrictJson(text);
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError instanceof Error ? lastError : new Error("Groq failed to generate valid JSON");
}
