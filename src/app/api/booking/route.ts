import { connection } from "next/server";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";
import { hasDatabase } from "@/lib/env";
import { BOOKING_DURATION_MINUTES } from "@/lib/booking/slots";
import { addMinutes, parseISO } from "date-fns";

const bodySchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  clinicName: z.string().min(2),
  phone: z.string().optional(),
  packageInterest: z.string().optional(),
  demoInterest: z.string().optional(),
  slotStart: z.string().datetime(),
  timezone: z.string().default("Europe/Berlin"),
  notes: z.string().optional(),
  quizResultId: z.string().uuid().optional(),
});

export async function POST(request: Request) {
  await connection();
  const parsed = bodySchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid booking." },
      { status: 400 }
    );
  }

  const data = parsed.data;
  const slotStart = parseISO(data.slotStart);
  const slotEnd = addMinutes(slotStart, BOOKING_DURATION_MINUTES);

  if (!hasDatabase()) {
    console.info("[booking] No DATABASE_URL — booking accepted locally:", data);
    return NextResponse.json({
      booking: {
        id: `local_${Date.now()}`,
        ...data,
        slotStart: slotStart.toISOString(),
        slotEnd: slotEnd.toISOString(),
        status: "confirmed",
      },
      persisted: false,
    });
  }

  const { getDb } = await import("@/db/client");
  const { strategyBookings } = await import("@/db/schema");
  const db = getDb();

  const [existing] = await db
    .select()
    .from(strategyBookings)
    .where(
      and(
        eq(strategyBookings.slotStart, slotStart),
        eq(strategyBookings.status, "confirmed")
      )
    )
    .limit(1);

  if (existing) {
    return NextResponse.json(
      { error: "That slot was just taken. Please choose another time." },
      { status: 409 }
    );
  }

  const [booking] = await db
    .insert(strategyBookings)
    .values({
      fullName: data.fullName,
      email: data.email,
      clinicName: data.clinicName,
      phone: data.phone,
      packageInterest: data.packageInterest,
      demoInterest: data.demoInterest,
      slotStart,
      slotEnd,
      timezone: data.timezone,
      notes: data.notes,
      quizResultId: data.quizResultId,
      status: "confirmed",
    })
    .returning();

  return NextResponse.json({ booking, persisted: true });
}
