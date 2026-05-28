import { NextResponse } from "next/server";
import { proxyToBackend } from "@/lib/backendProxy";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const response = await proxyToBackend(request, "/api/assignments");
  return NextResponse.json(await response.json(), { status: response.status });
}

export async function POST(request: Request) {
  const response = await proxyToBackend(request, "/api/assignments");
  return NextResponse.json(await response.json(), { status: response.status });
}
