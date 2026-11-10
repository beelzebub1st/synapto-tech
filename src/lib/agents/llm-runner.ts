import { generateText, Output } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { z } from "zod";
import type { AgentDefinition, AgentResult } from "./types";

const resultSchema = z.object({
  summary: z.string(),
  findings: z.array(z.string()).default([]),
  actions: z.array(z.string()).default([]),
  missingFields: z.array(z.string()).optional(),
  draft: z.string().optional(),
  riskNotes: z.array(z.string()).default([]),
});

export function hasLlmConfigured() {
  return Boolean(process.env.GROQ_API_KEY || process.env.OPENAI_API_KEY);
}

function getModel() {
  if (process.env.GROQ_API_KEY) {
    const groq = createOpenAI({
      apiKey: process.env.GROQ_API_KEY,
      baseURL: "https://api.groq.com/openai/v1",
    });
    return groq("llama-3.3-70b-versatile");
  }

  if (process.env.OPENAI_API_KEY) {
    const openai = createOpenAI({ apiKey: process.env.OPENAI_API_KEY });
    return openai("gpt-4o-mini");
  }

  return null;
}

export async function runLlmAgent(
  agent: AgentDefinition,
  input: string
): Promise<AgentResult | null> {
  const model = getModel();
  if (!model) return null;

  const { output } = await generateText({
    model,
    output: Output.object({ schema: resultSchema }),
    system: agent.systemPrompt,
    prompt: `Clinic staff submitted the following text for review:\n\n${input}`,
    temperature: 0.2,
  });

  if (!output) return null;

  return {
    agentId: agent.id,
    title: agent.name,
    mode: "llm",
    summary: output.summary,
    findings: output.findings,
    actions: output.actions,
    missingFields: output.missingFields,
    draft: output.draft,
    riskNotes: output.riskNotes,
    disclaimer:
      "Operational assistance only. Not medical advice. Staff must review before contacting patients or making decisions.",
  };
}
