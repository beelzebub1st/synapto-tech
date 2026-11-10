import { connection } from "next/server";
import { NextResponse } from "next/server";
import { z } from "zod";
import { hasDatabase } from "@/lib/env";
import { recommendPackage, type QuizAnswers } from "@/lib/quiz/recommend";

const bodySchema = z.object({
  answers: z.object({
    industry: z.enum([
      "b2b",
      "ecommerce",
      "services",
      "saas",
      "local",
      "other",
    ]),
    size: z.enum(["solo", "smb", "mid", "enterprise"]),
    priority: z.enum(["website", "app", "system", "unsure"]),
    stage: z.enum(["idea", "redesign", "scaling"]),
    goal: z.enum(["leads", "sales", "bookings", "portal", "brand"]),
    commerce: z.enum(["yes", "later", "no"]),
    productSurface: z.enum(["none", "pwa", "native", "both"]),
    automation: z.enum(["none", "basic", "agents", "full"]),
    team: z.enum(["solo", "small", "multi"]),
    pain: z.enum(["conversion", "tools", "followup", "ops", "brand"]),
    budget: z.enum(["lean", "standard", "growth", "enterprise"]),
    urgency: z.enum(["asap", "month", "quarter"]),
    website: z.string().optional(),
    role: z.string().optional(),
  }),
  email: z.string().email().optional(),
  fullName: z.string().optional(),
  clinicName: z.string().optional(),
});

export async function POST(request: Request) {
  await connection();
  const parsed = bodySchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid quiz." },
      { status: 400 }
    );
  }

  const { website: _website, role: _role, ...scoringAnswers } =
    parsed.data.answers;
  const result = recommendPackage(scoringAnswers as QuizAnswers);
  let id: string | null = null;

  if (hasDatabase()) {
    const { getDb } = await import("@/db/client");
    const { quizResults } = await import("@/db/schema");
    const db = getDb();
    const [row] = await db
      .insert(quizResults)
      .values({
        answers: parsed.data.answers,
        recommendedPackage: result.recommended,
        scoreBreakdown: result.scores,
        email: parsed.data.email,
        fullName: parsed.data.fullName,
        clinicName: parsed.data.clinicName,
      })
      .returning();
    id = row?.id ?? null;
  }

  return NextResponse.json({
    id,
    recommended: result.recommended,
    summary: result.summary,
    scores: result.scores,
    matchPercent: result.matchPercent,
    insight: result.insight,
  });
}
