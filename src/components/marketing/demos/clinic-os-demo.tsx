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

type IndustryId = "b2b" | "commerce" | "services";
type View = "overview" | "queue" | "customers" | "orders" | "agents";

const nav = [
  { id: "overview" as const, label: "Overview", icon: LayoutDashboard },
  { id: "queue" as const, label: "Queue", icon: ClipboardList },
  { id: "customers" as const, label: "Customers", icon: Users },
  { id: "orders" as const, label: "Orders", icon: Package },
  { id: "agents" as const, label: "Agents", icon: Bot },
];

const industries: Record<
  IndustryId,
  {
    label: string;
    brand: string;
    search: string;
    stats: { label: string; value: string; tone: string }[];
    attention: string[];
    queueTitle: string;
    queueRows: { name: string; detail: string; status: string; tone: string }[];
    customers: string[];
    orders: { id: string; name: string; status: string; total: string }[];
    agentDraft: string;
  }
> = {
  b2b: {
    label: "B2B ops",
    brand: "Atlas Ops",
    search: "Search accounts, RFQs, orders…",
    stats: [
      { label: "Open RFQs", value: "12", tone: "text-[#0c1a1f]" },
      { label: "Agent drafts", value: "7", tone: "text-primary" },
      { label: "Follow-ups due", value: "4", tone: "text-amber-700" },
      { label: "Quotes sent", value: "9", tone: "text-[#0c1a1f]" },
    ],
    attention: [
      "Meridian Corp — missing drawings",
      "Helix Ltd — demo follow-up overdue",
      "PO #10479 — payment pending",
    ],
    queueTitle: "RFQ queue",
    queueRows: [
      { name: "Meridian Corp", detail: "Custom assembly", status: "Missing files", tone: "text-amber-700" },
      { name: "Helix Ltd", detail: "Catalog order", status: "Ready for review", tone: "text-primary" },
      { name: "Nova Co", detail: "Partner program", status: "Needs follow-up", tone: "text-[#5a6b72]" },
      { name: "Orbit Inc", detail: "Components", status: "Complete", tone: "text-primary" },
    ],
    customers: ["Meridian Corp", "Helix Ltd", "Nova Co", "Orbit Inc", "Cedar Works", "Northline"],
    orders: [
      { id: "PO-10481", name: "Assembly kit", status: "Paid", total: "€2,400" },
      { id: "PO-10480", name: "Components", status: "Shipped", total: "€1,290" },
      { id: "PO-10479", name: "Sample pack", status: "Pending", total: "€312" },
    ],
    agentDraft:
      "Hi Jordan — we’re still missing the CAD drawing to finish RFQ-1842. A PDF reply works and we’ll lock pricing + lead time.",
  },
  commerce: {
    label: "Commerce ops",
    brand: "Harbor Ops",
    search: "Search customers, orders, SKUs…",
    stats: [
      { label: "Open tickets", value: "8", tone: "text-[#0c1a1f]" },
      { label: "Agent drafts", value: "11", tone: "text-primary" },
      { label: "Carts aging", value: "23", tone: "text-amber-700" },
      { label: "Orders today", value: "64", tone: "text-[#0c1a1f]" },
    ],
    attention: [
      "#4821 — incomplete shipping address",
      "Abandoned cart — Essentials kit",
      "Return R-882 — refund pending",
    ],
    queueTitle: "Exception queue",
    queueRows: [
      { name: "Order #4821", detail: "Essentials kit", status: "Address gap", tone: "text-amber-700" },
      { name: "Cart C-991", detail: "Limited drop", status: "Recoverable", tone: "text-primary" },
      { name: "Return R-882", detail: "Refill pack", status: "Needs review", tone: "text-[#5a6b72]" },
      { name: "Order #4799", detail: "Bundle", status: "Fulfilled", tone: "text-primary" },
    ],
    customers: ["Sam Ortiz", "Riley Chen", "Jamie Cole", "Kim Park", "Noah Blake", "Alex Rivera"],
    orders: [
      { id: "#4821", name: "Essentials kit", status: "Packed", total: "€84" },
      { id: "#4820", name: "Refill pack", status: "Shipped", total: "€39" },
      { id: "#4819", name: "Limited tee", status: "Paid", total: "€48" },
    ],
    agentDraft:
      "Hi Sam — your order #4821 is almost ready. We still need your apartment/suite to ship. Reply anytime and we’ll update tracking.",
  },
  services: {
    label: "Services ops",
    brand: "Northline Ops",
    search: "Search clients, enquiries, projects…",
    stats: [
      { label: "Open enquiries", value: "10", tone: "text-[#0c1a1f]" },
      { label: "Agent drafts", value: "5", tone: "text-primary" },
      { label: "Proposals out", value: "6", tone: "text-amber-700" },
      { label: "Kickoffs", value: "3", tone: "text-[#0c1a1f]" },
    ],
    attention: [
      "Priya Shah — proposal follow-up due",
      "Growth audit — missing company size",
      "Launch sprint — kickoff packet incomplete",
    ],
    queueTitle: "Enquiry queue",
    queueRows: [
      { name: "Priya Shah", detail: "Launch sprint", status: "Proposal sent", tone: "text-amber-700" },
      { name: "Chris Adeyemi", detail: "Retainer", status: "Ready for call", tone: "text-primary" },
      { name: "Elena Voss", detail: "Growth audit", status: "Needs details", tone: "text-[#5a6b72]" },
      { name: "Marcus Trent", detail: "Brand system", status: "Won", tone: "text-primary" },
    ],
    customers: ["Priya Shah", "Chris Adeyemi", "Elena Voss", "Marcus Trent", "Jamie Lee", "Noah Okonkwo"],
    orders: [
      { id: "INV-221", name: "Launch sprint", status: "Paid", total: "€18,500" },
      { id: "INV-220", name: "Retainer · Apr", status: "Due", total: "€8,000" },
      { id: "INV-219", name: "Growth audit", status: "Paid", total: "€4,200" },
    ],
    agentDraft:
      "Hi Priya — checking whether you had questions on the launch sprint scope. Happy to walk timeline on a short call this week.",
  },
};

