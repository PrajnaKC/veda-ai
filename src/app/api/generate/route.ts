import { NextResponse } from "next/server";
import { proxyToBackend } from "@/lib/backendProxy";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const response = await proxyToBackend(request, "/api/generate");
  return NextResponse.json(await response.json(), { status: response.status });
}
