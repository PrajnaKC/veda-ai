import { NextResponse } from "next/server";
import { proxyToBackend } from "@/lib/backendProxy";

export const runtime = "nodejs";

type RouteContext = {
  params: Promise<{ assignmentId: string }>;
};

export async function POST(request: Request, context: RouteContext) {
  const { assignmentId } = await context.params;
  const response = await proxyToBackend(request, `/api/regenerate/${assignmentId}`);
  return NextResponse.json(await response.json(), { status: response.status });
}
