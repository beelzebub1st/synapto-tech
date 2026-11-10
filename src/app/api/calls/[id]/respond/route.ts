import { connection } from "next/server";
import { NextResponse } from "next/server";
import { z } from "zod";
import { hasDatabase } from "@/lib/env";
import { respondOnCall } from "@/lib/agents/call-session";

const bodySchema = z.object({
  text: z.string().min(2),
});

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  await connection();
  if (!hasDatabase()) {
    return NextResponse.json(
      { error: "Database not connected." },
      { status: 503 }
    );
  }

  const { id } = await context.params;
  const parsed = bodySchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please provide what the caller said." },
      { status: 400 }
    );
  }

  const result = await respondOnCall(id, parsed.data.text);
  return NextResponse.json(result);
}
