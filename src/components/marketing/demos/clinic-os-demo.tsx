"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Bot,
  ClipboardList,
  LayoutDashboard,
  MessageSquare,
  Package,
  Search,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const nav = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "intake", label: "Intake", icon: ClipboardList },
  { id: "patients", label: "Patients", icon: Users },
  { id: "orders", label: "Orders", icon: Package },
  { id: "agents", label: "Agents", icon: Bot },
] as const;

type View = (typeof nav)[number]["id"];

export function ClinicOsDemo() {
  const reduce = useReducedMotion();
  const [view, setView] = useState<View>("overview");
  const [assisted, setAssisted] = useState(false);

  return (
    <div className="flex h-[calc(100dvh-3.5rem)] flex-col bg-[#071216]">
      <div className="mx-auto flex h-full w-full max-w-[1400px] overflow-hidden border-x border-white/5 bg-[#f1f5f4]">
        <aside className="hidden w-56 shrink-0 flex-col border-r border-[#d5e0dd] bg-[#0c1a1f] text-white md:flex">
          <div className="border-b border-white/10 px-4 py-4">
            <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/40">
              Clinic OS
            </p>
            <p className="mt-1 font-display text-lg font-semibold">
              Northside Ops
            </p>
          </div>
          <nav className="flex flex-1 flex-col gap-1 p-3">
            {nav.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setView(item.id);
                  setAssisted(false);
                }}
                className={cn(
                  "inline-flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium transition",
                  view === item.id
                    ? "bg-primary text-white"
                    : "text-white/65 hover:bg-white/5 hover:text-white"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </button>
            ))}
          </nav>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex items-center justify-between gap-3 border-b border-[#d5e0dd] bg-white px-4 py-3 sm:px-6">
            <div className="flex min-w-0 items-center gap-2 rounded-xl border border-[#d5e0dd] bg-[#f1f5f4] px-3 py-2 text-sm text-[#5a6b72]">
              <Search className="h-4 w-4 shrink-0" />
              <span className="truncate">Search patients, intakes, orders…</span>
            </div>
            <div className="hidden text-xs font-medium text-[#5a6b72] sm:block">
              Live demo · staff view
            </div>
          </header>

          <div className="flex gap-1 overflow-x-auto border-b border-[#d5e0dd] bg-white px-3 py-2 md:hidden">
            {nav.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setView(item.id)}
                className={cn(
                  "shrink-0 rounded-full px-3 py-1.5 text-xs font-medium",
                  view === item.id
                    ? "bg-[#0c1a1f] text-white"
                    : "bg-[#e4ecea] text-[#5a6b72]"
                )}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={view + String(assisted)}
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0 }}
                transition={{ duration: 0.22 }}
              >
                {view === "overview" ? <Overview onIntake={() => setView("intake")} /> : null}
                {view === "intake" ? (
                  <Intake onAgents={() => setView("agents")} />
                ) : null}
                {view === "patients" ? <Patients /> : null}
                {view === "orders" ? <Orders /> : null}
                {view === "agents" ? (
                  <Agents assisted={assisted} onAssist={() => setAssisted(true)} />
                ) : null}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

