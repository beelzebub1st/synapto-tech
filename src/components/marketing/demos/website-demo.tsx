"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Clock3,
  MapPin,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const pages = ["Home", "Services", "Clinicians", "Visit"] as const;
type Page = (typeof pages)[number];

const services = [
  {
    title: "Longevity assessment",
    blurb: "Baseline panels, clinician review, and a plan you can act on.",
    time: "90 min",
  },
  {
    title: "Metabolic optimisation",
    blurb: "Structured protocols with checkpoints — not vague wellness.",
    time: "Ongoing",
  },
  {
    title: "Recovery programs",
    blurb: "Guided recovery with status your care team can track.",
    time: "6–12 weeks",
  },
];

const clinicians = [
  {
    name: "Dr. Mira Elson",
    role: "Medical Director",
    focus: "Longevity · Metabolic health",
  },
  {
    name: "Dr. James Okonkwo",
    role: "Consulting Physician",
    focus: "Recovery · Performance",
  },
  {
    name: "Sofia Nguyen, NP",
    role: "Care Lead",
    focus: "Intake · Follow-up",
  },
];

export function WebsiteDemo() {
  const reduce = useReducedMotion();
  const [page, setPage] = useState<Page>("Home");
  const [sent, setSent] = useState(false);

  return (
    <div className="flex h-[calc(100dvh-3.5rem)] flex-col bg-[#071216] sm:h-[calc(100dvh-3.5rem)]">
      <div className="mx-auto flex w-full max-w-[1400px] flex-1 flex-col overflow-hidden border-x border-white/5 bg-[#f4f7f6]">
        {/* Browser chrome */}
        <div className="flex items-center gap-3 border-b border-black/5 bg-[#e8eeec] px-3 py-2.5 sm:px-4">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          </div>
          <div className="flex min-w-0 flex-1 items-center rounded-lg bg-white px-3 py-1.5 text-xs text-[#5a6b72] shadow-sm">
            <ShieldCheck className="mr-2 h-3.5 w-3.5 shrink-0 text-primary" />
            <span className="truncate">northsidelongevity.clinic</span>
          </div>
        </div>

        {/* Site nav */}
        <header className="flex items-center justify-between gap-3 border-b border-[#d5e0dd] bg-white/90 px-4 py-3 backdrop-blur sm:px-8">
          <button
            type="button"
            onClick={() => setPage("Home")}
            className="font-display text-lg font-semibold tracking-tight text-[#0c1a1f] sm:text-xl"
          >
            Northside Longevity
          </button>
          <nav className="hidden items-center gap-1 md:flex">
            {pages.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => {
                  setPage(item);
                  setSent(false);
                }}
                className={cn(
                  "rounded-full px-3.5 py-2 text-sm font-medium transition",
                  page === item
                    ? "bg-[#0c1a1f] text-white"
                    : "text-[#5a6b72] hover:text-[#0c1a1f]"
                )}
              >
                {item}
              </button>
            ))}
          </nav>
          <Button
            size="sm"
            className="touch-manipulation"
            onClick={() => {
              setPage("Visit");
              setSent(false);
            }}
          >
            Book visit
          </Button>
        </header>

        <div className="flex gap-1 overflow-x-auto border-b border-[#d5e0dd] bg-white px-3 py-2 md:hidden">
          {pages.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => {
                setPage(item);
                setSent(false);
              }}
              className={cn(
                "shrink-0 rounded-full px-3 py-1.5 text-xs font-medium",
                page === item
                  ? "bg-[#0c1a1f] text-white"
                  : "bg-[#e4ecea] text-[#5a6b72]"
              )}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={page + String(sent)}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="min-h-full"
            >
              {page === "Home" ? (
                <HomePage onBook={() => setPage("Visit")} onServices={() => setPage("Services")} />
              ) : null}
              {page === "Services" ? (
                <ServicesPage onBook={() => setPage("Visit")} />
              ) : null}
              {page === "Clinicians" ? (
                <CliniciansPage onBook={() => setPage("Visit")} />
              ) : null}
              {page === "Visit" ? (
                <VisitPage sent={sent} onSend={() => setSent(true)} />
              ) : null}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function HomePage({
  onBook,
  onServices,
}: {
  onBook: () => void;
  onServices: () => void;
}) {
  return (
    <>
      <section className="relative overflow-hidden bg-[#0c1a1f] px-5 py-14 text-white sm:px-10 sm:py-20">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 80% 20%, rgba(15,118,110,0.45), transparent 55%), radial-gradient(ellipse 50% 40% at 10% 90%, rgba(155,181,173,0.2), transparent 50%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.35) 1px, transparent 0)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="relative mx-auto max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#5eead4]">
            Longevity clinic
          </p>
          <h1 className="mt-4 font-display text-[clamp(2.4rem,6vw,4.5rem)] font-semibold leading-[0.95] tracking-tight">
            Precision care that starts before the consult.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg">
            A conversion-led clinic website: clinical trust first, then a clear
            path to book — designed for high-intent patients, not retail templates.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" onClick={onBook} className="touch-manipulation">
              Request a consult
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={onServices}
              className="border-white/25 bg-transparent text-white touch-manipulation hover:bg-white/10"
            >
              Explore services
            </Button>
          </div>
        </div>
      </section>

      <section className="grid gap-px bg-[#d5e0dd] sm:grid-cols-3">
        {[
          { icon: ShieldCheck, label: "Clinician-led protocols" },
          { icon: MapPin, label: "On-site + remote visits" },
          { icon: Clock3, label: "Same-week consults" },
        ].map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-3 bg-white px-5 py-5 text-sm font-medium text-[#0c1a1f]"
          >
            <item.icon className="h-4 w-4 text-primary" />
            {item.label}
          </div>
        ))}
      </section>

      <section className="px-5 py-12 sm:px-10 sm:py-16">
        <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
              Why patients convert
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-[#0c1a1f]">
              Trust architecture, not stock photography fluff.
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              "Clear service journeys with clinical language",
              "Provider credibility above the fold",
              "Enquiry forms that feel private and precise",
              "Mobile performance that doesn’t leak trust",
            ].map((line) => (
              <div
                key={line}
                className="flex gap-2.5 border-t border-primary/25 pt-4 text-sm text-[#12252c]"
              >
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                {line}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[#d5e0dd] bg-white px-5 py-12 sm:px-10">
        <div className="mx-auto flex max-w-5xl flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-1 text-primary">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <p className="mt-3 max-w-lg font-display text-2xl font-semibold text-[#0c1a1f]">
              “Finally a clinic site that feels as precise as the care.”
            </p>
            <p className="mt-2 text-sm text-[#5a6b72]">
              Patient review · Longevity assessment
            </p>
          </div>
          <Button onClick={onBook} className="touch-manipulation">
            Start your enquiry
          </Button>
        </div>
      </section>
    </>
  );
}

function ServicesPage({ onBook }: { onBook: () => void }) {
  return (
    <section className="px-5 py-10 sm:px-10 sm:py-14">
      <div className="mx-auto max-w-4xl">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
          Services
        </p>
        <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-[#0c1a1f]">
          Treatment journeys built for clarity.
        </h2>
        <div className="mt-10 space-y-4">
          {services.map((item) => (
            <button
              key={item.title}
              type="button"
              onClick={onBook}
              className="group flex w-full flex-col gap-3 rounded-3xl border border-[#d5e0dd] bg-white p-5 text-left transition hover:border-primary/40 hover:shadow-[0_20px_50px_rgba(12,26,31,0.06)] sm:flex-row sm:items-center sm:justify-between sm:p-6"
            >
              <div>
                <p className="font-display text-2xl font-semibold text-[#0c1a1f]">
                  {item.title}
                </p>
                <p className="mt-1 text-sm text-[#5a6b72]">{item.blurb}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs font-medium uppercase tracking-[0.14em] text-primary">
                  {item.time}
                </span>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                  Enquire
                  <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function CliniciansPage({ onBook }: { onBook: () => void }) {
  return (
    <section className="px-5 py-10 sm:px-10 sm:py-14">
      <div className="mx-auto max-w-5xl">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
          Clinicians
        </p>
        <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-[#0c1a1f]">
          People patients trust before they book.
        </h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {clinicians.map((person, index) => (
            <article
              key={person.name}
              className="overflow-hidden rounded-3xl border border-[#d5e0dd] bg-white"
            >
              <div
                className="h-36"
                style={{
                  background: `linear-gradient(145deg, ${
                    index === 0
                      ? "#0f766e"
                      : index === 1
                        ? "#0c1a1f"
                        : "#134e4a"
                  }, #071216)`,
                }}
              />
              <div className="p-5">
                <p className="font-display text-xl font-semibold text-[#0c1a1f]">
                  {person.name}
                </p>
                <p className="mt-1 text-sm text-primary">{person.role}</p>
                <p className="mt-2 text-sm text-[#5a6b72]">{person.focus}</p>
              </div>
            </article>
          ))}
        </div>
        <Button onClick={onBook} className="mt-8 touch-manipulation">
          Book with the team
        </Button>
      </div>
    </section>
  );
}

function VisitPage({
  sent,
  onSend,
}: {
  sent: boolean;
  onSend: () => void;
}) {
  if (sent) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center px-5 py-16">
        <div className="max-w-md rounded-3xl border border-primary/20 bg-white p-8 text-center shadow-[0_24px_60px_rgba(12,26,31,0.08)]">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Sparkles className="h-5 w-5" />
          </div>
          <h3 className="mt-4 font-display text-2xl font-semibold text-[#0c1a1f]">
            Enquiry received
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-[#5a6b72]">
            In production this routes to your team and optional AI follow-up —
            with humans approving anything patient-facing.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="px-5 py-10 sm:px-10 sm:py-14">
      <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
            Request a visit
          </p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-[#0c1a1f]">
            Tell us what you need. We’ll prepare the right consult.
          </h2>
          <ul className="mt-6 space-y-3 text-sm text-[#5a6b72]">
            {[
              "Private form — clinical tone, not retail checkout",
              "Routes into Clinic OS intake queue",
              "Optional agent completeness check before staff follow up",
            ].map((line) => (
              <li key={line} className="flex gap-2.5">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                {line}
              </li>
            ))}
          </ul>
        </div>
        <form
          className="space-y-3 rounded-3xl border border-[#d5e0dd] bg-white p-5 shadow-[0_20px_50px_rgba(12,26,31,0.05)] sm:p-7"
          onSubmit={(e) => {
            e.preventDefault();
            onSend();
          }}
        >
          <Input placeholder="Full name" required className="h-12" />
          <Input type="email" placeholder="Email" required className="h-12" />
          <Input placeholder="Phone (optional)" className="h-12" />
          <select className="flex h-12 w-full rounded-xl border border-input bg-white px-3 text-sm">
            <option>Longevity assessment</option>
            <option>Metabolic optimisation</option>
            <option>Recovery program</option>
          </select>
          <textarea
            className="min-h-28 w-full rounded-xl border border-input bg-white px-3 py-3 text-sm"
            placeholder="Anything we should prepare?"
          />
          <Button type="submit" size="lg" className="w-full touch-manipulation">
            Submit enquiry
            <ArrowRight className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </section>
  );
}
