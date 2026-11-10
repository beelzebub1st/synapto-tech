"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PACKAGE_COPY, type PackageKey } from "@/lib/quiz/recommend";

export function DepositForm({ defaultPackage }: { defaultPackage?: PackageKey }) {
  const searchParams = useSearchParams();
  const initial =
    (searchParams.get("package") as PackageKey | null) ||
    defaultPackage ||
    "product";
  const [packageKey, setPackageKey] = useState<PackageKey>(
    PACKAGE_COPY[initial] ? initial : "product"
  );
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    clinicName: "",
    phone: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<{
    amount: string;
    email: string;
    packageName: string;
  } | null>(null);

  const pkg = PACKAGE_COPY[packageKey];
  const quizResultId = searchParams.get("quiz") || undefined;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/deposits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          packageKey,
          ...form,
          quizResultId:
            quizResultId &&
            /^[0-9a-f-]{36}$/i.test(quizResultId)
              ? quizResultId
              : undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Could not reserve.");
      setDone({
        amount: pkg.depositLabel,
        email: form.email,
        packageName: pkg.name,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not reserve.");
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div className="rounded-3xl border border-primary/20 bg-white p-6 text-center sm:p-8">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Check className="h-5 w-5" />
        </div>
        <h3 className="mt-4 font-display text-2xl font-semibold text-midnight">
          Project start reserved
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          {done.packageName} · {done.amount}
          <br />
          Confirmation and payment details will go to {done.email}
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button asChild>
            <Link href={`/book-a-demo?package=${packageKey}`}>
              Also book kickoff call
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/demos">Explore demos</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="rounded-3xl border border-border/80 bg-white p-5 sm:p-6">
        <p className="text-sm font-semibold text-midnight">Choose package</p>
        <div className="mt-4 grid gap-3">
          {(Object.keys(PACKAGE_COPY) as PackageKey[]).map((key) => {
            const item = PACKAGE_COPY[key];
            const active = key === packageKey;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setPackageKey(key)}
                className={`rounded-2xl border px-4 py-4 text-left transition ${
                  active
                    ? "border-primary bg-primary/5"
                    : "border-border/80 hover:border-primary/30"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="font-semibold text-midnight">{item.name}</p>
                  <p className="text-sm font-medium text-primary">
                    {item.depositLabel}
                  </p>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {item.tagline}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      <div className="rounded-3xl border border-border/80 bg-white p-5 sm:p-6">
        <p className="text-sm font-semibold text-midnight">Your details</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="dep-name">Full name</Label>
            <Input
              id="dep-name"
              required
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dep-email">Work email</Label>
            <Input
              id="dep-email"
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dep-clinic">Business / brand</Label>
            <Input
              id="dep-clinic"
              required
              value={form.clinicName}
              onChange={(e) => setForm({ ...form, clinicName: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dep-phone">Phone (optional)</Label>
            <Input
              id="dep-phone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>
        </div>
        <div className="mt-4 space-y-2">
          <Label htmlFor="dep-notes">Kickoff notes</Label>
          <Textarea
            id="dep-notes"
            rows={3}
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            placeholder="Timeline, locations, must-haves…"
          />
        </div>
      </div>

      {error ? <p className="text-sm text-destructive">{error}</p> : null}

      <Button
        type="submit"
        size="lg"
        className="w-full touch-manipulation"
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Reserving…
          </>
        ) : (
          <>
            Reserve with {pkg.depositLabel}
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </Button>
      <p className="text-center text-xs text-muted-foreground">
        Local reservation now — our team confirms payment details by email
        within one business day.
      </p>
    </form>
  );
}
