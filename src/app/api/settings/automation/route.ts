import { connection } from "next/server";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";
import { hasDatabase } from "@/lib/env";
import { getClinicAutomationSettings } from "@/lib/agents/auto-pipeline";

const updateSchema = z.object({
  autoProcessIntakes: z.boolean().optional(),
  autoSendClientMessages: z.boolean().optional(),
  callAgentEnabled: z.boolean().optional(),
});

export async function GET() {
  await connection();
  if (!hasDatabase()) {
    return NextResponse.json({
      settings: {
        autoProcessIntakes: false,
        autoSendClientMessages: false,
        callAgentEnabled: false,
      },
    });
  }

  const settings = await getClinicAutomationSettings();
  return NextResponse.json({ settings });
}

export async function PATCH(request: Request) {
  await connection();
  if (!hasDatabase()) {
    return NextResponse.json(
      { error: "Database not connected." },
      { status: 503 }
    );
  }

  const parsed = updateSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid settings." }, { status: 400 });
  }

  const { getDb } = await import("@/db/client");
  const { clinicSettings } = await import("@/db/schema");
  const db = getDb();
  const orgId = "org_northside_wellness";

  await db
    .insert(clinicSettings)
    .values({
      organizationId: orgId,
      autoProcessIntakes: parsed.data.autoProcessIntakes ?? true,
      autoSendClientMessages: parsed.data.autoSendClientMessages ?? true,
      callAgentEnabled: parsed.data.callAgentEnabled ?? true,
    })
    .onConflictDoNothing();

  const [settings] = await db
    .update(clinicSettings)
    .set({
      ...parsed.data,
      updatedAt: new Date(),
    })
    .where(eq(clinicSettings.organizationId, orgId))
    .returning();

  return NextResponse.json({ settings });
}
