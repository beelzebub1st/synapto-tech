import { getAgentDefinition } from "./definitions";
import { runLocalAgent } from "./local-runner";
import { hasLlmConfigured, runLlmAgent } from "./llm-runner";
import type { AgentResult } from "./types";

export async function runAgent(
  agentId: string,
  input: string
): Promise<AgentResult> {
  const agent = getAgentDefinition(agentId);
  if (!agent) {
    throw new Error("Unknown agent.");
  }

  const cleaned = input.trim();
  if (cleaned.length < 20) {
    throw new Error("Please provide more detail (at least a short paragraph).");
  }

  if (hasLlmConfigured()) {
    try {
      const llmResult = await runLlmAgent(agent, cleaned);
      if (llmResult) return llmResult;
    } catch (error) {
      console.error("[agents] LLM run failed, falling back to local mode:", error);
    }
  }

  return runLocalAgent(agent, cleaned);
}

export { hasLlmConfigured };
