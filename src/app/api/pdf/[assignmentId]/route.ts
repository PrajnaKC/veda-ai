import { NextResponse } from "next/server";
import { proxyToBackend } from "@/lib/backendProxy";

export const runtime = "nodejs";

type RouteContext = {
  params: Promise<{ assignmentId: string }>;
};

async function proxyPdf(request: Request, assignmentId: string) {
  const response = await proxyToBackend(request, `/api/pdf/${assignmentId}`);
  const body = await response.arrayBuffer();

  return new NextResponse(body, {
    status: response.status,
    headers: response.headers
  });
}

export async function GET(request: Request, context: RouteContext) {
  const { assignmentId } = await context.params;
  return proxyPdf(request, assignmentId);
}

export async function POST(request: Request, context: RouteContext) {
  const { assignmentId } = await context.params;
  return proxyPdf(request, assignmentId);
}
