"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Bell,
  Check,
  Download,
  Home,
  ListChecks,
  Share,
  UserRound,
  Wifi,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const intakeSteps = [
  {
    title: "About you",
    fields: ["Preferred name", "Clinic location", "Best contact time"],
  },
  {
    title: "Health context",
    fields: ["Primary goals", "Current medications", "Allergies"],
  },
  {
    title: "Documents",
    fields: ["Photo ID", "Referral letter", "Insurance card (optional)"],
  },
] as const;

export function PwaDemo() {
  const reduce = useReducedMotion();
  const [tab, setTab] = useState<"home" | "intake" | "status">("home");
  const [step, setStep] = useState(0);
  const [installed, setInstalled] = useState(false);
  const [done, setDone] = useState(false);

  return (
    <div className="flex min-h-[calc(100dvh-3.5rem)] items-center justify-center bg-[radial-gradient(ellipse_at_top,#134e4a_0%,#071216_55%)] px-3 py-6 sm:px-6">
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
                <p className="text-sm font-semibold">Install Northside Care</p>
                <p className="mt-0.5 text-xs text-white/65">
                  Add to home screen · works offline-ready · no App Store wait
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
                  Patient PWA
                </p>
                <p className="font-display text-lg font-semibold text-[#0c1a1f]">
                  Northside Care
                </p>
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e4ecea] text-[#0c1a1f]">
                <Bell className="h-3.5 w-3.5" />
              </div>
            </div>

            <div className="min-h-[470px] p-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={tab + String(done) + step}
                  initial={reduce ? false : { opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reduce ? undefined : { opacity: 0, x: -8 }}
                  transition={{ duration: 0.22 }}
                >
                  {tab === "home" ? (
                    <div>
                      <p className="text-sm text-[#5a6b72]">Good afternoon</p>
                      <h3 className="mt-1 font-display text-2xl font-semibold text-[#0c1a1f]">
                        Continue your intake
                      </h3>
                      <button
                        type="button"
                        onClick={() => {
                          setTab("intake");
                          setStep(0);
                          setDone(false);
                        }}
                        className="mt-5 w-full rounded-3xl bg-[#0c1a1f] p-5 text-left text-white"
                      >
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-semibold">
                            Longevity assessment
                          </p>
                          <Share className="h-4 w-4 text-white/50" />
                        </div>
                        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/15">
                          <div className="h-full w-2/3 rounded-full bg-primary" />
                        </div>
                        <p className="mt-2 text-xs text-white/55">
                          2 of 3 sections complete
                        </p>
                        <p className="mt-4 inline-flex items-center gap-1 text-sm text-[#5eead4]">
                          Resume packet
                          <ArrowRight className="h-3.5 w-3.5" />
                        </p>
                      </button>
                      <button
                        type="button"
                        onClick={() => setTab("status")}
                        className="mt-3 w-full rounded-3xl border border-[#d5e0dd] bg-white p-4 text-left"
                      >
                        <p className="text-sm font-semibold text-[#0c1a1f]">
                          Visit status
                        </p>
                        <p className="mt-1 text-xs text-[#5a6b72]">
                          Clinician review in progress
                        </p>
                      </button>
                      {installed ? (
                        <p className="mt-4 flex items-center gap-2 text-xs text-primary">
                          <Check className="h-3.5 w-3.5" />
                          Installed on home screen
                        </p>
                      ) : null}
                    </div>
                  ) : null}

                  {tab === "intake" ? (
                    done ? (
                      <div className="rounded-3xl border border-primary/20 bg-white p-6 text-center">
                        <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <Check className="h-5 w-5" />
                        </div>
                        <p className="mt-3 font-display text-xl font-semibold text-[#0c1a1f]">
                          Packet complete
                        </p>
                        <p className="mt-2 text-sm text-[#5a6b72]">
                          Completeness agents flag gaps before staff chase them.
                        </p>
                        <Button
                          className="mt-5 w-full"
                          onClick={() => setTab("status")}
                        >
                          View status
                        </Button>
                      </div>
                    ) : (
                      <div>
                        <p className="text-xs text-[#5a6b72]">
                          Step {step + 1} of {intakeSteps.length}
                        </p>
                        <h3 className="mt-2 font-display text-2xl font-semibold text-[#0c1a1f]">
                          {intakeSteps[step].title}
                        </h3>
                        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#e4ecea]">
                          <div
                            className="h-full rounded-full bg-primary transition-all"
                            style={{
                              width: `${((step + 1) / intakeSteps.length) * 100}%`,
                            }}
                          />
                        </div>
                        <div className="mt-5 space-y-2">
                          {intakeSteps[step].fields.map((field) => (
                            <div
                              key={field}
                              className="rounded-2xl border border-[#d5e0dd] bg-white px-4 py-3.5 text-sm text-[#5a6b72]"
                            >
                              {field}
                            </div>
                          ))}
                        </div>
                        <Button
                          className="mt-5 w-full touch-manipulation"
                          onClick={() => {
                            if (step < intakeSteps.length - 1) setStep(step + 1);
                            else setDone(true);
                          }}
                        >
                          {step < intakeSteps.length - 1
                            ? "Continue"
                            : "Submit packet"}
                        </Button>
                      </div>
                    )
                  ) : null}

                  {tab === "status" ? (
                    <div>
                      <h3 className="font-display text-2xl font-semibold text-[#0c1a1f]">
                        Visit status
                      </h3>
                      <ul className="mt-5 space-y-3">
                        {[
                          { label: "Intake received", state: "done" },
                          { label: "Completeness check", state: "done" },
                          { label: "Clinician review", state: "active" },
                          { label: "Consult scheduled", state: "todo" },
                        ].map((item) => (
                          <li
                            key={item.label}
                            className="flex items-center justify-between rounded-2xl border border-[#d5e0dd] bg-white px-4 py-3.5"
                          >
                            <span className="text-sm font-medium text-[#0c1a1f]">
                              {item.label}
                            </span>
                            <span
                              className={cn(
                                "text-xs font-semibold",
                                item.state === "done" && "text-primary",
                                item.state === "active" && "text-amber-700",
                                item.state === "todo" && "text-[#5a6b72]"
                              )}
                            >
                              {item.state === "done"
                                ? "Complete"
                                : item.state === "active"
                                  ? "In progress"
                                  : "Pending"}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="grid grid-cols-3 border-t border-[#d5e0dd] bg-white px-2 py-2">
              {(
                [
                  { id: "home", icon: Home, label: "Home" },
                  { id: "intake", icon: ListChecks, label: "Intake" },
                  { id: "status", icon: UserRound, label: "Status" },
                ] as const
              ).map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setTab(item.id)}
                  className={cn(
                    "flex flex-col items-center gap-1 rounded-xl py-2 text-[11px] font-medium",
                    tab === item.id ? "text-primary" : "text-[#5a6b72]"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
