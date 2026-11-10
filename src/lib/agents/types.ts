export type AgentId =
  | "intake-completeness"
  | "application-review"
  | "front-desk-concierge"
  | "follow-up-scheduling"
  | "ops-exception"
  | "team-copilot"
  | "call-concierge";

export type AgentResult = {
  agentId: AgentId;
  title: string;
  mode: "local" | "llm";
  summary: string;
  findings: string[];
  actions: string[];
  draft?: string;
  missingFields?: string[];
  riskNotes: string[];
  disclaimer: string;
};

export type AgentDefinition = {
  id: AgentId;
  name: string;
  role: string;
  description: string;
  placeholder: string;
  sampleInput: string;
  systemPrompt: string;
};
