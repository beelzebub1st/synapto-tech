"use client";

import { useEffect, useState } from "react";
import { Loader2, Sparkles, Copy, Check, Inbox } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { AgentDefinition, AgentResult } from "@/lib/agents/types";

type SubmissionItem = {
  id: string;
  subject: string;
  patientLabel: string | null;
  status: string;
  body: string;
};

export function AgentRunner({
  agent,
  llmEnabled,
  initialSubmissions = [],
  databaseConnected,
}: {
  agent: AgentDefinition;
  llmEnabled: boolean;
  initialSubmissions?: SubmissionItem[];
  databaseConnected: boolean;
}) {
  const [submissions, setSubmissions] =
    useState<SubmissionItem[]>(initialSubmissions);
  const [selectedId, setSelectedId] = useState<string | null>(
    initialSubmissions[0]?.id ?? null
  );
  const [input, setInput] = useState(
    initialSubmissions[0]?.body ?? agent.sampleInput
  );
  const [loading, setLoading] = useState(false);
  const [batchLoading, setBatchLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AgentResult | null>(null);
  const [persisted, setPersisted] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!databaseConnected) return;
    let cancelled = false;
    async function load() {
      const response = await fetch(
        `/api/agents/submissions?agentId=${encodeURIComponent(agent.id)}`
      );
      if (!response.ok || cancelled) return;
      const data = await response.json();
      const rows = (data.submissions ?? []) as SubmissionItem[];
      if (!cancelled && rows.length) {
        setSubmissions(rows);
        if (!selectedId) {
          setSelectedId(rows[0].id);
          setInput(rows[0].body);
        }
      }
    }
    void load();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [agent.id, databaseConnected]);

  function selectSubmission(item: SubmissionItem) {
    setSelectedId(item.id);
    setInput(item.body);
    setResult(null);
    setPersisted(false);
    setError(null);
  }

  async function onRun() {
    setLoading(true);
    setError(null);
    setPersisted(false);
    try {
      const response = await fetch("/api/agents/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          agentId: agent.id,
          input,
          submissionId: selectedId ?? undefined,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error ?? "Unable to run agent.");
      }
      setResult(data.result as AgentResult);
      setPersisted(Boolean(data.persisted));
      if (selectedId) {
        setSubmissions((prev) =>
          prev.map((item) =>
            item.id === selectedId ? { ...item, status: "in_review" } : item
          )
        );
      }
    } catch (err) {
      setResult(null);
      setError(err instanceof Error ? err.message : "Unable to run agent.");
    } finally {
      setLoading(false);
    }
  }

  async function runAllSeeded() {
    setBatchLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/agents/seed-run", { method: "POST" });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error ?? "Batch run failed.");
      }
      setResult({
        agentId: agent.id,
        title: "Batch run complete",
        mode: "local",
        summary: `Processed ${data.processed} submissions · ${data.succeeded} succeeded.`,
        findings: (data.results ?? []).map(
          (row: { subject: string; ok: boolean; summary?: string; error?: string }) =>
            row.ok
              ? `${row.subject}: ${row.summary}`
              : `${row.subject}: FAILED — ${row.error}`
        ),
        actions: ["Open other agents to review individual drafts"],
        riskNotes: ["Batch mode is for local testing only."],
        disclaimer:
          "Operational assistance only. Not medical advice. Staff must review before contacting patients.",
      });
      setPersisted(true);
      const refresh = await fetch(
        `/api/agents/submissions?agentId=${encodeURIComponent(agent.id)}`
      );
      if (refresh.ok) {
        const payload = await refresh.json();
        setSubmissions(payload.submissions ?? []);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Batch run failed.");
    } finally {
      setBatchLoading(false);
    }
  }

  async function copyDraft() {
    if (!result?.draft) return;
    await navigator.clipboard.writeText(result.draft);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="space-y-6">
      {databaseConnected ? (
        <div className="rounded-2xl border border-border/80 bg-white p-4 sm:p-5">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Inbox className="h-4 w-4 text-primary" />
              <p className="text-sm font-semibold text-midnight">
                Live submissions
              </p>
              <Badge variant="success">Database</Badge>
            </div>
            <Button
              type="button"
              size="sm"
              variant="outline"
              disabled={batchLoading}
              onClick={runAllSeeded}
            >
              {batchLoading ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  Running all…
                </>
              ) : (
                "Run all seeded submissions"
              )}
            </Button>
          </div>
          {submissions.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No submissions yet. Seed the database or paste notes below.
            </p>
          ) : (
            <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
              {submissions.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => selectSubmission(item)}
                  className={`rounded-xl border px-3 py-3 text-left transition-colors ${
                    selectedId === item.id
                      ? "border-primary bg-primary/5"
                      : "border-border/80 hover:border-primary/40"
                  }`}
                >
                  <p className="text-sm font-medium text-midnight">
                    {item.subject}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {item.patientLabel ?? "Clinic queue"} · {item.status}
                  </p>
                </button>
              ))}
            </div>
          )}
        </div>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-4 rounded-2xl border border-border/80 bg-white p-4 sm:p-5">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant={databaseConnected ? "success" : "sample"}>
              {databaseConnected
                ? llmEnabled
                  ? "Live DB · LLM available"
                  : "Live DB · free local mode"
                : llmEnabled
                  ? "LLM mode available"
                  : "Free local mode"}
            </Badge>
            <p className="text-xs text-muted-foreground">
              Human review required before contacting patients.
            </p>
          </div>
          <Textarea
            value={input}
            onChange={(event) => {
              setInput(event.target.value);
              setSelectedId(null);
            }}
            rows={14}
            placeholder={agent.placeholder}
            className="min-h-[280px] font-mono text-xs sm:text-sm"
          />
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              onClick={onRun}
              disabled={loading}
              className="w-full touch-manipulation sm:w-auto"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Running…
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Run agent
                </>
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full touch-manipulation sm:w-auto"
              onClick={() => {
                setSelectedId(null);
                setInput(agent.sampleInput);
              }}
            >
              Load sample
            </Button>
          </div>
          {error ? (
            <p className="rounded-xl border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
              {error}
            </p>
          ) : null}
        </div>

        <div className="space-y-4 rounded-2xl border border-border/80 bg-off-white/70 p-4 sm:p-5">
          {!result ? (
            <div className="flex h-full min-h-[280px] items-center justify-center text-center">
              <p className="max-w-xs text-sm text-muted-foreground">
                Select a live submission or paste notes, then run the agent to
                save findings and drafts to the database.
              </p>
            </div>
          ) : (
            <>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-lg font-semibold text-midnight">
                  {result.title}
                </h2>
                <Badge variant={result.mode === "llm" ? "default" : "secondary"}>
                  {result.mode === "llm" ? "LLM" : "Local"}
                </Badge>
                {persisted ? <Badge variant="success">Saved to DB</Badge> : null}
              </div>
              <p className="text-sm leading-relaxed text-midnight/85">
                {result.summary}
              </p>

              <ResultList title="Findings" items={result.findings} />
              {result.missingFields && result.missingFields.length > 0 ? (
                <ResultList title="Missing fields" items={result.missingFields} />
              ) : null}
              <ResultList title="Suggested actions" items={result.actions} />
              <ResultList title="Risk notes" items={result.riskNotes} />

              {result.draft ? (
                <div className="rounded-xl border border-border bg-white p-4">
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-midnight">
                      Draft for review
                    </p>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={copyDraft}
                    >
                      {copied ? (
                        <Check className="h-3.5 w-3.5" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                      Copy
                    </Button>
                  </div>
                  <pre className="whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">
                    {result.draft}
                  </pre>
                </div>
              ) : null}

              <p className="text-xs leading-relaxed text-muted-foreground">
                {result.disclaimer}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function ResultList({ title, items }: { title: string; items: string[] }) {
  if (!items.length) return null;
  return (
    <div>
      <p className="text-sm font-semibold text-midnight">{title}</p>
      <ul className="mt-2 space-y-1.5">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-start gap-2 text-sm text-muted-foreground"
          >
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
