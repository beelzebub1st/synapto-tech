"use server";

import { z } from "zod";
import { hasDatabase } from "@/lib/env";
import { sendLeadNotification } from "@/lib/email";

export type LeadFormState = {
  ok: boolean;
  message: string;
};

const leadSchema = z.object({
  fullName: z.string().min(2, "Please enter your full name."),
  businessName: z.string().min(2, "Please enter your clinic or practice name."),
  email: z.string().email("Please enter a valid email."),
  website: z.string().optional(),
  businessType: z.string().min(1, "Please select a business type."),
  interest: z.string().min(1, "Please select what you need help with."),
  websiteStatus: z.string().optional(),
  timeline: z.string().optional(),
  estimatedProducts: z.string().optional(),
  message: z.string().optional(),
  intent: z.enum(["contact", "demo"]).default("demo"),
  consent: z
    .string({ error: "Please agree to the privacy notice to continue." })
    .refine((v) => v === "on", "Please agree to the privacy notice to continue."),
});

export async function submitLead(
  _prev: LeadFormState | undefined,
  formData: FormData
): Promise<LeadFormState> {
  const raw = {
    fullName: String(formData.get("name") ?? "").trim(),
    businessName: String(
      formData.get("organization") ?? formData.get("businessName") ?? ""
    ).trim(),
    email: String(formData.get("email") ?? "").trim(),
    website: String(formData.get("website") ?? "").trim() || undefined,
    businessType: String(formData.get("businessType") ?? "").trim(),
    interest: String(formData.get("interest") ?? "").trim(),
    websiteStatus: String(formData.get("websiteStatus") ?? "").trim() || undefined,
    timeline: String(formData.get("timeline") ?? "").trim() || undefined,
    estimatedProducts:
      String(formData.get("productCount") ?? "").trim() || undefined,
    message: String(formData.get("message") ?? "").trim() || undefined,
    intent: (String(formData.get("intent") ?? "demo") === "contact"
      ? "contact"
      : "demo") as "contact" | "demo",
    consent: String(formData.get("consent") ?? ""),
  };

  const parsed = leadSchema.safeParse(raw);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message ?? "Please check the form.";
    return { ok: false, message: first };
  }

  const data = parsed.data;
  const source = data.intent === "contact" ? "contact" : "book_demo";
  const composedMessage = [
    data.message,
    `Interest: ${data.interest}`,
    data.websiteStatus ? `Website status: ${data.websiteStatus}` : null,
    data.timeline ? `Timeline: ${data.timeline}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  if (hasDatabase()) {
    try {
      const { getDb } = await import("@/db/client");
      const { leads } = await import("@/db/schema");
      const db = getDb();
      await db.insert(leads).values({
        fullName: data.fullName,
        businessName: data.businessName,
        email: data.email,
        website: data.website,
        businessType: data.businessType,
        estimatedProducts: data.estimatedProducts,
        message: composedMessage,
        source,
        consent: true,
      });
    } catch (error) {
      console.error("[leads] Failed to persist lead:", error);
      return {
        ok: false,
        message:
          "We could not save your request right now. Please try again or email hello@synaptotech.com.",
      };
    }
  } else {
    console.info("[leads] DATABASE_URL not set. Lead received:", {
      email: data.email,
      businessName: data.businessName,
      interest: data.interest,
      source,
    });
  }

  try {
    await sendLeadNotification({
      fullName: data.fullName,
      businessName: data.businessName,
      email: data.email,
      website: data.website,
      businessType: data.businessType,
      estimatedProducts: data.estimatedProducts,
      interest: data.interest,
      websiteStatus: data.websiteStatus,
      timeline: data.timeline,
      message: data.message,
      source,
    });
  } catch (error) {
    console.error("[leads] Email send failed:", error);
  }

  const isWebsiteProject =
    data.interest.toLowerCase().includes("website") ||
    data.interest.toLowerCase().includes("brand");

  return {
    ok: true,
    message: isWebsiteProject
      ? "Thank you — your clinic website & branding request is in. We’ll follow up with next steps shortly."
      : data.intent === "demo"
        ? "Thank you — your strategy request is in. Our team will follow up shortly."
        : "Thank you — we received your message and will get back to you soon.",
  };
}
