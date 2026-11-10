import { eq } from "drizzle-orm";
import { hasDatabase } from "@/lib/env";
import { runAgent } from "@/lib/agents/run";
import { persistAgentRun } from "@/lib/agents/persist";

const DEFAULT_ORG = "org_northside_wellness";

type TranscriptItem = {
  role: "agent" | "customer" | "system";
  text: string;
  at: string;
};

export async function startCallSession(input?: {
  callerName?: string;
  callerPhone?: string;
}) {
  if (!hasDatabase()) {
    throw new Error("Database not connected.");
  }

  const { getDb } = await import("@/db/client");
  const { callSessions } = await import("@/db/schema");
  const db = getDb();

  const opening = await runAgent(
    "call-concierge",
    `New inbound call.
Caller name: ${input?.callerName ?? "Unknown"}
Caller phone: ${input?.callerPhone ?? "Unknown"}
Context: Call just connected. Provide a warm opening line and first question.`
  );

  const now = new Date().toISOString();
  const transcript: TranscriptItem[] = [
    {
      role: "system",
      text: "Call connected. Agent is assisting live.",
      at: now,
    },
    {
      role: "agent",
      text: opening.draft ?? "Thanks for calling — how can I help today?",
      at: now,
    },
  ];

  const [session] = await db
    .insert(callSessions)
    .values({
      organizationId: DEFAULT_ORG,
      callerName: input?.callerName,
      callerPhone: input?.callerPhone,
      status: "active",
      transcript,
    })
    .returning();

  await persistAgentRun({
    agentId: "call-concierge",
    input: "call-start",
    result: opening,
  });

  return { session, opening };
}

export async function respondOnCall(sessionId: string, customerText: string) {
  if (!hasDatabase()) {
    throw new Error("Database not connected.");
  }

  const cleaned = customerText.trim();
  if (cleaned.length < 2) {
    throw new Error("Please enter what the caller said.");
  }

  const { getDb } = await import("@/db/client");
  const { callSessions } = await import("@/db/schema");
  const db = getDb();

  const [session] = await db
    .select()
    .from(callSessions)
    .where(eq(callSessions.id, sessionId))
    .limit(1);

  if (!session) {
    throw new Error("Call session not found.");
  }

  const history = (session.transcript ?? [])
    .map((item) => `${item.role}: ${item.text}`)
    .join("\n");

  const result = await runAgent(
    "call-concierge",
    `Live call transcript so far:\n${history}\n\nCustomer just said:\n${cleaned}\n\nProvide the next short spoken reply for staff.`
  );

  const now = new Date().toISOString();
  const transcript: TranscriptItem[] = [
    ...(session.transcript ?? []),
    { role: "customer", text: cleaned, at: now },
    {
      role: "agent",
      text: result.draft ?? "Thanks — let me check that and confirm the next step.",
      at: now,
    },
  ];

  const [updated] = await db
    .update(callSessions)
    .set({
      transcript,
      summary: result.summary,
      updatedAt: new Date(),
    })
    .where(eq(callSessions.id, sessionId))
    .returning();

  await persistAgentRun({
    agentId: "call-concierge",
    input: cleaned,
    result,
  });

  return { session: updated, result };
}

export async function endCallSession(sessionId: string) {
  if (!hasDatabase()) {
    throw new Error("Database not connected.");
  }

  const { getDb } = await import("@/db/client");
  const { callSessions } = await import("@/db/schema");
  const db = getDb();

  const [updated] = await db
    .update(callSessions)
    .set({ status: "ended", updatedAt: new Date() })
    .where(eq(callSessions.id, sessionId))
    .returning();

  return updated;
}
