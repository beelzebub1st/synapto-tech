import { connection } from "next/server";
import { desc } from "drizzle-orm";
import { NextResponse } from "next/server";
import { hasDatabase } from "@/lib/env";

export async function GET() {
  await connection();
  if (!hasDatabase()) {
    return NextResponse.json({ messages: [], mode: "offline" });
  }

  const { getDb } = await import("@/db/client");
  const { clientMessages } = await import("@/db/schema");
  const db = getDb();
  const messages = await db
    .select()
    .from(clientMessages)
    .orderBy(desc(clientMessages.createdAt))
    .limit(50);

  return NextResponse.json({ mode: "live", messages });
}
