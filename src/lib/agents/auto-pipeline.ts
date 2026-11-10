import { and, eq, inArray } from "drizzle-orm";
import { hasDatabase } from "@/lib/env";
import { runAgent } from "@/lib/agents/run";
import { persistAgentRun } from "@/lib/agents/persist";
import { extractEmail, extractPatientLabel, extractPhone } from "@/lib/agents/extract";
import { deliverClientMessage } from "@/lib/messaging";
import type { AgentResult } from "@/lib/agents/types";

const DEFAULT_ORG = "org_northside_wellness";

const AUTO_TYPES = ["intake", "application", "front_desk"] as const;

export async function getClinicAutomationSettings(
  organizationId = DEFAULT_ORG
) {
  if (!hasDatabase()) {
    return {
      autoProcessIntakes: false,
      autoSendClientMessages: false,
      callAgentEnabled: true,
    };
  }

  const { getDb } = await import("@/db/client");
  const { clinicSettings } = await import("@/db/schema");
  const db = getDb();

  const [row] = await db
    .select()
    .from(clinicSettings)
    .where(eq(clinicSettings.organizationId, organizationId))
    .limit(1);

  if (row) return row;

  const [created] = await db
    .insert(clinicSettings)
    .values({
      organizationId,
      autoProcessIntakes: true,
      autoSendClientMessages: true,
      callAgentEnabled: true,
    })
    .onConflictDoNothing()
    .returning();

  return (
    created ?? {
      organizationId,
      autoProcessIntakes: true,
      autoSendClientMessages: true,
      callAgentEnabled: true,
      updatedAt: new Date(),
    }
  );
}

export async function processSubmissionAutomatically(submissionId: string) {
  if (!hasDatabase()) {
    throw new Error("Database not connected.");
  }

  const settings = await getClinicAutomationSettings();
  if (!settings.autoProcessIntakes) {
    return { skipped: true as const, reason: "auto_process_disabled" as const };
  }

  const { getDb } = await import("@/db/client");
  const { clinicSubmissions, clientMessages } = await import("@/db/schema");
  const db = getDb();

  const [submission] = await db
    .select()
    .from(clinicSubmissions)
    .where(eq(clinicSubmissions.id, submissionId))
    .limit(1);

  if (!submission) {
    throw new Error("Submission not found.");
  }

  const agentId =
    submission.suggestedAgentId ??
    (submission.type === "application"
      ? "application-review"
      : submission.type === "front_desk"
        ? "front-desk-concierge"
        : "intake-completeness");

  const result = await runAgent(agentId, submission.body);
  const run = await persistAgentRun({
    agentId,
    input: submission.body,
    result,
    submissionId: submission.id,
  });

  const email =
    submission.contactEmail ?? extractEmail(submission.body) ?? null;
  const phone =
    submission.contactPhone ?? extractPhone(submission.body) ?? null;

  await db
    .update(clinicSubmissions)
    .set({
      contactEmail: email,
      contactPhone: phone,
      patientLabel:
        submission.patientLabel ?? extractPatientLabel(submission.body),
      status:
        result.missingFields && result.missingFields.length > 0
          ? "needs_info"
          : "in_review",
      updatedAt: new Date(),
    })
    .where(eq(clinicSubmissions.id, submission.id));

  let message = null;
  if (email && result.draft) {
    const subject = buildSubject(submission.subject, result);
    const [queued] = await db
      .insert(clientMessages)
      .values({
        organizationId: submission.organizationId,
        submissionId: submission.id,
        agentRunId: run?.id,
        channel: "email",
        toAddress: email,
        subject,
        body: result.draft,
        status: "queued",
      })
      .returning();

    if (queued && settings.autoSendClientMessages) {
      message = await deliverClientMessage(queued.id);
      if (message && (message.status === "sent" || message.status === "sent_local")) {
        await db
          .update(clinicSubmissions)
          .set({ status: "messaged", updatedAt: new Date() })
          .where(eq(clinicSubmissions.id, submission.id));
      }
    } else {
      message = queued;
    }
  }

  return {
    skipped: false as const,
    submissionId: submission.id,
    agentId,
    result,
    runId: run?.id ?? null,
    message,
  };
}

export async function processNewSubmissionsAutomatically() {
  if (!hasDatabase()) {
    return { processed: [] as Awaited<ReturnType<typeof processSubmissionAutomatically>>[] };
  }

  const settings = await getClinicAutomationSettings();
  if (!settings.autoProcessIntakes) {
    return { processed: [], reason: "auto_process_disabled" as const };
  }

  const { getDb } = await import("@/db/client");
  const { clinicSubmissions } = await import("@/db/schema");
  const db = getDb();

  const pending = await db
    .select()
    .from(clinicSubmissions)
    .where(
      and(
        eq(clinicSubmissions.status, "new"),
        inArray(clinicSubmissions.type, [...AUTO_TYPES])
      )
    );

  const processed = [];
  for (const item of pending) {
    processed.push(await processSubmissionAutomatically(item.id));
  }

  return { processed };
}

function buildSubject(original: string, result: AgentResult) {
  if (result.missingFields && result.missingFields.length > 0) {
    return `Action needed: complete your clinic intake`;
  }
  return `Update from the clinic — ${original.slice(0, 60)}`;
}
