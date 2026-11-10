import type { AgentDefinition, AgentResult } from "./types";

const FIELD_PATTERNS: Array<{ label: string; pattern: RegExp }> = [
  { label: "Phone number", pattern: /(phone|mobile|tel)[:\s]*$/im },
  { label: "Email", pattern: /(email)[:\s]*$/im },
  { label: "Date of birth", pattern: /(dob|date of birth)[:\s]*$/im },
  { label: "Address / proof of address", pattern: /(address|proof of address).*(missing|not provided|n\/a)/i },
  { label: "Insurance details", pattern: /(insurance).*(not provided|missing|n\/a)/i },
  { label: "Consent form", pattern: /(consent).*(missing|unsigned|incomplete)/i },
  { label: "Questionnaire completeness", pattern: /(questionnaire|form).*(incomplete|skipped|missing)/i },
  { label: "Attachments / ID", pattern: /(attachment|id|document).*(missing|low quality|unclear)/i },
  { label: "Medication / history notes", pattern: /(medication|medical history|allerg).*(missing|not listed|skipped)/i },
];

function extractMissingFields(input: string) {
  const missing = new Set<string>();
  for (const field of FIELD_PATTERNS) {
    if (field.pattern.test(input)) missing.add(field.label);
  }
  if (/(phone|mobile)[:\s]*$/im.test(input) || /phone:\s*$/im.test(input)) {
    missing.add("Phone number");
  }
  if (/email:\s*$/im.test(input)) missing.add("Email");
  if (/missing/i.test(input)) {
    const match = input.match(/([A-Za-z ]+):\s*missing/gi) ?? [];
    for (const item of match) {
      missing.add(item.replace(/:\s*missing/i, "").trim());
    }
  }
  return [...missing];
}

function urgency(input: string) {
  if (/(urgent|asap|emergency|today)/i.test(input)) return "High";
  if (/(this week|tomorrow|reschedule|no-show)/i.test(input)) return "Medium";
  return "Normal";
}

