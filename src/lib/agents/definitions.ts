import type { AgentDefinition } from "./types";

export const agentDefinitions: AgentDefinition[] = [
  {
    id: "intake-completeness",
    name: "Intake Completeness Agent",
    role: "Applications & forms",
    description:
      "Reviews intake text for missing fields, unclear answers, and incomplete attachments before staff dig through every file.",
    placeholder:
      "Paste an intake form response, enquiry email, or application notes…",
    sampleInput: `Patient: Sarah M.
DOB: 14/03/1988
Phone: 
Email: sarah@example.com
Service interest: Longevity consultation
Preferred location: Downtown
Insurance: not provided
Attachments: ID uploaded, medical history missing
Notes: Wants appointment next week, no allergies listed.`,
    systemPrompt: `You are Synapto's Intake Completeness Agent for clinic operations staff.
Review the submitted intake/application text.
Return concise operational guidance only.
Do NOT diagnose, recommend treatment, or give medical advice.
Identify missing fields, inconsistencies, and next staff actions.
Respond in JSON with keys: summary, findings (string[]), actions (string[]), missingFields (string[]), draft (string), riskNotes (string[]).`,
  },
  {
    id: "application-review",
    name: "Application Review Agent",
    role: "Document screening",
    description:
      "Checks application packets against a clinic checklist and surfaces exceptions for human review.",
    placeholder: "Paste application packet notes or checklist answers…",
    sampleInput: `Applicant: James K.
Checklist:
- Government ID: present, expires 2027
- Proof of address: missing
- Consent form: signed
- Questionnaire: incomplete (skipped medication list)
- Referral letter: uploaded, low quality scan
Staff note: Needs follow-up before scheduling.`,
    systemPrompt: `You are Synapto's Application Review Agent.
Compare the packet against typical clinic onboarding completeness.
Flag missing/expired/unclear items for staff.
Do NOT approve/deny medical eligibility.
Respond in JSON with keys: summary, findings, actions, missingFields, draft, riskNotes.`,
  },
  {
    id: "front-desk-concierge",
    name: "Front Desk Concierge Agent",
    role: "Patient communication",
    description:
      "Drafts polite replies to common questions and tags urgency—ready for a human to send.",
    placeholder: "Paste the patient or lead message…",
    sampleInput: `Hi, do you offer Saturday consultations for aesthetic aftercare?
Also, how long are appointments usually?
I can come downtown next weekend.
Thanks!`,
    systemPrompt: `You are Synapto's Front Desk Concierge Agent.
Draft a professional, warm reply for clinic staff to review before sending.
Do NOT give medical advice or promise outcomes.
Tag urgency and topic in findings.
Respond in JSON with keys: summary, findings, actions, draft, riskNotes.`,
  },
  {
    id: "follow-up-scheduling",
    name: "Follow-Up & Scheduling Agent",
    role: "Retention ops",
    description:
      "Turns unfinished bookings and pending next steps into follow-up tasks staff can approve.",
    placeholder: "Paste booking notes, no-show logs, or CRM follow-up list…",
    sampleInput: `Leads needing follow-up:
1) Priya S. — requested longevity consult, no booking confirmed (3 days ago)
2) Marcus T. — no-show on Tuesday aesthetic consult, asked to reschedule
3) Elena M. — cart started for aftercare kit, unpaid
Clinic hours: Mon–Fri 9–5, Sat by request.`,
    systemPrompt: `You are Synapto's Follow-Up & Scheduling Agent.
Create prioritized follow-up actions and a polite draft reminder.
Do NOT invent appointments or override clinician schedules.
Respond in JSON with keys: summary, findings, actions, draft, riskNotes.`,
  },
  {
    id: "ops-exception",
    name: "Ops Exception Agent",
    role: "Orders & admin",
    description:
      "Flags stalled orders, incomplete checkouts, and admin tasks that need attention.",
    placeholder: "Paste order/admin notes or exception list…",
    sampleInput: `ORD-10479 — payment pending 48h, customer Marcus T.
ORD-10470 — fulfilled but tracking missing
Content task — homepage banner draft waiting approval 5 days
Inventory — Recovery Complex low (17 units)
Integration — Stripe connect still disconnected`,
    systemPrompt: `You are Synapto's Ops Exception Agent.
Prioritize operational exceptions for clinic/admin staff.
Do NOT process payments or change clinical records.
Respond in JSON with keys: summary, findings, actions, draft, riskNotes.`,
  },
  {
    id: "team-copilot",
    name: "Team Copilot Agent",
    role: "Internal assistance",
    description:
      "Summarizes notes and drafts handoffs between front desk, coordinators, and clinicians.",
    placeholder: "Paste internal notes, email threads, or handoff context…",
    sampleInput: `Thread:
Front desk: New enquiry for regenerative consult, asked about pricing and prep.
Coordinator: Sent intake form yesterday, still waiting on completed questionnaire and ID.
Clinician: Can see them Thursday afternoon if packet is complete by Wednesday noon.
Need a clean handoff summary for tomorrow's huddle.`,
    systemPrompt: `You are Synapto's Team Copilot Agent.
Summarize operational context and draft a handoff brief for staff.
Do NOT invent clinical protocols or medical guidance.
Respond in JSON with keys: summary, findings, actions, draft, riskNotes.`,
  },
  {
    id: "call-concierge",
    name: "Call Concierge Agent",
    role: "Live phone support",
    description:
      "Helps staff talk to callers in real time—opening lines, answers, and next steps without giving medical advice.",
    placeholder:
      "Paste what the caller just said, or start a live call session…",
    sampleInput: `Caller: Hi, I filled an intake yesterday for longevity but nobody confirmed.
I also want to know if Saturday morning is possible downtown.
I'm free after 10am.`,
    systemPrompt: `You are Synapto's Call Concierge Agent for live phone support.
Help clinic staff respond to the caller in short spoken lines.
Do NOT diagnose, recommend treatment, or give medical advice.
Collect scheduling preferences, confirm intake status, and offer to have a human specialist follow up.
Respond in JSON with keys: summary, findings, actions, draft (what staff should say next), riskNotes.`,
  },
];

export function getAgentDefinition(id: string) {
  return agentDefinitions.find((agent) => agent.id === id);
}
