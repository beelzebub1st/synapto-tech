import { NextResponse } from "next/server";
import { listSubmissions } from "@/lib/dashboard-data";
import { runAgent } from "@/lib/agents/run";
import { persistAgentRun } from "@/lib/agents/persist";
import { hasDatabase } from "@/lib/env";

/**
 * Runs every seeded submission through its suggested agent once.
 * Useful for full local/Docker verification.
 */
export async function POST() {
  if (!hasDatabase()) {
    return NextResponse.json(
      { error: "Database not connected." },
      { status: 503 }
    );
  }

  const submissions = await listSubmissions();
  const results = [];

  for (const submission of submissions) {
    const agentId = submission.suggestedAgentId ?? "team-copilot";
    try {
      const result = await runAgent(agentId, submission.body);
      const saved = await persistAgentRun({
        agentId,
        input: submission.body,
        result,
        submissionId: submission.id,
      });
      results.push({
        submissionId: submission.id,
        subject: submission.subject,
        agentId,
        ok: true,
        mode: result.mode,
        runId: saved?.id ?? null,
        summary: result.summary,
      });
    } catch (error) {
      results.push({
        submissionId: submission.id,
        subject: submission.subject,
        agentId,
        ok: false,
        error: error instanceof Error ? error.message : "Failed",
      });
    }
  }

  return NextResponse.json({
    processed: results.length,
    succeeded: results.filter((r) => r.ok).length,
    results,
  });
}