function Overview({ onIntake }: { onIntake: () => void }) {
  return (
    <div>
      <h2 className="font-display text-3xl font-semibold text-[#0c1a1f]">
        Today at Northside
      </h2>
      <p className="mt-2 text-sm text-[#5a6b72]">
        One operating layer for intake, patients, commerce, and agents.
      </p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Open intakes", value: "12", tone: "text-[#0c1a1f]" },
          { label: "Agent drafts", value: "7", tone: "text-primary" },
          { label: "Follow-ups due", value: "4", tone: "text-amber-700" },
          { label: "Orders today", value: "9", tone: "text-[#0c1a1f]" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-[#d5e0dd] bg-white p-5"
          >
            <p className={cn("font-display text-4xl font-semibold", stat.tone)}>
              {stat.value}
            </p>
            <p className="mt-1 text-sm text-[#5a6b72]">{stat.label}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-[#d5e0dd] bg-white p-5">
          <p className="text-sm font-semibold text-[#0c1a1f]">Conversion pulse</p>
          <div className="mt-4 flex h-32 items-end gap-2">
            {[40, 55, 48, 70, 62, 78, 85].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-md bg-gradient-to-t from-[#0c1a1f] to-primary"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
          <p className="mt-3 text-xs text-[#5a6b72]">
            Qualified enquiries · last 7 days
          </p>
        </div>
        <div className="rounded-2xl border border-[#d5e0dd] bg-white p-5">
          <p className="text-sm font-semibold text-[#0c1a1f]">Needs attention</p>
          <ul className="mt-4 space-y-3">
            {[
              "A. Mercer — missing referral",
              "L. Chen — follow-up overdue",
              "Order #10479 — payment pending",
            ].map((item) => (
              <li
                key={item}
                className="flex items-center justify-between text-sm text-[#12252c]"
              >
                {item}
                <button
                  type="button"
                  onClick={onIntake}
                  className="text-xs font-semibold text-primary"
                >
                  Open
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function Intake({ onAgents }: { onAgents: () => void }) {
  return (
    <div>
      <h2 className="font-display text-3xl font-semibold text-[#0c1a1f]">
        Intake queue
      </h2>
      <div className="mt-5 overflow-hidden rounded-2xl border border-[#d5e0dd] bg-white">
        {[
          {
            name: "Alex Mercer",
            status: "Missing documents",
            tone: "text-amber-700",
          },
          {
            name: "Jordan Okonkwo",
            status: "Ready for review",
            tone: "text-primary",
          },
          {
            name: "Lina Chen",
            status: "Needs follow-up",
            tone: "text-[#5a6b72]",
          },
          {
            name: "Noah Patel",
            status: "Complete",
            tone: "text-primary",
          },
        ].map((row, index) => (
          <div
            key={row.name}
            className={cn(
              "flex items-center justify-between gap-3 px-4 py-4 sm:px-5",
              index > 0 && "border-t border-[#e4ecea]"
            )}
          >
            <div>
              <p className="text-sm font-semibold text-[#0c1a1f]">{row.name}</p>
              <p className="text-xs text-[#5a6b72]">Longevity assessment</p>
            </div>
            <span className={cn("text-xs font-semibold", row.tone)}>
              {row.status}
            </span>
          </div>
        ))}
      </div>
      <Button className="mt-5 touch-manipulation" onClick={onAgents}>
        Ask agent to chase missing docs
      </Button>
    </div>
  );
}

function Patients() {
  return (
    <div>
      <h2 className="font-display text-3xl font-semibold text-[#0c1a1f]">
        Patients
      </h2>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {["Alex Mercer", "Jordan Okonkwo", "Lina Chen", "Noah Patel", "Sofia Reyes", "Marcus Trent"].map(
          (name) => (
            <div
              key={name}
              className="rounded-2xl border border-[#d5e0dd] bg-white p-4"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0c1a1f] text-sm font-semibold text-white">
                {name
                  .split(" ")
                  .map((p) => p[0])
                  .join("")}
              </div>
              <p className="mt-3 text-sm font-semibold text-[#0c1a1f]">{name}</p>
              <p className="mt-1 text-xs text-[#5a6b72]">
                Active · packet history available
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
}

function Orders() {
  return (
    <div>
      <h2 className="font-display text-3xl font-semibold text-[#0c1a1f]">
        Orders
      </h2>
      <div className="mt-5 overflow-hidden rounded-2xl border border-[#d5e0dd] bg-white">
        {[
          { id: "ORD-10481", name: "Recovery kit", status: "Paid", total: "€240" },
          { id: "ORD-10480", name: "Supplement pack", status: "Shipped", total: "€129" },
          { id: "ORD-10479", name: "Assessment fee", status: "Pending", total: "€312" },
        ].map((order, index) => (
          <div
            key={order.id}
            className={cn(
              "grid grid-cols-[1fr_auto] gap-2 px-4 py-4 sm:grid-cols-[1.2fr_1fr_0.8fr_0.6fr] sm:px-5",
              index > 0 && "border-t border-[#e4ecea]"
            )}
          >
            <p className="text-sm font-semibold text-[#0c1a1f]">{order.id}</p>
            <p className="text-sm text-[#5a6b72]">{order.name}</p>
            <p className="text-sm text-[#0c1a1f]">{order.status}</p>
            <p className="text-sm font-medium text-[#0c1a1f]">{order.total}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Agents({
  assisted,
  onAssist,
}: {
  assisted: boolean;
  onAssist: () => void;
}) {
  return (
    <div>
      <h2 className="font-display text-3xl font-semibold text-[#0c1a1f]">
        Agent assist
      </h2>
      <div className="mt-5 rounded-2xl border border-[#d5e0dd] bg-white p-5">
        <div className="flex items-start gap-3">
          <MessageSquare className="mt-0.5 h-4 w-4 text-primary" />
          <div>
            <p className="text-sm font-semibold text-[#0c1a1f]">
              Draft follow-up · Alex Mercer
            </p>
            <p className="mt-3 rounded-2xl bg-[#f1f5f4] p-4 text-sm leading-relaxed text-[#12252c]">
              “Hi Alex — we’re still missing your referral letter to complete the
              longevity packet. Reply with a photo or PDF and we’ll confirm your
              consult slot.”
            </p>
          </div>
        </div>
        {!assisted ? (
          <Button className="mt-4 touch-manipulation" onClick={onAssist}>
            Approve & queue send
          </Button>
        ) : (
          <p className="mt-4 text-sm font-medium text-primary">
            Queued — human approved, agent delivers.
          </p>
        )}
      </div>
    </div>
  );
}
