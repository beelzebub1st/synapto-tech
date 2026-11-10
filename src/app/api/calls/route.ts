import { connection } from "next/server";
import { desc } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";
import { hasDatabase } from "@/lib/env";
import { startCallSession } from "@/lib/agents/call-session";

const startSchema = z.object({
  callerName: z.string().optional(),
  callerPhone: z.string().optional(),
});

export async function GET() {
  await connection();
  if (!hasDatabase()) {
    return NextResponse.json({ sessions: [] });
  }

  const { getDb } = await import("@/db/client");
  const { callSessions } = await import("@/db/schema");
  const db = getDb();
  const sessions = await db
    .select()
    .from(callSessions)
    .orderBy(desc(callSessions.createdAt))
    .limit(20);

  return NextResponse.json({ sessions });
}

export async function POST(request: Request) {
  await connection();
  if (!hasDatabase()) {
    return NextResponse.json(
      { error: "Database not connected." },
      { status: 503 }
    );
  }

  const parsed = startSchema.safeParse(await request.json().catch(() => ({})));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid call payload." }, { status: 400 });
  }

  const started = await startCallSession(parsed.data);
  return NextResponse.json(started);
}
