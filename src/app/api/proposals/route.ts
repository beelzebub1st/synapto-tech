import { connection } from "next/server";
import { NextResponse } from "next/server";
import { z } from "zod";
import { hasDatabase } from "@/lib/env";
import { PACKAGE_COPY, type PackageKey } from "@/lib/quiz/recommend";

const bodySchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  clinicName: z.string().min(2),
  packageKey: z.enum(["presence", "product", "system"]),
  answers: z.record(z.string(), z.string()).optional(),
});

export async function POST(request: Request) {
  await connection();
  const parsed = bodySchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid proposal request." },
      { status: 400 }
    );
  }

  const data = parsed.data;
  const pkg = PACKAGE_COPY[data.packageKey as PackageKey];
  const summary = [
    `Recommended package: ${pkg.name}`,
    pkg.tagline,
    "",
    "Included:",
    ...pkg.bullets.map((item) => `• ${item}`),
    "",
    `Suggested deposit to reserve start: ${pkg.depositLabel}`,
  ].join("\n");

  let id: string | null = null;
  if (hasDatabase()) {
    const { getDb } = await import("@/db/client");
    const { proposalRequests } = await import("@/db/schema");
    const db = getDb();
    const [row] = await db
      .insert(proposalRequests)
      .values({
        fullName: data.fullName,
        email: data.email,
        clinicName: data.clinicName,
        packageKey: data.packageKey,
        summary,
        answers: data.answers,
        status: "new",
      })
      .returning();
    id = row?.id ?? null;
  }

  return NextResponse.json({
    id,
    packageKey: data.packageKey,
    summary,
    package: pkg,
  });
}
