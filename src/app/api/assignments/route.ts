import { NextResponse } from "next/server";
import { proxyToBackend, readBackendResponse } from "@/lib/backendProxy";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const response = await proxyToBackend(request, "/api/assignments");
  const body = await readBackendResponse(response);
  return body === null ? new NextResponse(null, { status: response.status }) : NextResponse.json(body, { status: response.status });
}

export async function POST(request: Request) {
  const response = await proxyToBackend(request, "/api/assignments");
  const body = await readBackendResponse(response);
  return body === null ? new NextResponse(null, { status: response.status }) : NextResponse.json(body, { status: response.status });
}
