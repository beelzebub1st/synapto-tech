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

type CategoryId = "sales" | "commerce" | "onboarding" | "support";

const categories: Record<
  CategoryId,
  {
    label: string;
    intro: string;
    recipes: {
      id: string;
      name: string;
      trigger: string;
      steps: { icon: typeof Zap; label: string; detail: string }[];
    }[];
  }
> = {
  sales: {
    label: "Sales",
    intro: "Chase incomplete RFQs and reopen stalled pipeline without sticky notes.",
    recipes: [
      {
        id: "rfq",
        name: "Incomplete RFQ chase",
        trigger: "Required files missing > 24h",
        steps: [
          { icon: Zap, label: "Trigger", detail: "RFQ incomplete for 24 hours" },
          { icon: Mail, label: "Message", detail: "Send buyer reminder (approved template)" },
          { icon: Clock3, label: "Wait", detail: "Wait 48 hours" },
          { icon: Bell, label: "Escalate", detail: "Notify account owner if still incomplete" },
          { icon: Shield, label: "Human gate", detail: "Sales can pause or rewrite anytime" },
        ],
      },
      {
        id: "demo",
        name: "Demo no-show recovery",
        trigger: "Booked demo missed",
        steps: [
          { icon: Zap, label: "Trigger", detail: "Demo marked no-show" },
          { icon: Mail, label: "Offer", detail: "Same-week reschedule link" },
          { icon: GitBranch, label: "Branch", detail: "Accepted → book · Declined → nurture" },
          { icon: Bell, label: "Notify", detail: "Update CRM owner" },
          { icon: Shield, label: "Human gate", detail: "No aggressive auto-messaging" },
        ],
      },
    ],
  },
  commerce: {
    label: "Commerce",
    intro: "Recover carts, confirm orders, and escalate fulfillment exceptions.",
    recipes: [
      {
        id: "cart",
        name: "Abandoned cart recovery",
        trigger: "Cart idle > 2 hours",
        steps: [
          { icon: Zap, label: "Trigger", detail: "Checkout started, not completed" },
          { icon: Mail, label: "Reminder", detail: "Brand-safe cart recovery email" },
          { icon: Clock3, label: "Wait", detail: "Wait 24 hours" },
          { icon: GitBranch, label: "Branch", detail: "Purchased → stop · Else → offer help" },
          { icon: Shield, label: "Human gate", detail: "Discount rules stay approved" },
        ],
      },
      {
        id: "fulfill",
        name: "Fulfillment exception",
        trigger: "Order stuck in packing",
        steps: [
          { icon: Zap, label: "Trigger", detail: "Order status unchanged 36h" },
          { icon: Bell, label: "Alert", detail: "Notify ops channel" },
          { icon: Mail, label: "Customer", detail: "Draft delay note for approval" },
          { icon: GitBranch, label: "Branch", detail: "Resolved · Escalate to manager" },
          { icon: Shield, label: "Human gate", detail: "Customer send needs approval" },
        ],
      },
    ],
  },
  onboarding: {
    label: "Onboarding",
    intro: "Keep new accounts and kickoffs moving with completeness checks.",
    recipes: [
      {
        id: "kickoff",
        name: "Kickoff packet chase",
        trigger: "Onboarding form incomplete",
        steps: [
          { icon: Zap, label: "Trigger", detail: "Required onboarding fields missing" },
          { icon: Mail, label: "Nudge", detail: "Friendly completeness reminder" },
          { icon: Clock3, label: "Wait", detail: "Wait 72 hours" },
          { icon: Bell, label: "Escalate", detail: "CSM notified with gap summary" },
          { icon: Shield, label: "Human gate", detail: "CSM owns tone and exceptions" },
        ],
      },
      {
        id: "access",
        name: "Access provisioning",
        trigger: "Contract marked signed",
        steps: [
          { icon: Zap, label: "Trigger", detail: "Deal closed-won in CRM" },
          { icon: GitBranch, label: "Create", detail: "Provision workspace + roles" },
          { icon: Mail, label: "Welcome", detail: "Send kickoff checklist" },
          { icon: Bell, label: "Internal", detail: "Notify delivery team" },
          { icon: Shield, label: "Human gate", detail: "Sensitive access stays manual" },
        ],
      },
    ],
  },
  support: {
    label: "Support",
    intro: "Triage tickets, draft replies, and escalate before SLAs slip.",
    recipes: [
      {
        id: "sla",
        name: "SLA risk escalation",
        trigger: "Ticket aging past threshold",
        steps: [
          { icon: Zap, label: "Trigger", detail: "Ticket open > SLA warning" },
          { icon: Bell, label: "Alert", detail: "Notify on-call owner" },
          { icon: Mail, label: "Draft", detail: "Prepare customer update" },
          { icon: GitBranch, label: "Branch", detail: "Resolved · Escalate L2" },
          { icon: Shield, label: "Human gate", detail: "Send only after approval" },
        ],
      },
      {
        id: "csat",
        name: "CSAT follow-up",
        trigger: "Ticket closed",
        steps: [
          { icon: Zap, label: "Trigger", detail: "Support ticket resolved" },
          { icon: Clock3, label: "Wait", detail: "Wait 2 hours" },
          { icon: Mail, label: "Survey", detail: "Short CSAT ask" },
          { icon: GitBranch, label: "Branch", detail: "Low score → manager loop" },
          { icon: Shield, label: "Human gate", detail: "No auto discounts" },
        ],
      },
    ],
  },
};

