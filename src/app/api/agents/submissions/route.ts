import { connection } from "next/server";
import { NextResponse } from "next/server";
import { listSubmissions } from "@/lib/dashboard-data";
import { hasDatabase } from "@/lib/env";

export async function GET(request: Request) {
  await connection();

  if (!hasDatabase()) {
    return NextResponse.json({
      submissions: [],
      mode: "offline",
      message: "Database not connected.",
    });
  }

  const { searchParams } = new URL(request.url);
  const agentId = searchParams.get("agentId") ?? undefined;
  const rows = await listSubmissions(agentId);

  return NextResponse.json({
    mode: "live",
    submissions: rows.map((row) => ({
      id: row.id,
      type: row.type,
      status: row.status,
      subject: row.subject,
      patientLabel: row.patientLabel,
      body: row.body,
      suggestedAgentId: row.suggestedAgentId,
      createdAt: row.createdAt,
    })),
  });
}
