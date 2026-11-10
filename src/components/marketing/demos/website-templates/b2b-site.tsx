"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, FileText, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { BrowserChrome } from "./browser-chrome";

type Page = "home" | "solutions" | "specs" | "rfq";

const solutions = [
  {
    code: "01",
    title: "Industrial components",
    blurb: "Filterable catalog with account pricing and downloadable specs.",
  },
  {
    code: "02",
    title: "Custom assemblies",
    blurb: "Guided RFQ that captures drawings, MOQ, and need-by dates.",
  },
  {
    code: "03",
    title: "Partner portal",
    blurb: "Status, documents, and reorder for approved accounts.",
  },
];

export function B2bSiteDemo() {
  const reduce = useReducedMotion();
  const [page, setPage] = useState<Page>("home");
  const [sent, setSent] = useState(false);

  return (
    <div className="flex h-full flex-col bg-[#0b1220] text-white">
      <BrowserChrome domain="atlasindustrial.com" accent="bg-[#111827]" />

      <header className="flex items-center justify-between gap-3 border-b border-white/10 bg-[#0b1220] px-4 py-3 sm:px-6">
        <button
          type="button"
          onClick={() => {
            setPage("home");
            setSent(false);
          }}
          className="font-display text-lg font-semibold tracking-tight sm:text-xl"
        >
          Atlas Industrial
        </button>
        <nav className="hidden items-center gap-1 md:flex">
          {(
            [
              ["home", "Overview"],
              ["solutions", "Solutions"],
              ["specs", "Specs"],
              ["rfq", "RFQ"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => {
                setPage(id);
                setSent(false);
              }}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium transition",
                page === id
                  ? "bg-white/10 text-white"
                  : "text-white/55 hover:text-white"
              )}
            >
              {label}
            </button>
          ))}
        </nav>
        <Button
          size="sm"
          className="bg-[#0f766e] hover:bg-[#0d5f59]"
          onClick={() => {
            setPage("rfq");
            setSent(false);
          }}
        >
          Request quote
        </Button>
      </header>

      <div className="flex gap-1 overflow-x-auto border-b border-white/10 px-3 py-2 md:hidden">
        {(["home", "solutions", "specs", "rfq"] as Page[]).map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setPage(item)}
            className={cn(
              "shrink-0 rounded-md px-3 py-1.5 text-xs font-medium capitalize",
              page === item ? "bg-white/15 text-white" : "bg-white/5 text-white/55"
            )}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={page + String(sent)}
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.22 }}
          >
            {page === "home" ? (
              <>
                <section className="grid border-b border-white/10 lg:grid-cols-[1.15fr_0.85fr]">
                  <div className="px-5 py-12 sm:px-8 sm:py-16">
                    <p className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-[#5eead4]">
                      <Shield className="h-3.5 w-3.5" />
                      B2B platform
                    </p>
                    <h1 className="mt-4 font-display text-[clamp(2.3rem,5vw,4rem)] font-semibold leading-[1.02]">
                      Specify faster. Quote cleaner. Close with confidence.
                    </h1>
                    <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/60 sm:text-base">
                      Dark, dense B2B layout built for procurement: proof metrics, solution
                      codes, specs, and an RFQ path — not a lifestyle brochure.
                    </p>
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                      <Button
                        size="lg"
                        className="bg-[#0f766e] hover:bg-[#0d5f59]"
                        onClick={() => setPage("rfq")}
                      >
                        Start RFQ
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                      <Button
                        size="lg"
                        variant="outline"
                        className="border-white/20 bg-transparent text-white hover:bg-white/10"
                        onClick={() => setPage("solutions")}
                      >
                        Browse solutions
                      </Button>
                    </div>
                  </div>
                  <div className="border-t border-white/10 bg-[#111827] p-5 sm:p-8 lg:border-l lg:border-t-0">
                    <p className="text-xs uppercase tracking-[0.16em] text-white/40">
                      Buyer snapshot
                    </p>
                    <div className="mt-4 grid grid-cols-2 gap-3">
                      {[
                        { label: "Avg. RFQ cycle", value: "9 days" },
                        { label: "Spec downloads", value: "2.4k" },
                        { label: "Account buyers", value: "180+" },
                        { label: "On-time quotes", value: "97%" },
                      ].map((stat) => (
                        <div
                          key={stat.label}
                          className="rounded-xl border border-white/10 bg-white/5 p-4"
                        >
                          <p className="font-display text-2xl font-semibold text-[#5eead4]">
                            {stat.value}
                          </p>
                          <p className="mt-1 text-xs text-white/50">{stat.label}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 rounded-xl border border-white/10 bg-[#0b1220] p-4">
                      <p className="text-xs text-white/45">Next step for buyers</p>
                      <p className="mt-2 text-sm font-medium">
                        Upload drawings → get completeness check → sales follows up.
                      </p>
                    </div>
                  </div>
                </section>
                <section className="px-5 py-10 sm:px-8">
                  <div className="mb-5 flex items-end justify-between gap-4">
                    <h2 className="font-display text-2xl font-semibold">Core solutions</h2>
                    <button
                      type="button"
                      className="text-sm text-[#5eead4]"
                      onClick={() => setPage("solutions")}
                    >
                      View all
                    </button>
                  </div>
                  <div className="grid gap-3 md:grid-cols-3">
                    {solutions.map((item) => (
                      <button
                        key={item.code}
                        type="button"
                        onClick={() => setPage("rfq")}
                        className="rounded-xl border border-white/10 bg-white/[0.03] p-5 text-left transition hover:border-[#0f766e]/50"
                      >
                        <p className="font-mono text-xs text-[#5eead4]">{item.code}</p>
                        <p className="mt-3 font-semibold">{item.title}</p>
                        <p className="mt-2 text-sm text-white/55">{item.blurb}</p>
                      </button>
                    ))}
                  </div>
                </section>
              </>
            ) : null}

            {page === "solutions" ? (
              <section className="px-5 py-10 sm:px-8">
                <p className="text-xs uppercase tracking-[0.16em] text-[#5eead4]">Solutions</p>
                <h2 className="mt-3 font-display text-3xl font-semibold">
                  Built for how procurement buys.
                </h2>
                <div className="mt-8 space-y-3">
                  {solutions.map((item) => (
                    <div
                      key={item.code}
                      className="grid gap-4 rounded-xl border border-white/10 bg-[#111827] p-5 md:grid-cols-[80px_1fr_auto] md:items-center"
                    >
                      <p className="font-mono text-sm text-[#5eead4]">{item.code}</p>
                      <div>
                        <p className="font-semibold">{item.title}</p>
                        <p className="mt-1 text-sm text-white/55">{item.blurb}</p>
                      </div>
                      <Button
                        size="sm"
                        className="bg-[#0f766e] hover:bg-[#0d5f59]"
                        onClick={() => setPage("rfq")}
                      >
                        Request quote
                      </Button>
                    </div>
                  ))}
                </div>
              </section>
            ) : null}

            {page === "specs" ? (
              <section className="px-5 py-10 sm:px-8">
                <div className="mb-6 flex items-center gap-2">
                  <FileText className="h-4 w-4 text-[#5eead4]" />
                  <p className="text-xs uppercase tracking-[0.16em] text-[#5eead4]">
                    Spec library
                  </p>
                </div>
                <h2 className="font-display text-3xl font-semibold">
                  Technical docs buyers can trust.
                </h2>
                <div className="mt-8 overflow-hidden rounded-xl border border-white/10">
                  <div className="grid grid-cols-[1.2fr_0.8fr_0.6fr] gap-2 border-b border-white/10 bg-[#111827] px-4 py-3 text-xs uppercase tracking-[0.12em] text-white/40">
                    <span>Document</span>
                    <span>Category</span>
                    <span>Updated</span>
                  </div>
                  {[
                    ["ATLAS-COMP-220.pdf", "Components", "Mar 2026"],
                    ["ASSEMBLY-GUIDE-v4.pdf", "Assemblies", "Feb 2026"],
                    ["MOQ-LEADTIMES.xlsx", "Commercial", "Jan 2026"],
                    ["PARTNER-PORTAL-SLA.pdf", "Accounts", "Jan 2026"],
                  ].map((row) => (
                    <button
                      key={row[0]}
                      type="button"
                      onClick={() => setPage("rfq")}
                      className="grid w-full grid-cols-[1.2fr_0.8fr_0.6fr] gap-2 border-b border-white/5 px-4 py-3 text-left text-sm last:border-0 hover:bg-white/[0.03]"
                    >
                      <span className="truncate font-medium text-[#5eead4]">{row[0]}</span>
                      <span className="text-white/55">{row[1]}</span>
                      <span className="text-white/40">{row[2]}</span>
                    </button>
                  ))}
                </div>
              </section>
            ) : null}

            {page === "rfq" ? (
              <section className="px-5 py-10 sm:px-8">
                {sent ? (
                  <div className="mx-auto max-w-lg rounded-xl border border-[#0f766e]/40 bg-[#0f766e]/10 p-8 text-center">
                    <p className="font-display text-2xl font-semibold">RFQ received</p>
                    <p className="mt-2 text-sm text-white/60">
                      Completeness agent can flag missing drawings before sales digs in.
                    </p>
                  </div>
                ) : (
                  <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[0.85fr_1.15fr]">
                    <div>
                      <p className="text-xs uppercase tracking-[0.16em] text-[#5eead4]">
                        Request a quote
                      </p>
                      <h2 className="mt-3 font-display text-3xl font-semibold">
                        Tell us what you’re buying.
                      </h2>
                      <ul className="mt-5 space-y-2 text-sm text-white/55">
                        {[
                          "Required fields sales needs first",
                          "Routes into Business OS lead queue",
                          "Humans approve customer-facing replies",
                        ].map((line) => (
                          <li key={line} className="flex gap-2">
                            <Check className="mt-0.5 h-4 w-4 text-[#5eead4]" />
                            {line}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <form
                      className="space-y-3 rounded-xl border border-white/10 bg-[#111827] p-5"
                      onSubmit={(e) => {
                        e.preventDefault();
                        setSent(true);
                      }}
                    >
                      <Input
                        placeholder="Company"
                        required
                        className="h-12 border-white/15 bg-white/5 text-white placeholder:text-white/30"
                      />
                      <Input
                        placeholder="Buyer name"
                        required
                        className="h-12 border-white/15 bg-white/5 text-white placeholder:text-white/30"
                      />
                      <Input
                        type="email"
                        placeholder="Work email"
                        required
                        className="h-12 border-white/15 bg-white/5 text-white placeholder:text-white/30"
                      />
                      <select className="flex h-12 w-full rounded-xl border border-white/15 bg-[#0b1220] px-3 text-sm text-white">
                        <option>Components catalog</option>
                        <option>Custom assembly</option>
                        <option>Partner program</option>
                      </select>
                      <textarea
                        className="min-h-28 w-full rounded-xl border border-white/15 bg-white/5 px-3 py-3 text-sm text-white placeholder:text-white/30"
                        placeholder="Part numbers, MOQ, need-by date, drawing notes…"
                      />
                      <Button type="submit" size="lg" className="w-full bg-[#0f766e] hover:bg-[#0d5f59]">
                        Submit RFQ
                      </Button>
                    </form>
                  </div>
                )}
              </section>
            ) : null}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
