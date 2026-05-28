import { NextResponse } from "next/server";
import { proxyToBackend, readBackendResponse } from "@/lib/backendProxy";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const response = await proxyToBackend(request, "/api/generate");
  const body = await readBackendResponse(response);
  return body === null ? new NextResponse(null, { status: response.status }) : NextResponse.json(body, { status: response.status });
}
