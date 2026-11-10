"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PACKAGE_COPY, type PackageKey } from "@/lib/quiz/recommend";

export function ProposalForm({
  defaultPackage = "product",
}: {
  defaultPackage?: PackageKey;
}) {
  const [packageKey, setPackageKey] = useState<PackageKey>(defaultPackage);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    clinicName: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [summary, setSummary] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/proposals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ packageKey, ...form }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Could not create proposal.");
      setSummary(data.summary as string);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not create proposal.");
    } finally {
      setLoading(false);
    }
  }

  if (summary) {
    return (
      <div className="rounded-3xl border border-primary/20 bg-white p-6 sm:p-8">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Check className="h-4 w-4" />
        </div>
        <h3 className="mt-4 font-display text-2xl font-semibold text-midnight">
          Proposal outline ready
        </h3>
        <pre className="mt-4 whitespace-pre-wrap rounded-2xl bg-secondary/50 p-4 text-sm text-midnight">
          {summary}
        </pre>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button asChild>
            <Link href={`/reserve?package=${packageKey}`}>
              Reserve this package
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href={`/book-a-demo?package=${packageKey}`}>
              Discuss on a call
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-3xl border border-border/80 bg-white p-6 sm:p-8"
    >
      <p className="text-sm font-semibold text-midnight">Request a proposal outline</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {(Object.keys(PACKAGE_COPY) as PackageKey[]).map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setPackageKey(key)}
            className={`rounded-2xl border px-3 py-3 text-sm font-medium transition ${
              packageKey === key
                ? "border-primary bg-primary/5 text-midnight"
                : "border-border/80 text-muted-foreground"
            }`}
          >
            {PACKAGE_COPY[key].name}
          </button>
        ))}
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="prop-name">Full name</Label>
          <Input
            id="prop-name"
            required
            value={form.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="prop-email">Work email</Label>
          <Input
            id="prop-email"
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="prop-clinic">Clinic / brand</Label>
          <Input
            id="prop-clinic"
            required
            value={form.clinicName}
            onChange={(e) => setForm({ ...form, clinicName: e.target.value })}
          />
        </div>
      </div>
      {error ? <p className="mt-3 text-sm text-destructive">{error}</p> : null}
      <Button type="submit" className="mt-6 w-full" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Generating…
          </>
        ) : (
          <>
            Generate outline
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </Button>
    </form>
  );
}
