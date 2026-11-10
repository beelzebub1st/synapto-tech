export const aiAgentsIntro = {
  eyebrow: "AI Agents",
  headline: "Agents that handle the busywork—so your team can focus on patients.",
  support:
    "Synapto Agents review applications, check missing information, route enquiries, and keep follow-ups moving. Staff stay in control. Clinical decisions stay with licensed professionals.",
} as const;

export const aiAgents = [
  {
    name: "Intake Completeness Agent",
    role: "Applications & forms",
    description:
      "Reviews submitted intake and enquiry forms, flags missing fields, inconsistent answers, and incomplete uploads—before staff dig through every file.",
    does: [
      "Checks required fields and attachments",
      "Highlights gaps in plain language",
      "Drafts a patient-ready request for missing info",
    ],
    doesNot: [
      "Diagnose or recommend treatment",
      "Approve medical eligibility on its own",
    ],
  },
  {
    name: "Application Review Agent",
    role: "Document screening",
    description:
      "Walks through applications and supporting documents against your checklist so coordinators spend time on exceptions—not repetitive scanning.",
    does: [
      "Matches packets against your clinic checklist",
      "Surfaces expired or unclear documents",
      "Creates a review summary for staff",
    ],
    doesNot: [
      "Replace licensed review where required",
      "Make final acceptance decisions",
    ],
  },
  {
    name: "Front Desk Concierge Agent",
    role: "Patient communication",
    description:
      "Drafts replies to common questions, routes urgent messages, and keeps tone consistent—ready for a human to send.",
    does: [
      "Suggests FAQ-quality responses",
      "Tags urgency and topic",
      "Hands off to the right teammate",
    ],
    doesNot: [
      "Give medical advice",
      "Send messages without your approval rules",
    ],
  },
  {
    name: "Follow-Up & Scheduling Agent",
    role: "Retention ops",
    description:
      "Tracks unfinished bookings, no-shows, and pending next steps, then prepares reminders your team can approve in bulk.",
    does: [
      "Queues polite follow-ups",
      "Groups similar outreach tasks",
      "Logs what was suggested vs sent",
    ],
    doesNot: [
      "Override clinician schedules blindly",
      "Pressure patients with aggressive messaging",
    ],
  },
  {
    name: "Ops Exception Agent",
    role: "Orders & admin",
    description:
      "Watches for stalled orders, incomplete commerce checkouts, and admin tasks that need attention—so nothing quietly piles up.",
    does: [
      "Flags stuck orders and missing details",
      "Prioritizes what needs a human next",
      "Summarizes daily ops health",
    ],
    doesNot: [
      "Process payments without provider approval",
      "Alter clinical records",
    ],
  },
  {
    name: "Team Copilot Agent",
    role: "Internal assistance",
    description:
      "Helps staff draft SOPs answers, summarize long threads, and prepare handoffs between front desk, coordinators, and clinicians.",
    does: [
      "Summarizes long internal notes",
      "Drafts handoff briefs",
      "Answers from your approved knowledge base",
    ],
    doesNot: [
      "Invent clinical protocols",
      "Access systems you have not connected",
    ],
  },
] as const;

export const aiGuardrails = [
  "Human-in-the-loop by default for patient-facing messages",
  "Configured to your clinic checklists—not generic internet advice",
  "Designed for operations and admin—not autonomous clinical care",
  "Access limited by roles; sensitive health data stays out of MVP storage unless a separately reviewed system is connected",
  "Every agent action can leave an audit-friendly trail for your team",
] as const;
