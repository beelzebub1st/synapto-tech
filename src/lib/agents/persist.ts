import { eq } from "drizzle-orm";
import { hasDatabase } from "@/lib/env";
import type { AgentResult } from "./types";

const DEFAULT_ORG = "org_northside_wellness";

export async function persistAgentRun(options: {
  agentId: string;
  input: string;
  result: AgentResult;
  submissionId?: string;
}) {
  if (!hasDatabase()) return null;

  const { getDb } = await import("@/db/client");
  const { agentRuns, clinicSubmissions } = await import("@/db/schema");
  const db = getDb();

  const [run] = await db
    .insert(agentRuns)
    .values({
      organizationId: DEFAULT_ORG,
      submissionId: options.submissionId,
      agentId: options.agentId,
      mode: options.result.mode,
      input: options.input,
      result: options.result as unknown as Record<string, unknown>,
    })
    .returning();

  if (options.submissionId) {
    await db
      .update(clinicSubmissions)
      .set({
        status: "in_review",
        updatedAt: new Date(),
      })
      .where(eq(clinicSubmissions.id, options.submissionId));
  }

  return run;
}
