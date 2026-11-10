"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Ban,
  Building2,
  CalendarDays,
  Check,
  Compass,
  Globe2,
  LayoutDashboard,
  Loader2,
  RefreshCw,
  ShoppingCart,
  Smartphone,
  Sparkles,
  Target,
  Timer,
  TrendingUp,
  User,
  Users,
  Zap,
} from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  PACKAGE_COPY,
  QUIZ_STEPS,
  type PackageKey,
  type QuizAnswers,
} from "@/lib/quiz/recommend";
import { cn } from "@/lib/utils";

type Answers = Partial<QuizAnswers>;
type Phase = "intro" | "questions" | "contact" | "revealing" | "result";

const ICONS = {
  globe: Globe2,
  smartphone: Smartphone,
  layout: LayoutDashboard,
  compass: Compass,
  spark: Sparkles,
  refresh: RefreshCw,
  growth: TrendingUp,
  user: User,
  users: Users,
  building: Building2,
  zap: Zap,
  calendar: CalendarDays,
  target: Target,
  cart: ShoppingCart,
  clock: Timer,
  ban: Ban,
} as const;

export function QuizFlow() {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("intro");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [contact, setContact] = useState({
    fullName: "",
    email: "",
    clinicName: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    id: string | null;
    recommended: PackageKey;
    summary: (typeof PACKAGE_COPY)[PackageKey];
    matchPercent: number;
    insight: string;
    scores: Record<PackageKey, number>;
  } | null>(null);

  const current = QUIZ_STEPS[step];
  const totalSteps = QUIZ_STEPS.length + 1;
  const progressIndex =
    phase === "intro"
      ? 0
      : phase === "questions"
        ? step + 1
        : phase === "contact" || phase === "revealing"
          ? QUIZ_STEPS.length + 1
          : totalSteps;
  const progress = Math.round((progressIndex / totalSteps) * 100);

  function choose(value: string) {
    if (!current) return;
    const next = { ...answers, [current.id]: value } as Answers;
    setAnswers(next);
    window.setTimeout(() => {
      if (step < QUIZ_STEPS.length - 1) {
        setStep(step + 1);
      } else {
        setPhase("contact");
      }
    }, reduce ? 0 : 180);
  }

  async function submitContact(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setPhase("revealing");
    try {
      const res = await fetch("/api/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers, ...contact }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Could not score quiz.");
      await new Promise((r) => setTimeout(r, reduce ? 200 : 1100));
      setResult({
        id: data.id,
        recommended: data.recommended,
        summary: data.summary,
        matchPercent: data.matchPercent ?? 72,
        insight: data.insight ?? data.summary.tagline,
        scores: data.scores ?? { presence: 1, product: 1, system: 1 },
      });
      setPhase("result");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not score quiz.");
      setPhase("contact");
    } finally {
      setLoading(false);
    }
  }

  const scoreMax = useMemo(() => {
    if (!result) return 1;
    return Math.max(...Object.values(result.scores), 1);
  }, [result]);

  return (
    <div className="relative min-h-[100dvh] overflow-hidden bg-ink text-white">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 45% at 15% 0%, rgba(15,118,110,0.38), transparent 55%), radial-gradient(ellipse 55% 40% at 90% 15%, rgba(12,74,110,0.28), transparent 50%), radial-gradient(ellipse 50% 35% at 50% 100%, rgba(15,118,110,0.18), transparent 55%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.35) 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />

      <header className="relative z-20 flex items-center justify-between px-4 py-4 sm:px-8">
        <Logo variant="dark" />
        <div className="flex items-center gap-2">
          <Button
            asChild
            variant="outline"
            size="sm"
            className="border-white/20 bg-transparent text-white hover:bg-white/10"
          >
            <Link href="/">Exit</Link>
          </Button>
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link href="/book-a-demo">Book a call</Link>
          </Button>
        </div>
      </header>

      {phase !== "intro" && phase !== "result" ? (
        <div className="relative z-20 mx-auto w-full max-w-3xl px-4 sm:px-6">
          <div className="mb-2 flex items-center justify-between text-[11px] font-medium uppercase tracking-[0.16em] text-white/45">
            <span>
              {phase === "questions"
                ? `Question ${step + 1} of ${QUIZ_STEPS.length}`
                : phase === "revealing"
                  ? "Scoring your path"
                  : "Almost there"}
            </span>
            <span>{progress}%</span>
          </div>
          <div className="h-1 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full rounded-full bg-primary"
              initial={false}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>
      ) : null}

      <div className="relative z-10 mx-auto flex min-h-[calc(100dvh-4.5rem)] w-full max-w-4xl flex-col px-4 pb-10 pt-6 sm:px-8 sm:pt-10">
        <AnimatePresence mode="wait">
          {phase === "intro" ? (
            <motion.div
              key="intro"
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="my-auto"
            >
              <p className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-primary">
                <Sparkles className="h-3.5 w-3.5" />
                2-minute pathfinder
              </p>
              <h1 className="mt-5 max-w-3xl font-display text-[clamp(2.6rem,8vw,5rem)] font-semibold leading-[0.94] tracking-tight text-white">
                Stop guessing your digital stack.
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
                Answer five sharp questions. We’ll score Presence, Product, or
                System — then show your first win, deposit to reserve, and next
                step.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button
                  size="lg"
                  className="h-12 touch-manipulation px-8 text-base"
                  onClick={() => {
                    setPhase("questions");
                    setStep(0);
                  }}
                >
                  Start the quiz
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Link
                  href="/demos"
                  className="text-sm font-medium text-white/55 underline-offset-4 hover:text-white hover:underline"
                >
                  Prefer demos first?
                </Link>
              </div>
              <div className="mt-10 grid gap-3 sm:grid-cols-3">
                {[
                  { label: "5 questions", detail: "No fluff, no pitch deck" },
                  { label: "Scored match", detail: "Presence · Product · System" },
                  { label: "Clear next step", detail: "Call or reserve start" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4"
                  >
                    <p className="text-sm font-semibold text-white">
                      {item.label}
                    </p>
                    <p className="mt-1 text-xs text-white/45">{item.detail}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : null}

          {phase === "questions" && current ? (
            <motion.div
              key={`q-${current.id}`}
              initial={reduce ? false : { opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduce ? undefined : { opacity: 0, x: -18 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="my-auto w-full py-4"
            >
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
                {current.hook}
              </p>
              <h2 className="mt-3 max-w-3xl font-display text-[clamp(1.85rem,4.5vw,3.25rem)] font-semibold leading-[1.05] tracking-tight text-white">
                {current.question}
              </h2>
              <p className="mt-3 max-w-xl text-sm text-white/50 sm:text-base">
                {current.support}
              </p>

              <div className="mt-8 grid gap-3">
                {current.options.map((option, index) => {
                  const Icon = ICONS[option.icon as keyof typeof ICONS] ?? Compass;
                  const selected =
                    answers[current.id as keyof QuizAnswers] === option.value;
                  return (
                    <motion.button
                      key={option.value}
                      type="button"
                      initial={reduce ? false : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.04 * index, duration: 0.28 }}
                      onClick={() => choose(option.value)}
                      className={cn(
                        "group flex w-full items-start gap-4 rounded-[1.35rem] border px-4 py-4 text-left transition touch-manipulation sm:px-5 sm:py-5",
                        selected
                          ? "border-primary bg-primary/15 shadow-[0_0_0_1px_rgba(15,118,110,0.35)]"
                          : "border-white/10 bg-white/[0.03] hover:border-primary/40 hover:bg-white/[0.06]"
                      )}
                    >
                      <span
                        className={cn(
                          "mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl transition",
                          selected
                            ? "bg-primary text-white"
                            : "bg-white/10 text-primary group-hover:bg-primary/20"
                        )}
                      >
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-base font-semibold text-white sm:text-lg">
                          {option.label}
                        </span>
                        <span className="mt-1 block text-sm leading-relaxed text-white/50">
                          {option.detail}
                        </span>
                      </span>
                      <ArrowRight
                        className={cn(
                          "mt-1 h-4 w-4 shrink-0 transition",
                          selected
                            ? "text-primary"
                            : "text-white/20 group-hover:text-primary group-hover:translate-x-0.5"
                        )}
                      />
                    </motion.button>
                  );
                })}
              </div>

              <div className="mt-6 flex items-center justify-between">
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 text-sm text-white/45 hover:text-white"
                  onClick={() => {
                    if (step > 0) setStep(step - 1);
                    else setPhase("intro");
                  }}
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Back
                </button>
                <Link
                  href="/book-a-demo"
                  className="text-sm text-white/35 hover:text-white/70"
                >
                  Skip to call
                </Link>
              </div>
            </motion.div>
          ) : null}

          {phase === "contact" ? (
            <motion.div
              key="contact"
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="my-auto w-full max-w-xl py-4"
            >
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
                Unlock your match
              </p>
              <h2 className="mt-3 font-display text-[clamp(1.9rem,4vw,3rem)] font-semibold tracking-tight text-white">
                Where should we send your recommendation?
              </h2>
              <p className="mt-3 text-sm text-white/50">
                No spam. You’ll get the scored path, first win, and how to
                reserve start.
              </p>
              <form onSubmit={submitContact} className="mt-8 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="quiz-name" className="text-white/70">
                    Full name
                  </Label>
                  <Input
                    id="quiz-name"
                    required
                    value={contact.fullName}
                    onChange={(e) =>
                      setContact({ ...contact, fullName: e.target.value })
                    }
                    className="h-12 border-white/15 bg-white/5 text-white placeholder:text-white/30"
                    placeholder="Alex Mercer"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quiz-email" className="text-white/70">
                    Work email
                  </Label>
                  <Input
                    id="quiz-email"
                    type="email"
                    required
                    value={contact.email}
                    onChange={(e) =>
                      setContact({ ...contact, email: e.target.value })
                    }
                    className="h-12 border-white/15 bg-white/5 text-white placeholder:text-white/30"
                    placeholder="you@company.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quiz-clinic" className="text-white/70">
                    Business / brand
                  </Label>
                  <Input
                    id="quiz-clinic"
                    required
                    value={contact.clinicName}
                    onChange={(e) =>
                      setContact({ ...contact, clinicName: e.target.value })
                    }
                    className="h-12 border-white/15 bg-white/5 text-white placeholder:text-white/30"
                    placeholder="Acme Studio"
                  />
                </div>
                {error ? (
                  <p className="text-sm text-red-300">{error}</p>
                ) : null}
                <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                  <Button
                    type="button"
                    variant="outline"
                    className="border-white/20 bg-transparent text-white hover:bg-white/10"
                    onClick={() => {
                      setPhase("questions");
                      setStep(QUIZ_STEPS.length - 1);
                    }}
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    size="lg"
                    className="flex-1 touch-manipulation"
                    disabled={loading}
                  >
                    Reveal my path
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </form>
            </motion.div>
          ) : null}

          {phase === "revealing" ? (
            <motion.div
              key="revealing"
              initial={reduce ? false : { opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduce ? undefined : { opacity: 0 }}
              className="my-auto flex flex-col items-center py-16 text-center"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-primary/40 bg-primary/15 text-primary">
                <Loader2 className="h-7 w-7 animate-spin" />
              </div>
              <h2 className="mt-6 font-display text-3xl font-semibold text-white sm:text-4xl">
                Scoring your digital path…
              </h2>
              <p className="mt-3 max-w-md text-sm text-white/50">
                Matching urgency, team shape, and product need against Presence,
                Product, and System.
              </p>
            </motion.div>
          ) : null}

          {phase === "result" && result ? (
            <motion.div
              key="result"
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="my-auto w-full py-4"
            >
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
                Your match · {result.matchPercent}% fit
              </p>
              <h2 className="mt-3 font-display text-[clamp(2.4rem,6vw,4.25rem)] font-semibold leading-[0.95] tracking-tight text-white">
                {result.summary.name}
              </h2>
              <p className="mt-2 text-sm font-medium text-[#5eead4]">
                {result.summary.vibe}
              </p>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/65">
                {result.insight}
              </p>

              <div className="mt-8 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
                <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5 sm:p-6">
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-white/40">
                    Score breakdown
                  </p>
                  <div className="mt-5 space-y-4">
                    {(Object.keys(PACKAGE_COPY) as PackageKey[]).map((key) => {
                      const pct = Math.round(
                        (result.scores[key] / scoreMax) * 100
                      );
                      const active = key === result.recommended;
                      return (
                        <div key={key}>
                          <div className="mb-1.5 flex items-center justify-between text-sm">
                            <span
                              className={
                                active ? "font-semibold text-white" : "text-white/55"
                              }
                            >
                              {PACKAGE_COPY[key].name}
                            </span>
                            <span className="text-white/40">
                              {result.scores[key]}
                            </span>
                          </div>
                          <div className="h-2 overflow-hidden rounded-full bg-white/10">
                            <motion.div
                              className={cn(
                                "h-full rounded-full",
                                active ? "bg-primary" : "bg-white/25"
                              )}
                              initial={{ width: 0 }}
                              animate={{ width: `${pct}%` }}
                              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-6 border-t border-white/10 pt-5">
                    <p className="text-xs font-medium uppercase tracking-[0.16em] text-primary">
                      First win
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-white/75">
                      {result.summary.firstWin}
                    </p>
                  </div>
                </div>

                <div className="rounded-[1.5rem] border border-primary/30 bg-primary/10 p-5 sm:p-6">
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#5eead4]">
                    What’s included
                  </p>
                  <ul className="mt-4 space-y-3">
                    {result.summary.bullets.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-sm text-white"
                      >
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-5 text-sm text-white/60">
                    Reserve start with{" "}
                    <span className="font-semibold text-white">
                      {result.summary.depositLabel}
                    </span>
                  </p>
                  <div className="mt-5 flex flex-col gap-3">
                    <Button asChild size="lg" className="w-full touch-manipulation">
                      <Link
                        href={`/reserve?package=${result.recommended}${
                          result.id ? `&quiz=${result.id}` : ""
                        }`}
                      >
                        Reserve project start
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className="w-full border-white/20 bg-transparent text-white touch-manipulation hover:bg-white/10"
                    >
                      <Link
                        href={`/book-a-demo?package=${result.recommended}${
                          result.id ? `&quiz=${result.id}` : ""
                        }`}
                      >
                        Book strategy call
                      </Link>
                    </Button>
                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className="w-full border-white/20 bg-transparent text-white touch-manipulation hover:bg-white/10"
                    >
                      <Link href="/demos">Explore live demos</Link>
                    </Button>
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="mt-8 text-sm text-white/40 underline-offset-4 hover:text-white hover:underline"
                onClick={() => {
                  setResult(null);
                  setAnswers({});
                  setStep(0);
                  setPhase("intro");
                }}
              >
                Retake quiz
              </button>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}
