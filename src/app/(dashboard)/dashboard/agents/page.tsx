import Link from "next/link";
import { Bot, ArrowRight, Sparkles, Database } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { agentDefinitions } from "@/lib/agents/definitions";
import { hasLlmConfigured } from "@/lib/agents/run";
import { listSubmissions } from "@/lib/dashboard-data";
import { hasDatabase } from "@/lib/env";

export default async function AgentsPage() {
  const llmEnabled = hasLlmConfigured();
  const databaseConnected = hasDatabase();
  const submissions = databaseConnected ? await listSubmissions() : [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-midnight">
            Clinic Agents
          </h1>
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
            Run agents manually, or turn on Automation so intakes are checked
            and clients messaged automatically. Use Call Agent when the phone
            rings.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant={databaseConnected ? "success" : "sample"}>
            {databaseConnected
              ? `${submissions.length} submissions`
              : "No database"}
          </Badge>
          <Badge variant={llmEnabled ? "success" : "sample"}>
            {llmEnabled ? "LLM connected" : "Local mode · free"}
          </Badge>
        </div>
      </div>

      <div className="rounded-2xl border border-border/80 bg-white p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <div className="rounded-xl bg-primary/10 p-2 text-primary">
            {databaseConnected ? (
              <Database className="h-4 w-4" />
            ) : (
              <Sparkles className="h-4 w-4" />
            )}
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-midnight">
              {databaseConnected ? "Live database connected" : "How they work"}
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {databaseConnected
                ? "Open an agent, pick a seeded submission, run it, and the draft is stored in agent_runs. Use “Run all seeded submissions” to process the full queue."
                : "Paste clinic notes → agent returns findings, actions, and a draft. Connect Docker Postgres to load real submissions."}
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {agentDefinitions.map((agent) => {
          const count = submissions.filter(
            (row) => row.suggestedAgentId === agent.id
          ).length;
          return (
            <Link
              key={agent.id}
              href={`/dashboard/agents/${agent.id}`}
              className="group flex flex-col rounded-2xl border border-border/80 bg-off-white/60 p-5 transition-colors hover:border-primary/40 hover:bg-white"
            >
              <div className="mb-3 flex items-center justify-between gap-2">
                <span className="rounded-lg bg-primary/10 p-2 text-primary">
                  <Bot className="h-4 w-4" />
                </span>
                <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {agent.role}
                </span>
              </div>
              <h2 className="text-base font-semibold text-midnight">
                {agent.name}
              </h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {agent.description}
              </p>
              {databaseConnected ? (
                <p className="mt-3 text-xs text-muted-foreground">
                  {count} matching submission{count === 1 ? "" : "s"}
                </p>
              ) : null}
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                Open agent
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
