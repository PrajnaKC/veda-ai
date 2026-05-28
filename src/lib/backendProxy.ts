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
