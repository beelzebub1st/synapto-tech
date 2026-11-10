import { connection } from "next/server";
import { NextResponse } from "next/server";
import { z } from "zod";
import { hasDatabase } from "@/lib/env";
import {
  extractEmail,
  extractPatientLabel,
  extractPhone,
} from "@/lib/agents/extract";
import { processSubmissionAutomatically } from "@/lib/agents/auto-pipeline";
import { listSubmissions } from "@/lib/dashboard-data";

const createSchema = z.object({
  type: z
    .enum([
      "intake",
      "application",
      "front_desk",
      "follow_up",
      "ops_exception",
      "team_handoff",
      "call",
    ])
    .default("intake"),
  subject: z.string().min(3),
  body: z.string().min(20),
  patientLabel: z.string().optional(),
  contactEmail: z.string().email().optional(),
  contactPhone: z.string().optional(),
  suggestedAgentId: z.string().optional(),
  autoProcess: z.boolean().optional().default(true),
});

export async function GET() {
  await connection();
  if (!hasDatabase()) {
    return NextResponse.json({ submissions: [], mode: "offline" });
  }
  const rows = await listSubmissions();
  return NextResponse.json({ mode: "live", submissions: rows });
}

export async function POST(request: Request) {
  await connection();
  if (!hasDatabase()) {
    return NextResponse.json(
      { error: "Database not connected." },
      { status: 503 }
    );
  }

  const json = await request.json();
  const parsed = createSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid submission." },
      { status: 400 }
    );
  }

  const data = parsed.data;
  const { getDb } = await import("@/db/client");
  const { clinicSubmissions, stores } = await import("@/db/schema");
  const db = getDb();
  const [store] = await db.select().from(stores).limit(1);

  const suggestedAgentId =
    data.suggestedAgentId ??
    (data.type === "application"
      ? "application-review"
      : data.type === "front_desk"
        ? "front-desk-concierge"
        : data.type === "call"
          ? "call-concierge"
          : "intake-completeness");

  const [submission] = await db
    .insert(clinicSubmissions)
    .values({
      organizationId: "org_northside_wellness",
      storeId: store?.id,
      type: data.type,
      status: "new",
      subject: data.subject,
      patientLabel: data.patientLabel ?? extractPatientLabel(data.body),
      contactEmail: data.contactEmail ?? extractEmail(data.body),
      contactPhone: data.contactPhone ?? extractPhone(data.body),
      body: data.body,
      suggestedAgentId,
    })
    .returning();

  let automation = null;
  if (data.autoProcess && submission) {
    automation = await processSubmissionAutomatically(submission.id);
  }

  return NextResponse.json({ submission, automation });
}
