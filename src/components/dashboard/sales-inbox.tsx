"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

type Overview = {
  mode: string;
  bookings: Array<Record<string, unknown>>;
  quizzes: Array<Record<string, unknown>>;
  deposits: Array<Record<string, unknown>>;
  proposals: Array<Record<string, unknown>>;
};

function Panel({
  title,
  empty,
  children,
}: {
  title: string;
  empty: boolean;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-border/80 bg-white p-5">
      <h2 className="text-sm font-semibold text-midnight">{title}</h2>
      {empty ? (
        <p className="mt-3 text-sm text-muted-foreground">Nothing yet.</p>
      ) : (
        <div className="mt-3 space-y-2">{children}</div>
      )}
    </section>
  );
}

export function SalesInbox() {
  const [data, setData] = useState<Overview | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void (async () => {
      try {
        const res = await fetch("/api/sales/overview");
        const json = await res.json();
        if (!res.ok) throw new Error(json.error ?? "Failed to load.");
        setData(json);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load.");
      }
    })();
  }, []);

  if (error) {
    return <p className="text-sm text-destructive">{error}</p>;
  }

  if (!data) {
    return (
      <p className="flex items-center gap-2 text-sm text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" />
        Loading sales pipeline…
      </p>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Source: {data.mode === "database" ? "Postgres" : "local / no DB"}
      </p>
      <div className="grid gap-4 xl:grid-cols-2">
        <Panel title="Strategy bookings" empty={!data.bookings.length}>
          {data.bookings.map((row) => (
            <div
              key={String(row.id)}
              className="rounded-xl border border-border/70 px-3 py-3 text-sm"
            >
              <p className="font-medium text-midnight">
                {String(row.fullName)} · {String(row.clinicName)}
              </p>
              <p className="text-muted-foreground">{String(row.email)}</p>
              <p className="mt-1 text-xs text-primary">
                {row.slotStart
                  ? new Date(String(row.slotStart)).toLocaleString()
                  : "—"}{" "}
                · {String(row.packageInterest || "unspecified")}
              </p>
            </div>
          ))}
        </Panel>
        <Panel title="Quiz results" empty={!data.quizzes.length}>
          {data.quizzes.map((row) => (
            <div
              key={String(row.id)}
              className="rounded-xl border border-border/70 px-3 py-3 text-sm"
            >
              <p className="font-medium text-midnight">
                {String(row.recommendedPackage)}
              </p>
              <p className="text-muted-foreground">
                {String(row.fullName || "Anonymous")} ·{" "}
                {String(row.email || "no email")}
              </p>
            </div>
          ))}
        </Panel>
        <Panel title="Deposits / reserves" empty={!data.deposits.length}>
          {data.deposits.map((row) => (
            <div
              key={String(row.id)}
              className="rounded-xl border border-border/70 px-3 py-3 text-sm"
            >
              <p className="font-medium text-midnight">
                {String(row.packageKey)} · €
                {(Number(row.amountCents) / 100).toLocaleString()}
              </p>
              <p className="text-muted-foreground">
                {String(row.fullName)} · {String(row.clinicName)}
              </p>
              <p className="mt-1 text-xs text-primary">{String(row.status)}</p>
            </div>
          ))}
        </Panel>
        <Panel title="Proposal requests" empty={!data.proposals.length}>
          {data.proposals.map((row) => (
            <div
              key={String(row.id)}
              className="rounded-xl border border-border/70 px-3 py-3 text-sm"
            >
              <p className="font-medium text-midnight">
                {String(row.packageKey)} · {String(row.clinicName)}
              </p>
              <p className="text-muted-foreground">{String(row.email)}</p>
            </div>
          ))}
        </Panel>
      </div>
    </div>
  );
}
