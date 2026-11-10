export const aiServicesIntro = {
  eyebrow: "AI as a service",
  title: "AI that works inside your business—not as a slide deck.",
  lead: "We design, ship, and operate AI agents and workflow automations that qualify leads, draft replies, chase incomplete work, and keep teams moving—with humans approving what customers see.",
} as const;

export const aiServices = [
  {
    id: "lead-agents",
    name: "Lead & enquiry agents",
    summary:
      "Qualify inbound forms, score intent, and route hot leads to the right person instantly.",
    outcomes: ["Faster response", "Cleaner CRM handoff", "Fewer lost enquiries"],
  },
  {
    id: "follow-up",
    name: "Follow-up automation",
    summary:
      "Sequence reminders, nurture drafts, and reopen stalled conversations without sticky notes.",
    outcomes: ["Consistent chase", "Template control", "Human approve gates"],
  },
  {
    id: "ops-agents",
    name: "Ops & intake agents",
    summary:
      "Check completeness, flag missing documents, and keep internal queues moving.",
    outcomes: ["Less rework", "Clear status", "Staff-ready queues"],
  },
  {
    id: "concierge",
    name: "Call & chat concierge",
    summary:
      "Live talk tracks and draft answers so frontline teams stay on-message under pressure.",
    outcomes: ["Better first calls", "Brand-safe replies", "Audit trail"],
  },
] as const;

export const aiDelivery = [
  {
    step: "01",
    title: "Map the workflow",
    text: "We find the repetitive handoffs that burn hours—forms, follow-ups, intake, support drafts.",
  },
  {
    step: "02",
    title: "Ship the agent",
    text: "Build into your site, PWA, or business OS with guardrails, templates, and approval queues.",
  },
  {
    step: "03",
    title: "Measure & improve",
    text: "Track response time, completion rate, and conversion—then tighten prompts and flows.",
  },
] as const;