export function runLocalAgent(
  agent: AgentDefinition,
  input: string
): AgentResult {
  const cleaned = input.trim();
  const missingFields = extractMissingFields(cleaned);
  const lines = cleaned
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
  const disclaimer =
    "Operational assistance only. Not medical advice. Staff must review before contacting patients or making decisions.";

  if (agent.id === "intake-completeness" || agent.id === "application-review") {
    return {
      agentId: agent.id,
      title: agent.name,
      mode: "local",
      summary:
        missingFields.length > 0
          ? `Found ${missingFields.length} completeness gap(s) that need staff attention before progressing.`
          : "No obvious missing-field markers detected. Still review attachments and required clinic checklist items manually.",
      findings:
        missingFields.length > 0
          ? missingFields.map((field) => `Possible gap: ${field}`)
          : [
              "No explicit empty/missing markers detected in the text.",
              "Confirm required attachments and signatures against your clinic checklist.",
            ],
      actions: [
        "Send a polite request for any missing items",
        "Hold scheduling until the packet meets your checklist",
        "Log what was requested and when",
      ],
      missingFields,
      draft: `Hello,\n\nThank you for your submission. To continue, please provide the following:\n${(
        missingFields.length
          ? missingFields
          : ["Any remaining checklist items from your clinic packet"]
      )
        .map((item) => `- ${item}`)
        .join("\n")}\n\nOnce received, our team will review and follow up with next steps.\n\nKind regards,\nClinic Team`,
      riskNotes: [
        "Local mode uses pattern checks—confirm against your official checklist.",
        "Do not treat this as clinical eligibility review.",
      ],
      disclaimer,
    };
  }

  if (agent.id === "front-desk-concierge") {
    return {
      agentId: agent.id,
      title: agent.name,
      mode: "local",
      summary: `Draft reply prepared. Suggested urgency: ${urgency(cleaned)}.`,
      findings: [
        `Urgency: ${urgency(cleaned)}`,
        /saturday|weekend/i.test(cleaned)
          ? "Topic appears to include weekend availability"
          : "General enquiry",
        "Reply should avoid medical claims and confirm staff availability separately",
      ],
      actions: [
        "Review draft for accuracy against clinic hours/services",
        "Confirm whether weekend appointments are offered",
        "Send only after human approval",
      ],
      draft: `Hello,\n\nThank you for reaching out. We’d be happy to help with your enquiry.\n\nA team member will confirm availability and the right next step for your request. If you can share your preferred location and timing, that will help us respond faster.\n\nKind regards,\nFront Desk Team`,
      riskNotes: [
        "Do not auto-send. Verify hours, services, and policies first.",
      ],
      disclaimer,
    };
  }

  if (agent.id === "follow-up-scheduling") {
    const people = lines.filter((line) => /\d\)|—|-/.test(line)).slice(0, 5);
    return {
      agentId: agent.id,
      title: agent.name,
      mode: "local",
      summary: `Prepared ${Math.max(people.length, 1)} follow-up prioritization item(s) for staff approval.`,
      findings:
        people.length > 0
          ? people.map((line) => `Follow-up candidate: ${line}`)
          : ["No structured lead list detected—treat the whole note as one follow-up task."],
      actions: [
        "Approve reminders in bulk before sending",
        "Prioritize no-shows and unpaid carts first",
        "Record outreach outcome in your CRM/dashboard",
      ],
      draft: `Hello,\n\nJust following up on your recent enquiry with our clinic. If you’d still like to continue, reply with a preferred day and we will help with the next step.\n\nKind regards,\nClinic Team`,
      riskNotes: ["Never invent appointment slots. Confirm clinician calendars first."],
      disclaimer,
    };
  }

  if (agent.id === "ops-exception") {
    return {
      agentId: agent.id,
      title: agent.name,
      mode: "local",
      summary: "Operational exceptions sorted into payment, fulfillment, content, and integration buckets.",
      findings: lines.slice(0, 6).map((line) => `Exception noted: ${line}`),
      actions: [
        "Resolve payment-pending orders first",
        "Fill missing tracking / fulfillment details",
        "Clear stalled content approvals",
        "Finish disconnected payment integrations when ready",
      ],
      draft: "Daily ops focus: clear payment exceptions, then fulfillment gaps, then stalled internal approvals.",
      riskNotes: ["This agent does not process payments or change medical records."],
      disclaimer,
    };
  }

  if (agent.id === "call-concierge") {
    const wantsWeekend = /saturday|sunday|weekend/i.test(cleaned);
    const mentionsIntake = /intake|form|application/i.test(cleaned);
    const spoken = [
      "Thanks for calling Northside Wellness — happy to help.",
      mentionsIntake
        ? "I can see you mentioned an intake. I’ll check completeness and tell you exactly what’s still needed."
        : "I can help with scheduling, intake status, or general clinic questions.",
      wantsWeekend
        ? "For weekends, Saturday is by request — I can note your preferred time and have the team confirm availability."
        : "If you share your preferred day and location, I can pass that to the scheduling team right away.",
      "I can’t give medical advice on this call, but I can make sure the right coordinator follows up.",
    ].join(" ");

    return {
      agentId: agent.id,
      title: agent.name,
      mode: "local",
      summary: `Live call guidance ready. Urgency: ${urgency(cleaned)}.`,
      findings: [
        `Urgency: ${urgency(cleaned)}`,
        mentionsIntake ? "Caller referenced intake/forms" : "General call topic",
        wantsWeekend ? "Caller asked about weekend timing" : "No weekend request detected",
      ],
      actions: [
        "Say the draft line to the caller",
        "Log preferred times in the submission notes",
        "If clinical questions arise, offer a clinician callback",
      ],
      draft: spoken,
      riskNotes: [
        "Stay operational — no diagnoses or treatment claims.",
        "Escalate medical questions to licensed staff.",
      ],
      disclaimer,
    };
  }

  return {
    agentId: agent.id,
    title: agent.name,
    mode: "local",
    summary: "Created a concise operational handoff brief for your team huddle.",
    findings: lines.slice(0, 5).map((line) => `Context: ${line}`),
    actions: [
      "Share handoff draft in your internal channel",
      "Confirm owners for each open item",
      "Update status after the next patient/staff touchpoint",
    ],
    draft: `Handoff brief\n\nSummary:\n${cleaned.slice(0, 500)}\n\nOpen items:\n- Confirm packet completeness\n- Confirm next available appointment window\n- Confirm who owns patient reply\n\nOwner: assign in huddle`,
    riskNotes: ["Keep clinical decisions with licensed professionals."],
    disclaimer,
  };
}
