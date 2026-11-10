import { NextResponse } from "next/server";
import { z } from "zod";
import { runAgent } from "@/lib/agents/run";
import { persistAgentRun } from "@/lib/agents/persist";
import { getSubmission } from "@/lib/dashboard-data";

const bodySchema = z.object({
  agentId: z.string().min(1),
  input: z.string().optional(),
  submissionId: z.string().uuid().optional(),
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const parsed = bodySchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid request." },
        { status: 400 }
      );
    }

    let input = parsed.data.input?.trim() ?? "";
    const submissionId = parsed.data.submissionId;

    if (submissionId) {
      const submission = await getSubmission(submissionId);
      if (!submission) {
        return NextResponse.json(
          { error: "Submission not found." },
          { status: 404 }
        );
      }
      input = submission.body;
    }

    if (input.length < 20) {
      return NextResponse.json(
        { error: "Please provide more detail." },
        { status: 400 }
      );
    }

    const result = await runAgent(parsed.data.agentId, input);
    const saved = await persistAgentRun({
      agentId: parsed.data.agentId,
      input,
      result,
      submissionId,
    });

    return NextResponse.json({
      result,
      runId: saved?.id ?? null,
      persisted: Boolean(saved),
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Agent failed to run.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
