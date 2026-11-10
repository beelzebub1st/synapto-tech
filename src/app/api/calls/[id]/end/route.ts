import { connection } from "next/server";
import { NextResponse } from "next/server";
import { hasDatabase } from "@/lib/env";
import { endCallSession } from "@/lib/agents/call-session";

export async function POST(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  await connection();
  if (!hasDatabase()) {
    return NextResponse.json(
      { error: "Database not connected." },
      { status: 503 }
    );
  }

  const { id } = await context.params;
  const session = await endCallSession(id);
  return NextResponse.json({ session });
}
