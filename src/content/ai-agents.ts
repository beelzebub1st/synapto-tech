export const aiAgentsIntro = {
  eyebrow: "AI Agents",
  headline: "Agents that handle the busywork—so your team can focus on customers.",
  support:
    "Synapto Agents review applications, check missing information, route enquiries, and keep follow-ups moving. Staff stay in control. Critical decisions stay with your people.",
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
      "Drafts a customer-ready request for missing info",
    ],
    doesNot: [
      "Make final acceptance decisions alone",
      "Send messages without your approval rules",
    ],
  },
  {
    name: "Application Review Agent",
    role: "Document screening",
    description:
      "Walks through applications and supporting documents against your checklist so coordinators spend time on exceptions—not repetitive scanning.",
    does: [
      "Matches packets against your checklist",
      "Surfaces expired or unclear documents",
      "Creates a review summary for staff",
    ],
    doesNot: [
      "Replace required human review",
      "Approve regulated decisions on its own",
    ],
  },
  {
    name: "Frontline Concierge Agent",
    role: "Customer communication",
    description:
      "Drafts replies to common questions, routes urgent messages, and keeps tone consistent—ready for a human to send.",
    does: [
      "Suggests FAQ-quality responses",
      "Tags urgency and topic",
      "Hands off to the right teammate",
    ],
    doesNot: [
      "Invent brand claims you haven’t approved",
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
      "Override calendars blindly",
      "Pressure customers with aggressive messaging",
    ],
  },
  {
    name: "Ops Exception Agent",
    role: "Orders & admin",
    description:
      "Watches for stalled orders, incomplete checkouts, and admin tasks that need attention—so nothing quietly piles up.",
    does: [
      "Flags stuck orders and missing details",
      "Prioritizes what needs a human next",
      "Summarizes daily ops health",
    ],
    doesNot: [
      "Process payments without provider approval",
      "Alter systems you have not connected",
    ],
  },
  {
    name: "Team Copilot Agent",
    role: "Internal assistance",
    description:
      "Helps staff draft SOP answers, summarize long threads, and prepare handoffs between sales, ops, and leadership.",
    does: [
      "Summarizes long internal notes",
      "Drafts handoff briefs",
      "Answers from your approved knowledge base",
    ],
    doesNot: [
      "Invent company policy",
      "Access systems you have not connected",
    ],
  },
] as const;

export const aiGuardrails = [
  "Human-in-the-loop by default for customer-facing messages",
  "Configured to your checklists—not generic internet advice",
  "Designed for operations and admin—not unsupervised critical decisions",
  "Access limited by roles; sensitive data stays out of MVP storage unless a separately reviewed system is connected",
  "Every agent action can leave an audit-friendly trail for your team",
] as const;
