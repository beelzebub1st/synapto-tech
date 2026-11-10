import { connection } from "next/server";
import { NextResponse } from "next/server";
import { processNewSubmissionsAutomatically } from "@/lib/agents/auto-pipeline";
import { hasDatabase } from "@/lib/env";

export async function POST() {
  await connection();
  if (!hasDatabase()) {
    return NextResponse.json(
      { error: "Database not connected." },
      { status: 503 }
    );
  }

  const result = await processNewSubmissionsAutomatically();
  return NextResponse.json({
    count: result.processed.length,
    ...result,
  });
}