export function AutomationsDemo() {
  const reduce = useReducedMotion();
  const [category, setCategory] = useState<CategoryId>("sales");
  const [recipeId, setRecipeId] = useState(categories.sales.recipes[0].id);
  const [running, setRunning] = useState(false);
  const [step, setStep] = useState(0);

  const cat = categories[category];
  const recipe =
    cat.recipes.find((item) => item.id === recipeId) ?? cat.recipes[0];
  const flow = recipe.steps;

  function switchCategory(id: CategoryId) {
    setCategory(id);
    setRecipeId(categories[id].recipes[0].id);
    setStep(0);
    setRunning(false);
  }

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
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
          Automations by category
        </p>
        <h2 className="mt-3 max-w-3xl font-display text-4xl font-semibold tracking-tight text-white">
          Workflows for sales, commerce, onboarding, and support.
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/60">
          Triggers, waits, branches, and human approval gates — automate
          chase-work without losing brand control.
        </p>

        <div className="mt-6 flex gap-2 overflow-x-auto pb-1">
          {(Object.keys(categories) as CategoryId[]).map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => switchCategory(id)}
              className={cn(
                "shrink-0 rounded-full px-3.5 py-2 text-xs font-medium",
                category === id
                  ? "bg-primary text-white"
                  : "bg-white/10 text-white/70 hover:bg-white/15"
              )}
            >
              {categories[id].label}
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[0.9fr_1.2fr]">
          <div>
            <p className="text-sm text-white/55">{cat.intro}</p>
            <div className="mt-4 space-y-3">
              {cat.recipes.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setRecipeId(item.id);
                    setStep(0);
                    setRunning(false);
                  }}
                  className={cn(
                    "w-full rounded-2xl border p-4 text-left transition",
                    recipe.id === item.id
                      ? "border-primary bg-primary/15 text-white"
                      : "border-white/10 bg-white/5 text-white/75 hover:border-white/25"
                  )}
                >
                  <p className="font-semibold">{item.name}</p>
                  <p className="mt-1 text-xs opacity-70">{item.trigger}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur sm:p-7">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-white/40">
                  {cat.label} · live run
                </p>
                <p className="mt-1 font-display text-2xl font-semibold text-white">
                  {recipe.name}
                </p>
              </div>
              <Button
                onClick={runDemo}
                disabled={running}
                className="touch-manipulation"
              >
                {running ? "Running…" : "Run flow"}
              </Button>
            </div>

            <div className="mt-8 space-y-0">
              {flow.map((item, index) => {
                const active = step >= index && (running || step === flow.length - 1);
                const Icon = item.icon;
                return (
                  <div key={`${recipe.id}-${item.label}`}>
                    <motion.div
                      animate={{
                        opacity: active || !running ? 1 : 0.35,
                        scale: step === index && running ? 1.01 : 1,
                      }}
                      className={cn(
                        "flex items-start gap-3 rounded-2xl border p-4",
                        step === index
                          ? "border-primary/50 bg-primary/10"
                          : "border-white/10 bg-white/[0.03]"
                      )}
                    >
                      <div
                        className={cn(
                          "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
                          step === index
                            ? "bg-primary text-white"
                            : "bg-white/10 text-white/70"
                        )}
                      >
                        {step > index && !running ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <Icon className="h-4 w-4" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">
                          {item.label}
                        </p>
                        <p className="mt-1 text-sm text-white/55">{item.detail}</p>
                      </div>
                    </motion.div>
                    {index < flow.length - 1 ? (
                      <div className="flex justify-center py-1 text-white/25">
                        <ArrowDown className="h-4 w-4" />
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
