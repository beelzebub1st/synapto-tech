import { getAuth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

function notConfigured() {
  return new Response(JSON.stringify({ error: "Auth is not configured" }), {
    status: 503,
    headers: { "Content-Type": "application/json" },
  });
}

function getHandlers() {
  const auth = getAuth();
  if (!auth) {
    return {
      GET: notConfigured,
      POST: notConfigured,
      PATCH: notConfigured,
      PUT: notConfigured,
      DELETE: notConfigured,
    };
  }
  return toNextJsHandler(auth);
}

export async function GET(request: Request) {
  return getHandlers().GET(request);
}

export async function POST(request: Request) {
  return getHandlers().POST(request);
}

export async function PATCH(request: Request) {
  return getHandlers().PATCH?.(request) ?? notConfigured();
}

export async function PUT(request: Request) {
  return getHandlers().PUT?.(request) ?? notConfigured();
}

export async function DELETE(request: Request) {
  return getHandlers().DELETE?.(request) ?? notConfigured();
}
