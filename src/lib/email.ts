import { Resend } from "resend";
import { env, hasResend } from "@/lib/env";

export type LeadEmailPayload = {
  fullName: string;
  businessName: string;
  email: string;
  website?: string;
  businessType: string;
  estimatedProducts?: string;
  interest?: string;
  websiteStatus?: string;
  timeline?: string;
  message?: string;
  source: string;
};

function getResend() {
  if (!hasResend()) return null;
  return new Resend(process.env.RESEND_API_KEY);
}

export async function sendLeadNotification(lead: LeadEmailPayload) {
  const resend = getResend();
  if (!resend) {
    console.info("[email] Resend not configured. Lead captured:", lead.email);
    return { sent: false as const, reason: "not_configured" as const };
  }

  const from = env.RESEND_FROM_EMAIL ?? "Synapto Tech <onboarding@resend.dev>";
  const to = env.LEADS_TO_EMAIL ?? "hello@synaptotech.com";
  const interestLabel = lead.interest ?? "General enquiry";

  await resend.emails.send({
    from,
    to,
    replyTo: lead.email,
    subject: `New clinic lead — ${interestLabel} — ${lead.businessName}`,
    html: `
      <h2>New lead from Synapto Tech</h2>
      <p><strong>Name:</strong> ${lead.fullName}</p>
      <p><strong>Clinic / business:</strong> ${lead.businessName}</p>
      <p><strong>Email:</strong> ${lead.email}</p>
      <p><strong>Website:</strong> ${lead.website || "—"}</p>
      <p><strong>Type:</strong> ${lead.businessType}</p>
      <p><strong>Interest:</strong> ${interestLabel}</p>
      <p><strong>Website status:</strong> ${lead.websiteStatus || "—"}</p>
      <p><strong>Timeline:</strong> ${lead.timeline || "—"}</p>
      <p><strong>Products/services:</strong> ${lead.estimatedProducts || "—"}</p>
      <p><strong>Source:</strong> ${lead.source}</p>
      <p><strong>Message:</strong></p>
      <p>${lead.message || "—"}</p>
    `,
  });

  await resend.emails.send({
    from,
    to: lead.email,
    subject: "We received your clinic project request — Synapto Tech",
    html: `
      <p>Hi ${lead.fullName},</p>
      <p>Thank you for reaching out to Synapto Tech about <strong>${interestLabel}</strong> for ${lead.businessName}.</p>
      <p>Our team will review your details and follow up with next steps for branding, website, or broader digital solutions.</p>
      <p>If you have anything else to share before then, just reply to this email.</p>
      <p>— The Synapto Tech team</p>
    `,
  });

  return { sent: true as const };
}
