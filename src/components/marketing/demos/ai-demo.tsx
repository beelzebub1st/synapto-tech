"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Bot,
  Check,
  FileSearch,
  MessageSquareText,
  Phone,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const agents = [
  {
    id: "intake",
    name: "Intake completeness",
    icon: FileSearch,
    prompt: "Review Alex Mercer packet for missing required fields.",
    draft:
      "Missing: referral letter, medication list confirmation. Recommend patient reminder before clinician review.",
  },
  {
    id: "message",
    name: "Follow-up drafter",
    icon: MessageSquareText,
    prompt: "Draft a polite chase for the missing referral letter.",
    draft:
      "Hi Alex — to finish your longevity packet we still need the referral letter. A photo or PDF reply works. Once we have it, we’ll lock your consult slot.",
  },
  {
    id: "call",
    name: "Call concierge",
    icon: Phone,
    prompt: "Caller asks about assessment pricing and prep.",
    draft:
      "Suggested talk track: explain assessment scope, what to bring, and offer to start the online packet now. Do not invent clinical claims.",
  },
] as const;

export function AiDemo() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<(typeof agents)[number]["id"]>("intake");
  const [phase, setPhase] = useState<"idle" | "thinking" | "ready" | "approved">(
    "idle"
  );

  const agent = agents.find((item) => item.id === active)!;

  async function run() {
    setPhase("thinking");
    await new Promise((r) => setTimeout(r, reduce ? 200 : 900));
    setPhase("ready");
  }

  return (
    <div className="min-h-[calc(100dvh-3.5rem)] bg-[radial-gradient(ellipse_at_top_left,#0c4a6e_0%,#071216_45%,#0c1a1f_100%)] px-4 py-6 sm:px-8 sm:py-8">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#7dd3fc]">
            AI integrations
          </p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-white">
            Agents that draft and screen — humans keep the pen.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-white/60">
            Intake review, patient messaging, and live call coaching with
            clinic-safe guardrails and approval queues.
          </p>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-3">
            {agents.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setActive(item.id);
                  setPhase("idle");
                }}
                className={cn(
                  "flex w-full items-start gap-3 rounded-2xl border p-4 text-left transition",
                  active === item.id
                    ? "border-[#7dd3fc]/40 bg-[#0c4a6e]/40 text-white"
                    : "border-white/10 bg-white/5 text-white/70 hover:border-white/25"
                )}
              >
                <item.icon className="mt-0.5 h-4 w-4 shrink-0" />
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="mt-1 text-xs opacity-70">{item.prompt}</p>
                </div>
              </button>
            ))}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/65">
              <p className="inline-flex items-center gap-2 font-medium text-white">
                <ShieldCheck className="h-4 w-4 text-[#7dd3fc]" />
                Guardrails
              </p>
              <p className="mt-2 text-xs leading-relaxed">
                No unsupervised clinical advice. Patient-facing copy requires
                human approval. Audit trail on every agent action.
              </p>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-white/10 bg-black/30 p-5 backdrop-blur sm:p-7">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0c4a6e] text-[#7dd3fc]">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold text-white">{agent.name}</p>
                <p className="text-xs text-white/50">Synapto agent runtime</p>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-white/40">
                Prompt
              </p>
              <p className="mt-2 text-sm text-white/80">{agent.prompt}</p>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={phase + active}
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 min-h-[180px] rounded-2xl border border-white/10 bg-[#071216] p-4"
              >
                {phase === "idle" ? (
                  <div className="flex h-full flex-col items-start justify-between gap-4">
                    <p className="text-sm text-white/55">
                      Run the agent to generate a draft for staff review.
                    </p>
                    <Button onClick={() => void run()} className="touch-manipulation">
                      <Sparkles className="h-4 w-4" />
                      Run agent
                    </Button>
                  </div>
                ) : null}
                {phase === "thinking" ? (
                  <p className="flex items-center gap-2 text-sm text-[#7dd3fc]">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-[#7dd3fc]" />
                    Screening context and drafting…
                  </p>
                ) : null}
                {phase === "ready" || phase === "approved" ? (
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#7dd3fc]">
                      Draft output
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-white/85">
                      {agent.draft}
                    </p>
                    {phase === "ready" ? (
                      <div className="mt-5 flex flex-wrap gap-2">
                        <Button
                          onClick={() => setPhase("approved")}
                          className="touch-manipulation"
                        >
                          <Check className="h-4 w-4" />
                          Approve
                        </Button>
                        <Button
                          variant="outline"
                          className="border-white/20 bg-transparent text-white hover:bg-white/10"
                          onClick={() => setPhase("idle")}
                        >
                          Discard
                        </Button>
                      </div>
                    ) : (
                      <p className="mt-5 text-sm font-medium text-primary">
                        Approved — queued with audit trail.
                      </p>
                    )}
                  </div>
                ) : null}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
