"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Download,
  Home,
  ListChecks,
  UserRound,
  Wifi,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type UseCaseId = "portal" | "membership" | "reorder" | "field";
type Tab = "home" | "flow" | "status";

const useCases: Record<
  UseCaseId,
  {
    label: string;
    appName: string;
    eyebrow: string;
    homeTitle: string;
    homeHint: string;
    flowLabel: string;
    steps: { title: string; fields: string[] }[];
    statusTitle: string;
    statusItems: { label: string; state: string }[];
  }
> = {
  portal: {
    label: "Account portal",
    appName: "Atlas Portal",
    eyebrow: "B2B portal",
    homeTitle: "Quotes, docs, and orders in one install.",
    homeHint: "Buyers check status without emailing sales.",
    flowLabel: "New RFQ",
    steps: [
      { title: "Account", fields: ["Company", "Buyer name", "Ship-to site"] },
      { title: "Requirements", fields: ["SKU / part", "Quantity", "Need-by date"] },
      { title: "Files", fields: ["Drawing PDF", "Spec sheet", "PO (optional)"] },
    ],
    statusTitle: "Open requests",
    statusItems: [
      { label: "RFQ-1842", state: "Awaiting files" },
      { label: "Order #991", state: "In production" },
      { label: "Quote Q-77", state: "Ready to approve" },
    ],
  },
  membership: {
    label: "Membership",
    appName: "Cedar Member",
    eyebrow: "Membership PWA",
    homeTitle: "Book visits and manage your plan.",
    homeHint: "Members install once and skip the front desk queue.",
    flowLabel: "Update profile",
    steps: [
      { title: "You", fields: ["Preferred name", "Location", "Best time"] },
      { title: "Plan", fields: ["Membership tier", "Add-ons", "Billing contact"] },
      { title: "Prefs", fields: ["Reminders", "Marketing opt-in", "Notes"] },
    ],
    statusTitle: "This week",
    statusItems: [
      { label: "Thu 10:30", state: "Booked" },
      { label: "Credits left", state: "3 visits" },
      { label: "Renewal", state: "Apr 12" },
    ],
  },
  reorder: {
    label: "Reorder",
    appName: "Harbor Repeat",
    eyebrow: "Commerce PWA",
    homeTitle: "Reorder favorites in two taps.",
    homeHint: "Returning buyers skip the full storefront hunt.",
    flowLabel: "Quick reorder",
    steps: [
      { title: "Items", fields: ["Essentials kit", "Refill pack", "Gift wrap"] },
      { title: "Ship", fields: ["Address on file", "Delivery window", "Notes"] },
      { title: "Pay", fields: ["Card on file", "Invoice", "Promo code"] },
    ],
    statusTitle: "Recent orders",
    statusItems: [
      { label: "#4821", state: "Shipped" },
      { label: "#4799", state: "Delivered" },
      { label: "Subscription", state: "Next: May 3" },
    ],
  },
  field: {
    label: "Field ops",
    appName: "FieldCheck",
    eyebrow: "Staff PWA",
    homeTitle: "Checklists that work on-site.",
    homeHint: "Installable for crews—even on shared devices.",
    flowLabel: "Site checklist",
    steps: [
      { title: "Job", fields: ["Site ID", "Crew lead", "Start time"] },
      { title: "Checks", fields: ["Safety", "Equipment", "Photos"] },
      { title: "Sign-off", fields: ["Customer name", "Signature", "Issues"] },
    ],
    statusTitle: "Today’s jobs",
    statusItems: [
      { label: "Site A-12", state: "In progress" },
      { label: "Site B-04", state: "Queued" },
      { label: "Site C-19", state: "Complete" },
    ],
  },
};

