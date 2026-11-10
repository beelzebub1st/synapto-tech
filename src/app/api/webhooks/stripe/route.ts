import { NextResponse } from "next/server";
import { hasStripe } from "@/lib/env";

export async function POST() {
  if (!hasStripe()) {
    return NextResponse.json(
      { error: "Stripe is not configured" },
      { status: 501 }
    );
  }

  return NextResponse.json(
    { received: true, message: "Webhook handler stub — configure Stripe webhooks in production." },
    { status: 200 }
  );
}
