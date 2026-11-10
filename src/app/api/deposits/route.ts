import { connection } from "next/server";
import { NextResponse } from "next/server";
import { z } from "zod";
import { hasDatabase } from "@/lib/env";
import { PACKAGE_COPY, type PackageKey } from "@/lib/quiz/recommend";

const bodySchema = z.object({
  packageKey: z.enum(["presence", "product", "system"]),
  fullName: z.string().min(2),
  email: z.string().email(),
  clinicName: z.string().min(2),
  phone: z.string().optional(),
  notes: z.string().optional(),
  quizResultId: z.string().uuid().optional(),
});

export async function POST(request: Request) {
  await connection();
  const parsed = bodySchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid deposit request." },
      { status: 400 }
    );
  }

  const data = parsed.data;
  const pkg = PACKAGE_COPY[data.packageKey as PackageKey];

  if (!hasDatabase()) {
    return NextResponse.json({
      deposit: {
        id: `local_dep_${Date.now()}`,
        ...data,
        amountCents: pkg.depositCents,
        currency: "eur",
        status: "reserved_local",
      },
      checkoutUrl: null,
      mode: "local",
      message:
        "Project start reserved. Our team will confirm payment details and kickoff by email.",
    });
  }

  const { getDb } = await import("@/db/client");
  const { projectDeposits } = await import("@/db/schema");
  const db = getDb();

  const [deposit] = await db
    .insert(projectDeposits)
    .values({
      packageKey: data.packageKey,
      amountCents: pkg.depositCents,
      currency: "eur",
      fullName: data.fullName,
      email: data.email,
      clinicName: data.clinicName,
      phone: data.phone,
      notes: data.notes,
      quizResultId: data.quizResultId,
      status: "reserved_local",
    })
    .returning();

  return NextResponse.json({
    deposit,
    checkoutUrl: null,
    mode: "local",
    message:
      "Project start reserved. Our team will confirm payment details and kickoff by email within one business day.",
  });
}