export function ClinicOsDemo() {
  const reduce = useReducedMotion();
  const [industry, setIndustry] = useState<IndustryId>("b2b");
  const [view, setView] = useState<View>("overview");
  const [assisted, setAssisted] = useState(false);
  const data = industries[industry];

  return (
    <div className="flex h-[calc(100dvh-3.5rem)] flex-col bg-[#071216]">
      <div className="shrink-0 border-b border-white/10 bg-[#0c1a1f] px-3 py-2.5 sm:px-4">
        <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.16em] text-white/45">
          Industry
        </p>
        <div className="flex gap-2 overflow-x-auto pb-0.5">
          {(Object.keys(industries) as IndustryId[]).map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => {
                setIndustry(id);
                setView("overview");
                setAssisted(false);
              }}
              className={cn(
                "shrink-0 rounded-full px-3 py-1.5 text-xs font-medium",
                industry === id
                  ? "bg-primary text-white"
                  : "bg-white/10 text-white/70"
              )}
            >
              {industries[id].label}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto flex h-full w-full max-w-[1400px] overflow-hidden border-x border-white/5 bg-[#f1f5f4]">
        <aside className="hidden w-56 shrink-0 flex-col border-r border-[#d5e0dd] bg-[#0c1a1f] text-white md:flex">
          <div className="border-b border-white/10 px-4 py-4">
            <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/40">
              Business OS
            </p>
            <p className="mt-1 font-display text-lg font-semibold">{data.brand}</p>
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
              <span className="truncate">{data.search}</span>
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
                key={`${industry}-${view}-${String(assisted)}`}
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0 }}
                transition={{ duration: 0.22 }}
              >
                {view === "overview" ? (
                  <Overview data={data} onQueue={() => setView("queue")} />
                ) : null}
                {view === "queue" ? (
                  <Queue data={data} onAgents={() => setView("agents")} />
                ) : null}
                {view === "customers" ? <Customers data={data} /> : null}
                {view === "orders" ? <Orders data={data} /> : null}
                {view === "agents" ? (
                  <Agents
                    draft={data.agentDraft}
                    assisted={assisted}
                    onAssist={() => setAssisted(true)}
                  />
                ) : null}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

