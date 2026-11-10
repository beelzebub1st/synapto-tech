"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { format, parseISO } from "date-fns";
import { CalendarDays, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PACKAGE_COPY, type PackageKey } from "@/lib/quiz/recommend";

type DayOption = { date: string; label: string };
type SlotOption = { start: string; end: string; label: string };

export function BookingScheduler({
  defaultPackage,
  quizResultId,
}: {
  defaultPackage?: string;
  quizResultId?: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const interest =
    defaultPackage ||
    searchParams.get("package") ||
    searchParams.get("interest") ||
    "";

  const [days, setDays] = useState<DayOption[]>([]);
  const [date, setDate] = useState<string>("");
  const [slots, setSlots] = useState<SlotOption[]>([]);
  const [slotStart, setSlotStart] = useState<string>("");
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<{
    when: string;
    email: string;
  } | null>(null);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    clinicName: "",
    phone: "",
    notes: "",
    packageInterest: interest,
  });

  useEffect(() => {
    void (async () => {
      const res = await fetch("/api/booking/slots");
      const data = await res.json();
      setDays(data.days ?? []);
      if (data.days?.[0]?.date) setDate(data.days[0].date);
    })();
  }, []);

  useEffect(() => {
    if (!date) return;
    setLoadingSlots(true);
    setSlotStart("");
    void (async () => {
      try {
        const res = await fetch(`/api/booking/slots?date=${date}`);
        const data = await res.json();
        setSlots(data.slots ?? []);
      } finally {
        setLoadingSlots(false);
      }
    })();
  }, [date]);

  const selectedLabel = useMemo(() => {
    if (!slotStart) return null;
    return format(parseISO(slotStart), "EEE, MMM d · HH:mm");
  }, [slotStart]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!slotStart) {
      setError("Choose a time slot.");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          slotStart,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          quizResultId: (() => {
            const id =
              quizResultId || searchParams.get("quiz") || undefined;
            return id && /^[0-9a-f-]{36}$/i.test(id) ? id : undefined;
          })(),
          demoInterest: searchParams.get("demo") || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Could not book.");
      setDone({
        when: selectedLabel ?? slotStart,
        email: form.email,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not book.");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="rounded-3xl border border-primary/20 bg-white p-6 text-center sm:p-8">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Check className="h-5 w-5" />
        </div>
        <h3 className="mt-4 font-display text-2xl font-semibold text-midnight">
          Strategy call confirmed
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          {done.when}
          <br />
          Confirmation details will go to {done.email}
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button onClick={() => router.push("/demos")}>Explore live demos</Button>
          <Button variant="outline" onClick={() => router.push("/start")}>
            Retake recommendation quiz
          </Button>
        </div>
      </div>
    );
  }

  const packageKeys = Object.keys(PACKAGE_COPY) as PackageKey[];

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="rounded-3xl border border-border/80 bg-white p-5 sm:p-6">
        <div className="mb-4 flex items-center gap-2">
          <CalendarDays className="h-4 w-4 text-primary" />
          <p className="text-sm font-semibold text-midnight">
            Pick a day and time
          </p>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {days.map((day) => (
            <button
              key={day.date}
              type="button"
              onClick={() => setDate(day.date)}
              className={`shrink-0 rounded-2xl border px-3 py-2 text-left text-sm transition ${
                date === day.date
                  ? "border-primary bg-primary/5 text-midnight"
                  : "border-border/80 text-muted-foreground hover:border-primary/30"
              }`}
            >
              {day.label}
            </button>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4">
          {loadingSlots ? (
            <p className="col-span-full flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" /> Loading times…
            </p>
          ) : slots.length === 0 ? (
            <p className="col-span-full text-sm text-muted-foreground">
              No open slots this day. Choose another date.
            </p>
          ) : (
            slots.map((slot) => (
              <button
                key={slot.start}
                type="button"
                onClick={() => setSlotStart(slot.start)}
                className={`rounded-xl border px-3 py-2 text-sm font-medium transition ${
                  slotStart === slot.start
                    ? "border-primary bg-midnight text-white"
                    : "border-border/80 text-midnight hover:border-primary/40"
                }`}
              >
                {slot.label}
              </button>
            ))
          )}
        </div>
        {selectedLabel ? (
          <p className="mt-3 text-sm text-primary">Selected: {selectedLabel}</p>
        ) : null}
      </div>

      <div className="rounded-3xl border border-border/80 bg-white p-5 sm:p-6">
        <p className="text-sm font-semibold text-midnight">Your details</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full name</Label>
            <Input
              id="fullName"
              required
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Work email</Label>
            <Input
              id="email"
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="clinicName">Clinic / brand</Label>
            <Input
              id="clinicName"
              required
              value={form.clinicName}
              onChange={(e) => setForm({ ...form, clinicName: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone (optional)</Label>
            <Input
              id="phone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>
        </div>
        <div className="mt-4 space-y-2">
          <Label htmlFor="packageInterest">Package interest</Label>
          <select
            id="packageInterest"
            className="flex h-11 w-full rounded-xl border border-input bg-white px-3 text-sm"
            value={form.packageInterest}
            onChange={(e) =>
              setForm({ ...form, packageInterest: e.target.value })
            }
          >
            <option value="">Not sure yet</option>
            {packageKeys.map((key) => (
              <option key={key} value={key}>
                {PACKAGE_COPY[key].name} — {PACKAGE_COPY[key].tagline}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-4 space-y-2">
          <Label htmlFor="notes">What should we prepare?</Label>
          <Textarea
            id="notes"
            rows={3}
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            placeholder="Website redesign, PWA intake, multi-location system…"
          />
        </div>
      </div>

      {error ? <p className="text-sm text-destructive">{error}</p> : null}

      <Button
        type="submit"
        size="lg"
        className="w-full touch-manipulation"
        disabled={submitting}
      >
        {submitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Confirming…
          </>
        ) : (
          "Confirm strategy call"
        )}
      </Button>
    </form>
  );
}
