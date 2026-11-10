"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  Bell,
  Check,
  Clock3,
  GitBranch,
  Mail,
  Shield,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const recipes = [
  {
    id: "intake",
    name: "Incomplete intake chase",
    trigger: "Packet incomplete > 24h",
    outcome: "Remind patient → escalate to desk",
  },
  {
    id: "followup",
    name: "Post-visit follow-up",
    trigger: "Consult marked complete",
    outcome: "Care check-in sequence (3 days)",
  },
  {
    id: "no-show",
    name: "No-show recovery",
    trigger: "Missed appointment",
    outcome: "Reschedule offer + waitlist",
  },
] as const;

export function AutomationsDemo() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<(typeof recipes)[number]["id"]>("intake");
  const [running, setRunning] = useState(false);
  const [step, setStep] = useState(0);

  const flow =
    active === "intake"
      ? [
          { icon: Zap, label: "Trigger", detail: "Intake incomplete for 24 hours" },
          { icon: Mail, label: "Message", detail: "Send patient reminder (approved template)" },
          { icon: Clock3, label: "Wait", detail: "Wait 48 hours" },
          { icon: Bell, label: "Escalate", detail: "Notify front desk if still incomplete" },
          { icon: Shield, label: "Human gate", detail: "Staff can pause or rewrite anytime" },
        ]
      : active === "followup"
        ? [
            { icon: Zap, label: "Trigger", detail: "Visit completed in Clinic OS" },
            { icon: Mail, label: "Day 1", detail: "Thank-you + care tips" },
            { icon: Clock3, label: "Day 3", detail: "Symptom / progress check-in" },
            { icon: GitBranch, label: "Branch", detail: "If flagged → clinician queue" },
            { icon: Shield, label: "Human gate", detail: "Clinical replies stay human-approved" },
          ]
        : [
            { icon: Zap, label: "Trigger", detail: "Appointment marked no-show" },
            { icon: Mail, label: "Offer", detail: "Same-week reschedule link" },
            { icon: GitBranch, label: "Branch", detail: "Accepted → book · Declined → waitlist" },
            { icon: Bell, label: "Notify", detail: "Update coordinator dashboard" },
            { icon: Shield, label: "Human gate", detail: "No auto clinical advice" },
          ];

  async function runDemo() {
    setRunning(true);
    setStep(0);
    for (let i = 0; i < flow.length; i += 1) {
      setStep(i);
      await new Promise((r) => setTimeout(r, reduce ? 120 : 450));
    }
    setRunning(false);
  }

  return (
    <div className="min-h-[calc(100dvh-3.5rem)] bg-[linear-gradient(180deg,#071216_0%,#0c1a1f_40%,#10262c_100%)] px-4 py-6 sm:px-8 sm:py-8">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.9fr_1.2fr]">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
            Automations
          </p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-white">
            Workflows that keep packets moving.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-white/60">
            Triggers, waits, branches, and human approval gates — so clinics
            automate chase-work without losing clinical control.
          </p>
          <div className="mt-6 space-y-3">
            {recipes.map((recipe) => (
              <button
                key={recipe.id}
                type="button"
                onClick={() => {
                  setActive(recipe.id);
                  setStep(0);
                  setRunning(false);
                }}
                className={cn(
                  "w-full rounded-2xl border p-4 text-left transition",
                  active === recipe.id
                    ? "border-primary bg-primary/15 text-white"
                    : "border-white/10 bg-white/5 text-white/75 hover:border-white/25"
                )}
              >
                <p className="font-semibold">{recipe.name}</p>
                <p className="mt-1 text-xs opacity-70">{recipe.trigger}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur sm:p-7">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-primary">
                Live flow
              </p>
              <p className="mt-1 font-display text-2xl font-semibold text-white">
                {recipes.find((r) => r.id === active)?.name}
              </p>
            </div>
            <Button
              onClick={() => void runDemo()}
              disabled={running}
              className="touch-manipulation"
            >
              {running ? "Running…" : "Run flow"}
            </Button>
          </div>

          <div className="mt-8 space-y-3">
            {flow.map((node, index) => {
              const lit = running ? index <= step : index === 0;
              return (
                <motion.div
                  key={node.label + active}
                  initial={reduce ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.04 }}
                >
                  <div
                    className={cn(
                      "flex items-start gap-3 rounded-2xl border px-4 py-4 transition",
                      lit
                        ? "border-primary/50 bg-primary/10"
                        : "border-white/10 bg-white/[0.03]"
                    )}
                  >
                    <div
                      className={cn(
                        "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                        lit ? "bg-primary text-white" : "bg-white/10 text-white/50"
                      )}
                    >
                      {running && index < step ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <node.icon className="h-4 w-4" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">
                        {node.label}
                      </p>
                      <p className="mt-1 text-sm text-white/55">{node.detail}</p>
                    </div>
                  </div>
                  {index < flow.length - 1 ? (
                    <div className="flex justify-center py-1 text-white/25">
                      <ArrowDown className="h-4 w-4" />
                    </div>
                  ) : null}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
