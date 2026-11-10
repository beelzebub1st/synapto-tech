"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Check,
  FileSearch,
  MessageSquareText,
  Phone,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type IndustryId = "b2b" | "commerce" | "services";
type AgentId = "lead" | "reply" | "call";

const industries: Record<IndustryId, { label: string }> = {
  b2b: { label: "B2B" },
  commerce: { label: "Commerce" },
  services: { label: "Services" },
};

const agentsByIndustry: Record<
  IndustryId,
  Record<
    AgentId,
    {
      name: string;
      icon: typeof FileSearch;
      prompt: string;
      draft: string;
    }
  >
> = {
  b2b: {
    lead: {
      name: "Lead completeness",
      icon: FileSearch,
      prompt: "Review Meridian Corp RFQ for missing required fields.",
      draft:
        "Missing: CAD drawing, need-by date, ship-to site. Recommend buyer reminder before sales review.",
    },
    reply: {
      name: "Follow-up drafter",
      icon: MessageSquareText,
      prompt: "Draft a polite chase for the missing drawing.",
      draft:
        "Hi Jordan — to finish your RFQ we still need the CAD drawing. A PDF reply works. Once we have it, we’ll lock pricing and lead time.",
    },
    call: {
      name: "Call concierge",
      icon: Phone,
      prompt: "Caller asks about MOQ and sample pricing.",
      draft:
        "Suggested talk track: confirm use case, explain MOQ tiers, offer sample path, and start an RFQ in the portal. Do not invent lead times.",
    },
  },
  commerce: {
    lead: {
      name: "Order exception review",
      icon: FileSearch,
      prompt: "Flag order #4821 for incomplete shipping details.",
      draft:
        "Missing apartment/suite and preferred delivery window. Draft request before warehouse packs.",
    },
    reply: {
      name: "CX reply drafter",
      icon: MessageSquareText,
      prompt: "Customer asks where their package is.",
      draft:
        "Hi Sam — #4821 shipped yesterday via carrier X. Tracking link + ETA Wed. Offer address change only if not out for delivery.",
    },
    call: {
      name: "Call concierge",
      icon: Phone,
      prompt: "Caller wants a discount on a returned item reorder.",
      draft:
        "Suggested talk track: confirm return status, explain loyalty credit options, never invent a discount outside approved rules.",
    },
  },
  services: {
    lead: {
      name: "Enquiry screener",
      icon: FileSearch,
      prompt: "Score inbound discovery form for fit.",
      draft:
        "Strong fit: budget noted, timeline Q2, decision-maker on form. Flag for partner review. Missing: company size.",
    },
    reply: {
      name: "Proposal follow-up",
      icon: MessageSquareText,
      prompt: "Draft follow-up after proposal sent 4 days ago.",
      draft:
        "Hi Priya — checking if you had questions on the launch sprint scope. Happy to walk the timeline on a short call this week.",
    },
    call: {
      name: "Call concierge",
      icon: Phone,
      prompt: "Prospect asks how retainers work.",
      draft:
        "Suggested talk track: explain engagement models, typical kickoff, what success looks like—no invented pricing.",
    },
  },
};

export function AiDemo() {
  const reduce = useReducedMotion();
  const [industry, setIndustry] = useState<IndustryId>("b2b");
  const [active, setActive] = useState<AgentId>("lead");
  const [phase, setPhase] = useState<"idle" | "thinking" | "ready" | "approved">(
    "idle"
  );

  const agent = agentsByIndustry[industry][active];
  const Icon = agent.icon;

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
            AI agents by industry
          </p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-white">
            Agents that draft and screen — humans keep the pen.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-white/60">
            Lead review, reply drafting, and live call coaching across B2B,
            commerce, and services—with approval queues.
          </p>
        </div>

        <div className="mt-6 flex gap-2 overflow-x-auto pb-1">
          {(Object.keys(industries) as IndustryId[]).map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => {
                setIndustry(id);
                setPhase("idle");
              }}
              className={cn(
                "shrink-0 rounded-full px-3.5 py-2 text-xs font-medium",
                industry === id
                  ? "bg-[#7dd3fc] text-[#0c1a1f]"
                  : "bg-white/10 text-white/70 hover:bg-white/15"
              )}
            >
              {industries[id].label}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-3">
            {(Object.keys(agentsByIndustry[industry]) as AgentId[]).map((id) => {
              const item = agentsByIndustry[industry][id];
              const ItemIcon = item.icon;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => {
                    setActive(id);
                    setPhase("idle");
                  }}
                  className={cn(
                    "flex w-full items-start gap-3 rounded-2xl border p-4 text-left transition",
                    active === id
                      ? "border-[#7dd3fc]/40 bg-[#0c4a6e]/40 text-white"
                      : "border-white/10 bg-white/5 text-white/70 hover:border-white/25"
                  )}
                >
                  <ItemIcon className="mt-0.5 h-4 w-4 shrink-0" />
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="mt-1 text-xs opacity-70">{item.prompt}</p>
                  </div>
                </button>
              );
            })}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/65">
              <p className="inline-flex items-center gap-2 font-medium text-white">
                <ShieldCheck className="h-4 w-4 text-[#7dd3fc]" />
                Guardrails
              </p>
              <p className="mt-2">
                Customer-facing sends require human approval. Agents draft —
                your team decides.
              </p>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-5 sm:p-7">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0c4a6e] text-[#7dd3fc]">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-white/45">
                  {industries[industry].label} · agent run
                </p>
                <p className="font-display text-xl font-semibold text-white">
                  {agent.name}
                </p>
              </div>
            </div>

            <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/70">
              <p className="text-xs uppercase tracking-[0.14em] text-white/40">
                Prompt
              </p>
              <p className="mt-2">{agent.prompt}</p>
            </div>

            <div className="mt-4 flex gap-2">
              <Button
                onClick={run}
                disabled={phase === "thinking"}
                className="touch-manipulation"
              >
                {phase === "thinking" ? "Thinking…" : "Run agent"}
                <Sparkles className="h-4 w-4" />
              </Button>
              {phase === "ready" || phase === "approved" ? (
                <Button
                  variant="outline"
                  className="border-white/20 bg-transparent text-white hover:bg-white/10"
                  onClick={() => setPhase("approved")}
                >
                  Approve draft
                </Button>
              ) : null}
            </div>

            <AnimatePresence mode="wait">
              {phase === "idle" ? (
                <motion.p
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-6 text-sm text-white/45"
                >
                  Run the agent to see a draft ready for human review.
                </motion.p>
              ) : null}
              {phase === "thinking" ? (
                <motion.p
                  key="thinking"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-6 text-sm text-[#7dd3fc]"
                >
                  Screening against your checklist…
                </motion.p>
              ) : null}
              {phase === "ready" || phase === "approved" ? (
                <motion.div
                  key="ready"
                  initial={reduce ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 rounded-2xl border border-[#7dd3fc]/30 bg-[#0c4a6e]/25 p-4"
                >
                  <p className="text-xs uppercase tracking-[0.14em] text-[#7dd3fc]">
                    {phase === "approved" ? "Approved · ready to send" : "Draft output"}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-white/85">
                    {agent.draft}
                  </p>
                  {phase === "approved" ? (
                    <p className="mt-3 inline-flex items-center gap-2 text-sm text-[#5eead4]">
                      <Check className="h-4 w-4" />
                      Logged to audit trail
                    </p>
                  ) : null}
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