function Overview({
  data,
  onQueue,
}: {
  data: (typeof industries)[IndustryId];
  onQueue: () => void;
}) {
  return (
    <div>
      <h2 className="font-display text-3xl font-semibold text-[#0c1a1f]">
        Today at {data.brand.replace(" Ops", "")}
      </h2>
      <p className="mt-2 text-sm text-[#5a6b72]">
        One operating layer for pipeline, customers, commerce, and agents.
      </p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {data.stats.map((stat) => (
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
            {data.attention.map((item) => (
              <li
                key={item}
                className="flex items-center justify-between gap-3 text-sm text-[#12252c]"
              >
                <span className="min-w-0 truncate">{item}</span>
                <button
                  type="button"
                  onClick={onQueue}
                  className="shrink-0 text-xs font-semibold text-primary"
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

function Queue({
  data,
  onAgents,
}: {
  data: (typeof industries)[IndustryId];
  onAgents: () => void;
}) {
  return (
    <div>
      <h2 className="font-display text-3xl font-semibold text-[#0c1a1f]">
        {data.queueTitle}
      </h2>
      <div className="mt-5 overflow-hidden rounded-2xl border border-[#d5e0dd] bg-white">
        {data.queueRows.map((row, index) => (
          <div
            key={row.name}
            className={cn(
              "flex items-center justify-between gap-3 px-4 py-4 sm:px-5",
              index > 0 && "border-t border-[#e4ecea]"
            )}
          >
            <div>
              <p className="text-sm font-semibold text-[#0c1a1f]">{row.name}</p>
              <p className="text-xs text-[#5a6b72]">{row.detail}</p>
            </div>
            <span className={cn("text-xs font-semibold", row.tone)}>
              {row.status}
            </span>
          </div>
        ))}
      </div>
      <Button className="mt-5 touch-manipulation" onClick={onAgents}>
        Ask agent to draft follow-up
      </Button>
    </div>
  );
}

function Customers({ data }: { data: (typeof industries)[IndustryId] }) {
  return (
    <div>
      <h2 className="font-display text-3xl font-semibold text-[#0c1a1f]">
        Customers
      </h2>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {data.customers.map((name) => (
          <div
            key={name}
            className="rounded-2xl border border-[#d5e0dd] bg-white p-4"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0c1a1f] text-sm font-semibold text-white">
              {name
                .split(" ")
                .map((p) => p[0])
                .join("")
                .slice(0, 2)}
            </div>
            <p className="mt-3 text-sm font-semibold text-[#0c1a1f]">{name}</p>
            <p className="mt-1 text-xs text-[#5a6b72]">Active · history available</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Orders({ data }: { data: (typeof industries)[IndustryId] }) {
  return (
    <div>
      <h2 className="font-display text-3xl font-semibold text-[#0c1a1f]">Orders</h2>
      <div className="mt-5 overflow-hidden rounded-2xl border border-[#d5e0dd] bg-white">
        {data.orders.map((order, index) => (
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
  draft,
  assisted,
  onAssist,
}: {
  draft: string;
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
              Draft follow-up ready for approval
            </p>
            <p className="mt-3 rounded-2xl bg-[#f1f5f4] p-4 text-sm leading-relaxed text-[#12252c]">
              “{draft}”
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
