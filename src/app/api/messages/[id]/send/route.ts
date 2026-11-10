import { connection } from "next/server";
import { NextResponse } from "next/server";
import { deliverClientMessage } from "@/lib/messaging";
import { hasDatabase } from "@/lib/env";

export async function POST(
  _request: Request,
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
  const message = await deliverClientMessage(id);
  return NextResponse.json({ message });
}
