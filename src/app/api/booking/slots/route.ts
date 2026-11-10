import { connection } from "next/server";
import { and, eq, gte, lt } from "drizzle-orm";
import { NextResponse } from "next/server";
import { hasDatabase } from "@/lib/env";
import {
  generateSlotsForDate,
  listDaysAhead,
} from "@/lib/booking/slots";

export async function GET(request: Request) {
  await connection();
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");
  const days = listDaysAhead(14);

  if (!date) {
    return NextResponse.json({ days, slots: [] });
  }

  let bookedStarts: string[] = [];
  if (hasDatabase()) {
    const { getDb } = await import("@/db/client");
    const { strategyBookings } = await import("@/db/schema");
    const db = getDb();
    const dayStart = new Date(`${date}T00:00:00`);
    const dayEnd = new Date(`${date}T23:59:59`);
    const rows = await db
      .select({ slotStart: strategyBookings.slotStart })
      .from(strategyBookings)
      .where(
        and(
          eq(strategyBookings.status, "confirmed"),
          gte(strategyBookings.slotStart, dayStart),
          lt(strategyBookings.slotStart, dayEnd)
        )
      );
    bookedStarts = rows.map((row) => row.slotStart.toISOString());
  }

  const slots = generateSlotsForDate(date, bookedStarts);
  return NextResponse.json({ days, date, slots });
}
