import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { AgentRunner } from "@/components/dashboard/agent-runner";
import { agentDefinitions, getAgentDefinition } from "@/lib/agents/definitions";
import { hasLlmConfigured } from "@/lib/agents/run";
import { listSubmissions } from "@/lib/dashboard-data";
import { hasDatabase } from "@/lib/env";

export function generateStaticParams() {
  return agentDefinitions.map((agent) => ({ agentId: agent.id }));
}

async function AgentDetail({
  params,
}: {
  params: Promise<{ agentId: string }>;
}) {
  const { agentId } = await params;
  const agent = getAgentDefinition(agentId);
  if (!agent) notFound();

  const llmEnabled = hasLlmConfigured();
  const databaseConnected = hasDatabase();
  const submissions = databaseConnected
    ? await listSubmissions(agent.id)
    : [];

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/dashboard/agents"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          All agents
        </Link>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight text-midnight">
          {agent.name}
        </h1>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
          {agent.description}
        </p>
      </div>

      <AgentRunner
        agent={agent}
        llmEnabled={llmEnabled}
        databaseConnected={databaseConnected}
        initialSubmissions={submissions.map((row) => ({
          id: row.id,
          subject: row.subject,
          patientLabel: row.patientLabel,
          status: row.status,
          body: row.body,
        }))}
      />
    </div>
  );
}

export default function AgentDetailPage({
  params,
}: {
  params: Promise<{ agentId: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="rounded-2xl border border-border/80 bg-white p-8 text-sm text-muted-foreground">
          Loading agent…
        </div>
      }
    >
      <AgentDetail params={params} />
    </Suspense>
  );
}