export function PwaDemo() {
  const reduce = useReducedMotion();
  const [useCase, setUseCase] = useState<UseCaseId>("portal");
  const [tab, setTab] = useState<Tab>("home");
  const [step, setStep] = useState(0);
  const [installed, setInstalled] = useState(false);
  const [done, setDone] = useState(false);
  const data = useCases[useCase];

  function switchUseCase(id: UseCaseId) {
    setUseCase(id);
    setTab("home");
    setStep(0);
    setDone(false);
    setInstalled(false);
  }

  return (
    <div className="flex min-h-[calc(100dvh-3.5rem)] flex-col items-center bg-[radial-gradient(ellipse_at_top,#134e4a_0%,#071216_55%)] px-3 py-4 sm:px-6 sm:py-6">
      <div className="mb-3 w-full max-w-[390px]">
        <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.16em] text-white/45">
          Use case
        </p>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {(Object.keys(useCases) as UseCaseId[]).map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => switchUseCase(id)}
              className={cn(
                "shrink-0 rounded-full px-3 py-1.5 text-xs font-medium",
                useCase === id
                  ? "bg-primary text-white"
                  : "bg-white/10 text-white/70"
              )}
            >
              {useCases[id].label}
            </button>
          ))}
        </div>
      </div>

      <div className="relative w-full max-w-[390px]">
        {!installed ? (
          <motion.div
            initial={reduce ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-3 overflow-hidden rounded-2xl border border-white/15 bg-white/10 p-3 text-white backdrop-blur"
          >
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white">
                <Download className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold">Install {data.appName}</p>
                <p className="mt-0.5 text-xs text-white/65">
                  Add to home screen · offline-ready · no App Store wait
                </p>
              </div>
            </div>
            <div className="mt-3 flex gap-2">
              <Button
                size="sm"
                className="flex-1 touch-manipulation"
                onClick={() => setInstalled(true)}
              >
                Install PWA
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="border-white/20 bg-transparent text-white hover:bg-white/10"
                onClick={() => setInstalled(true)}
              >
                Later
              </Button>
            </div>
          </motion.div>
        ) : null}

        <div className="overflow-hidden rounded-[2.4rem] border border-white/20 bg-[#0b1214] shadow-[0_40px_100px_rgba(0,0,0,0.45)]">
          <div className="flex items-center justify-between px-6 pb-1 pt-3 text-[10px] font-medium text-white/50">
            <span>9:41</span>
            <div className="flex items-center gap-1.5">
              <Wifi className="h-3 w-3" />
              <span className="h-2.5 w-5 rounded-sm bg-white/40" />
            </div>
          </div>

          <div className="mx-3 mb-3 min-h-[560px] overflow-hidden rounded-[1.75rem] bg-[#f3f7f6]">
            <div className="flex items-center justify-between border-b border-[#d5e0dd] bg-white px-4 py-3">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-primary">
                  {data.eyebrow}
                </p>
                <p className="font-display text-lg font-semibold text-[#0c1a1f]">
                  {data.appName}
                </p>
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e4ecea] text-[#0c1a1f]">
                <UserRound className="h-4 w-4" />
              </div>
            </div>

            <div className="min-h-[470px] px-4 py-4 pb-20">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${useCase}-${tab}-${step}-${String(done)}`}
                  initial={reduce ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                >
                  {tab === "home" ? (
                    <div>
                      <h3 className="font-display text-2xl font-semibold text-[#0c1a1f]">
                        {data.homeTitle}
                      </h3>
                      <p className="mt-2 text-sm text-[#5a6b72]">{data.homeHint}</p>
                      <Button
                        className="mt-5 w-full touch-manipulation"
                        onClick={() => {
                          setTab("flow");
                          setStep(0);
                          setDone(false);
                        }}
                      >
                        Start {data.flowLabel}
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                      <button
                        type="button"
                        className="mt-3 w-full rounded-2xl border border-[#d5e0dd] bg-white p-4 text-left"
                        onClick={() => setTab("status")}
                      >
                        <p className="text-sm font-semibold text-[#0c1a1f]">
                          {data.statusTitle}
                        </p>
                        <p className="mt-1 text-xs text-[#5a6b72]">
                          {data.statusItems[0].label} · {data.statusItems[0].state}
                        </p>
                      </button>
                    </div>
                  ) : null}

                  {tab === "flow" ? (
                    <div>
                      {done ? (
                        <div className="rounded-2xl border border-primary/20 bg-white p-5 text-center">
                          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <Check className="h-5 w-5" />
                          </div>
                          <p className="mt-3 font-display text-xl font-semibold text-[#0c1a1f]">
                            Submitted
                          </p>
                          <p className="mt-2 text-sm text-[#5a6b72]">
                            Completeness agent can flag gaps before staff dig in.
                          </p>
                          <Button
                            className="mt-4 w-full"
                            variant="outline"
                            onClick={() => setTab("status")}
                          >
                            View status
                          </Button>
                        </div>
                      ) : (
                        <>
                          <p className="text-xs font-medium uppercase tracking-[0.14em] text-primary">
                            Step {step + 1} of {data.steps.length}
                          </p>
                          <h3 className="mt-2 font-display text-2xl font-semibold text-[#0c1a1f]">
                            {data.steps[step].title}
                          </h3>
                          <ul className="mt-4 space-y-2">
                            {data.steps[step].fields.map((field) => (
                              <li
                                key={field}
                                className="rounded-xl border border-[#d5e0dd] bg-white px-3 py-3 text-sm text-[#0c1a1f]"
                              >
                                {field}
                              </li>
                            ))}
                          </ul>
                          <Button
                            className="mt-5 w-full touch-manipulation"
                            onClick={() => {
                              if (step < data.steps.length - 1) setStep(step + 1);
                              else setDone(true);
                            }}
                          >
                            {step < data.steps.length - 1 ? "Continue" : "Submit"}
                          </Button>
                        </>
                      )}
                    </div>
                  ) : null}

                  {tab === "status" ? (
                    <div>
                      <h3 className="font-display text-2xl font-semibold text-[#0c1a1f]">
                        {data.statusTitle}
                      </h3>
                      <div className="mt-4 space-y-2">
                        {data.statusItems.map((item) => (
                          <div
                            key={item.label}
                            className="flex items-center justify-between rounded-2xl border border-[#d5e0dd] bg-white px-4 py-3"
                          >
                            <p className="text-sm font-medium text-[#0c1a1f]">
                              {item.label}
                            </p>
                            <p className="text-xs font-medium text-primary">
                              {item.state}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="absolute inset-x-3 bottom-3 rounded-[1.25rem] border border-[#d5e0dd] bg-white/95 px-2 py-2 backdrop-blur">
              <div className="grid grid-cols-3 gap-1">
                {(
                  [
                    { id: "home" as const, label: "Home", icon: Home },
                    { id: "flow" as const, label: data.flowLabel, icon: ListChecks },
                    { id: "status" as const, label: "Status", icon: UserRound },
                  ] as const
                ).map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setTab(item.id)}
                    className={cn(
                      "flex flex-col items-center gap-1 rounded-xl py-2 text-[10px] font-medium",
                      tab === item.id ? "text-primary" : "text-[#5a6b72]"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    <span className="truncate px-1">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
