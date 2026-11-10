"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  ChevronRight,
  HeartPulse,
  Home,
  MessageCircle,
  Phone,
  Send,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Tab = "home" | "care" | "messages" | "profile";

export function MobileDemo() {
  const reduce = useReducedMotion();
  const [tab, setTab] = useState<Tab>("home");
  const [booked, setBooked] = useState(false);
  const [message, setMessage] = useState("");
  const [thread, setThread] = useState<
    Array<{ from: "clinic" | "patient"; text: string }>
  >([
    {
      from: "clinic",
      text: "Hi Alex — your longevity labs are in. Want to review Thursday?",
    },
  ]);

  return (
    <div className="flex min-h-[calc(100dvh-3.5rem)] items-center justify-center bg-[radial-gradient(ellipse_at_bottom,#0c1a1f_0%,#020617_60%)] px-3 py-6 sm:px-6">
      <div className="w-full max-w-[390px] overflow-hidden rounded-[2.5rem] border border-white/15 bg-black shadow-[0_40px_120px_rgba(0,0,0,0.55)]">
        <div className="relative overflow-hidden rounded-[2.3rem] m-1.5 bg-[#f7faf9]">
          <div className="absolute left-1/2 top-2 z-10 h-5 w-28 -translate-x-1/2 rounded-full bg-black/90" />

          <div className="flex items-center justify-between px-5 pb-2 pt-8 text-[10px] font-medium text-[#5a6b72]">
            <span>9:41</span>
            <span className="rounded-full bg-[#0c1a1f] px-2 py-0.5 text-[9px] uppercase tracking-[0.14em] text-white">
              Native app
            </span>
          </div>

          <div className="min-h-[560px] px-4 pb-24">
            <AnimatePresence mode="wait">
              <motion.div
                key={tab + String(booked) + thread.length}
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.22 }}
              >
                {tab === "home" ? (
                  <div>
                    <p className="text-sm text-[#5a6b72]">Northside Care</p>
                    <h3 className="mt-1 font-display text-3xl font-semibold text-[#0c1a1f]">
                      Your care, in your pocket.
                    </h3>
                    <div className="mt-5 rounded-[1.5rem] bg-[#0c1a1f] p-5 text-white">
                      <p className="text-xs uppercase tracking-[0.16em] text-[#5eead4]">
                        Next visit
                      </p>
                      <p className="mt-2 font-display text-2xl font-semibold">
                        {booked ? "Thu · 10:30" : "No visit booked"}
                      </p>
                      <p className="mt-1 text-sm text-white/60">
                        {booked
                          ? "Dr. Mira Elson · Longevity review"
                          : "Book a consult in two taps"}
                      </p>
                      {!booked ? (
                        <Button
                          className="mt-4 w-full touch-manipulation"
                          onClick={() => setBooked(true)}
                        >
                          Book appointment
                        </Button>
                      ) : (
                        <Button
                          className="mt-4 w-full"
                          variant="outline"
                          onClick={() => setTab("messages")}
                        >
                          Message care team
                        </Button>
                      )}
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-3">
                      {[
                        {
                          title: "Care plan",
                          text: "3 active goals",
                          action: () => setTab("care"),
                        },
                        {
                          title: "Messages",
                          text: "1 unread",
                          action: () => setTab("messages"),
                        },
                      ].map((card) => (
                        <button
                          key={card.title}
                          type="button"
                          onClick={card.action}
                          className="rounded-[1.25rem] border border-[#d5e0dd] bg-white p-4 text-left"
                        >
                          <p className="text-sm font-semibold text-[#0c1a1f]">
                            {card.title}
                          </p>
                          <p className="mt-1 text-xs text-[#5a6b72]">
                            {card.text}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : null}

                {tab === "care" ? (
                  <div>
                    <h3 className="font-display text-2xl font-semibold text-[#0c1a1f]">
                      Care plan
                    </h3>
                    <ul className="mt-5 space-y-3">
                      {[
                        {
                          title: "Sleep consistency",
                          progress: "72%",
                          note: "On track this week",
                        },
                        {
                          title: "Metabolic labs",
                          progress: "Due",
                          note: "Schedule before Apr 18",
                        },
                        {
                          title: "Recovery sessions",
                          progress: "2/4",
                          note: "Next: Friday morning",
                        },
                      ].map((item) => (
                        <li
                          key={item.title}
                          className="rounded-[1.25rem] border border-[#d5e0dd] bg-white p-4"
                        >
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-semibold text-[#0c1a1f]">
                              {item.title}
                            </p>
                            <span className="text-xs font-semibold text-primary">
                              {item.progress}
                            </span>
                          </div>
                          <p className="mt-1 text-xs text-[#5a6b72]">
                            {item.note}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {tab === "messages" ? (
                  <div className="flex min-h-[500px] flex-col">
                    <h3 className="font-display text-2xl font-semibold text-[#0c1a1f]">
                      Care chat
                    </h3>
                    <div className="mt-4 flex-1 space-y-3">
                      {thread.map((item, index) => (
                        <div
                          key={index}
                          className={cn(
                            "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm",
                            item.from === "clinic"
                              ? "bg-white border border-[#d5e0dd] text-[#0c1a1f]"
                              : "ml-auto bg-[#0c1a1f] text-white"
                          )}
                        >
                          {item.text}
                        </div>
                      ))}
                    </div>
                    <form
                      className="mt-4 flex gap-2"
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (!message.trim()) return;
                        setThread([
                          ...thread,
                          { from: "patient", text: message.trim() },
                          {
                            from: "clinic",
                            text: "Got it — a coordinator will confirm shortly.",
                          },
                        ]);
                        setMessage("");
                      }}
                    >
                      <input
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Message the clinic…"
                        className="h-11 flex-1 rounded-full border border-[#d5e0dd] bg-white px-4 text-sm"
                      />
                      <button
                        type="submit"
                        className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-white"
                      >
                        <Send className="h-4 w-4" />
                      </button>
                    </form>
                  </div>
                ) : null}

                {tab === "profile" ? (
                  <div>
                    <h3 className="font-display text-2xl font-semibold text-[#0c1a1f]">
                      Profile
                    </h3>
                    <div className="mt-5 rounded-[1.5rem] border border-[#d5e0dd] bg-white p-5">
                      <p className="font-semibold text-[#0c1a1f]">Alex Mercer</p>
                      <p className="mt-1 text-sm text-[#5a6b72]">
                        Patient · Northside Longevity
                      </p>
                    </div>
                    <ul className="mt-3 space-y-2">
                      {[
                        "Notifications",
                        "Privacy & sharing",
                        "Connected devices",
                        "Support",
                      ].map((item) => (
                        <li
                          key={item}
                          className="flex items-center justify-between rounded-2xl border border-[#d5e0dd] bg-white px-4 py-3.5 text-sm text-[#0c1a1f]"
                        >
                          {item}
                          <ChevronRight className="h-4 w-4 text-[#5a6b72]" />
                        </li>
                      ))}
                    </ul>
                    <Button
                      className="mt-5 w-full"
                      variant="outline"
                      onClick={() => setTab("home")}
                    >
                      <Phone className="h-4 w-4" />
                      Call clinic
                    </Button>
                  </div>
                ) : null}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="absolute inset-x-0 bottom-0 border-t border-[#d5e0dd] bg-white/95 px-2 pb-3 pt-2 backdrop-blur">
            <div className="grid grid-cols-4">
              {(
                [
                  { id: "home", icon: Home, label: "Home" },
                  { id: "care", icon: HeartPulse, label: "Care" },
                  { id: "messages", icon: MessageCircle, label: "Chat" },
                  { id: "profile", icon: User, label: "You" },
                ] as const
              ).map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setTab(item.id)}
                  className={cn(
                    "flex flex-col items-center gap-1 py-1.5 text-[10px] font-medium",
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
