export function getBackendBaseUrl() {
  return process.env.BACKEND_URL || "http://localhost:4000";
}

export async function proxyToBackend(request: Request, pathname: string) {
  const targetUrl = new URL(pathname, getBackendBaseUrl());
  const headers = new Headers(request.headers);
  headers.delete("host");
  headers.delete("content-length");

  const hasBody = request.method !== "GET" && request.method !== "HEAD";
  const body = hasBody ? Buffer.from(await request.arrayBuffer()) : undefined;

  return fetch(targetUrl, {
    method: request.method,
    headers,
    body
  });
}

export async function readBackendResponse(response: Response) {
  const contentType = response.headers.get("content-type") || "";
  const text = await response.text();

  if (!text) {
    return null;
  }

  if (contentType.includes("application/json")) {
    try {
      return JSON.parse(text);
    } catch {
      return { error: text };
    }
  }

  try {
    return JSON.parse(text);
  } catch {
    return { message: text };
  }
}
