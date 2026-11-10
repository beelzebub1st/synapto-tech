import { eq } from "drizzle-orm";
import { hasResend } from "@/lib/env";

export async function deliverClientMessage(messageId: string) {
  const { getDb } = await import("@/db/client");
  const { clientMessages } = await import("@/db/schema");
  const db = getDb();

  const [message] = await db
    .select()
    .from(clientMessages)
    .where(eq(clientMessages.id, messageId))
    .limit(1);

  if (!message) {
    throw new Error("Message not found.");
  }

  if (message.status === "sent" || message.status === "sent_local") {
    return message;
  }

  try {
    if (hasResend() && process.env.RESEND_API_KEY) {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);
      const from =
        process.env.RESEND_FROM_EMAIL ??
        "Northside Wellness <onboarding@resend.dev>";

      await resend.emails.send({
        from,
        to: message.toAddress,
        subject: message.subject,
        text: message.body,
      });

      const [updated] = await db
        .update(clientMessages)
        .set({ status: "sent", sentAt: new Date(), error: null })
        .where(eq(clientMessages.id, messageId))
        .returning();
      return updated;
    }

    console.info("[messaging] Local send (no RESEND_API_KEY):", {
      to: message.toAddress,
      subject: message.subject,
    });

    const [updated] = await db
      .update(clientMessages)
      .set({ status: "sent_local", sentAt: new Date(), error: null })
      .where(eq(clientMessages.id, messageId))
      .returning();
    return updated;
  } catch (error) {
    const errText =
      error instanceof Error ? error.message : "Failed to send message.";
    const [updated] = await db
      .update(clientMessages)
      .set({ status: "failed", error: errText })
      .where(eq(clientMessages.id, messageId))
      .returning();
    return updated;
  }
}
