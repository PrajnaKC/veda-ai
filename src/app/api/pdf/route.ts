import { NextResponse } from "next/server";
import { proxyToBackend } from "@/lib/backendProxy";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const assignmentId = url.searchParams.get("assignmentId");

  if (!assignmentId) {
    return NextResponse.json({ error: "Assignment id is required" }, { status: 400 });
  }

  const response = await proxyToBackend(request, `/api/pdf/${assignmentId}`);
  const body = await response.arrayBuffer();

  return new NextResponse(body, {
    status: response.status,
    headers: response.headers
  });
}
