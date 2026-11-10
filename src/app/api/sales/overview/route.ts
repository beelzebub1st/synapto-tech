import { connection } from "next/server";
import { desc } from "drizzle-orm";
import { NextResponse } from "next/server";
import { hasDatabase } from "@/lib/env";

export async function GET() {
  await connection();

  if (!hasDatabase()) {
    return NextResponse.json({
      mode: "local",
      bookings: [],
      quizzes: [],
      deposits: [],
      proposals: [],
    });
  }

  const { getDb } = await import("@/db/client");
  const {
    strategyBookings,
    quizResults,
    projectDeposits,
    proposalRequests,
  } = await import("@/db/schema");
  const db = getDb();

  const [bookings, quizzes, deposits, proposals] = await Promise.all([
    db
      .select()
      .from(strategyBookings)
      .orderBy(desc(strategyBookings.createdAt))
      .limit(50),
    db.select().from(quizResults).orderBy(desc(quizResults.createdAt)).limit(50),
    db
      .select()
      .from(projectDeposits)
      .orderBy(desc(projectDeposits.createdAt))
      .limit(50),
    db
      .select()
      .from(proposalRequests)
      .orderBy(desc(proposalRequests.createdAt))
      .limit(50),
  ]);

  return NextResponse.json({
    mode: "database",
    bookings,
    quizzes,
    deposits,
    proposals,
  });
}
