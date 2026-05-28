import { NextResponse } from "next/server";
import { proxyToBackend, readBackendResponse } from "@/lib/backendProxy";

export const runtime = "nodejs";

type RouteContext = {
  params: Promise<{ assignmentId: string }>;
};

export async function GET(request: Request, context: RouteContext) {
  const { assignmentId } = await context.params;
  const response = await proxyToBackend(request, `/api/output/${assignmentId}`);
  const body = await readBackendResponse(response);
  return body === null ? new NextResponse(null, { status: response.status }) : NextResponse.json(body, { status: response.status });
}
