import { NextResponse } from "next/server";
import { proxyToBackend, readBackendResponse } from "@/lib/backendProxy";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(request: Request, context: RouteContext) {
  const { id } = await context.params;
  const response = await proxyToBackend(request, `/api/assignments/${id}`);
  const body = await readBackendResponse(response);
  return body === null ? new NextResponse(null, { status: response.status }) : NextResponse.json(body, { status: response.status });
}

export async function DELETE(request: Request, context: RouteContext) {
  const { id } = await context.params;
  const response = await proxyToBackend(request, `/api/assignments/${id}`);
  const body = await readBackendResponse(response);
  return body === null ? new NextResponse(null, { status: response.status }) : NextResponse.json(body, { status: response.status });
}
