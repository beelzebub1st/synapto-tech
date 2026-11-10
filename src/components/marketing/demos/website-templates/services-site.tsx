"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { BrowserChrome } from "./browser-chrome";

type Page = "home" | "services" | "work" | "enquire";

const services = [
  {
    name: "Growth audit",
    price: "From €4,200",
    time: "2 weeks",
    points: ["Funnel + offer review", "Prioritized roadmap", "Executive readout"],
  },
  {
    name: "Launch sprint",
    price: "From €18,500",
    time: "6 weeks",
    points: ["Positioning + site", "Campaign surfaces", "Launch ops plan"],
    featured: true,
  },
  {
    name: "Retainer partnership",
    price: "From €8,000 / mo",
    time: "Ongoing",
    points: ["Strategy ownership", "Monthly delivery", "Leadership cadence"],
  },
];

const cases = [
  { client: "Summit Group", result: "3.1× qualified enquiries", focus: "Multi-brand relaunch" },
  { client: "Atlas Industrial", result: "RFQ completion +62%", focus: "B2B conversion" },
  { client: "Harbor Goods", result: "Checkout +28%", focus: "Commerce redesign" },
];

export function ServicesSiteDemo() {
  const reduce = useReducedMotion();
  const [page, setPage] = useState<Page>("home");
  const [sent, setSent] = useState(false);

  return (
    <div className="flex h-full flex-col bg-[#f7f5f0] text-[#161410]">
      <BrowserChrome domain="northline.agency" accent="bg-[#efece4]" />

      <header className="flex items-center justify-between gap-3 border-b border-[#ddd6c8] bg-[#f7f5f0]/95 px-4 py-4 backdrop-blur sm:px-8">
        <button
          type="button"
          onClick={() => {
            setPage("home");
            setSent(false);
          }}
          className="font-display text-xl font-semibold tracking-tight"
        >
          Northline
        </button>
        <nav className="hidden items-center gap-6 text-sm md:flex">
          {(
            [
              ["home", "Home"],
              ["services", "Services"],
              ["work", "Work"],
              ["enquire", "Enquire"],
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
                "transition",
                page === id ? "font-semibold text-[#0f766e]" : "text-[#6f675c]"
              )}
            >
              {label}
            </button>
          ))}
        </nav>
        <Button
          size="sm"
          className="bg-[#161410] hover:bg-black"
          onClick={() => {
            setPage("enquire");
            setSent(false);
          }}
        >
          Book discovery
        </Button>
      </header>

      <div className="flex gap-1 overflow-x-auto border-b border-[#ddd6c8] px-3 py-2 md:hidden">
        {(["home", "services", "work", "enquire"] as Page[]).map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setPage(item)}
            className={cn(
              "shrink-0 rounded-full px-3 py-1.5 text-xs font-medium capitalize",
              page === item ? "bg-[#161410] text-white" : "bg-[#efece4] text-[#6f675c]"
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
                <section className="border-b border-[#ddd6c8] px-5 py-16 sm:px-10 sm:py-24">
                  <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#0f766e]">
                    Professional services
                  </p>
                  <h1 className="mt-5 max-w-4xl font-display text-[clamp(2.8rem,7vw,5.5rem)] font-semibold leading-[0.92] tracking-tight">
                    Expertise that feels premium before the first call.
                  </h1>
                  <p className="mt-6 max-w-xl text-base leading-relaxed text-[#6f675c] sm:text-lg">
                    Editorial services layout: clear packages, case proof, and a discovery path
                    that qualifies serious clients.
                  </p>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <Button
                      size="lg"
                      className="bg-[#161410] hover:bg-black"
                      onClick={() => setPage("enquire")}
                    >
                      Book a discovery call
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-[#ddd6c8]"
                      onClick={() => setPage("services")}
                    >
                      View services
                    </Button>
                  </div>
                </section>
                <section className="grid border-b border-[#ddd6c8] md:grid-cols-3">
                  {[
                    { label: "Typical kickoff", value: "10 days" },
                    { label: "Engagements live", value: "40+" },
                    { label: "Avg. enquiry lift", value: "2.8×" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="border-b border-[#ddd6c8] px-6 py-8 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0"
                    >
                      <p className="font-display text-3xl font-semibold">{item.value}</p>
                      <p className="mt-2 text-sm text-[#6f675c]">{item.label}</p>
                    </div>
                  ))}
                </section>
                <section className="px-5 py-12 sm:px-10">
                  <div className="flex items-start gap-3">
                    <Quote className="mt-1 h-5 w-5 text-[#0f766e]" />
                    <div>
                      <p className="max-w-2xl font-display text-2xl font-semibold leading-snug">
                        “Our site finally sells the work the way we deliver it.”
                      </p>
                      <p className="mt-3 text-sm text-[#6f675c]">
                        Managing Partner · Advisory firm
                      </p>
                    </div>
                  </div>
                </section>
              </>
            ) : null}

            {page === "services" ? (
              <section className="px-5 py-10 sm:px-10 sm:py-14">
                <p className="text-xs uppercase tracking-[0.18em] text-[#0f766e]">Services</p>
                <h2 className="mt-3 max-w-2xl font-display text-4xl font-semibold tracking-tight">
                  Engagements with clear outcomes.
                </h2>
                <div className="mt-10 grid gap-4 lg:grid-cols-3">
                  {services.map((service) => (
                    <article
                      key={service.name}
                      className={cn(
                        "flex h-full flex-col border p-6",
                        service.featured
                          ? "border-[#161410] bg-[#161410] text-white"
                          : "border-[#ddd6c8] bg-white"
                      )}
                    >
                      <p
                        className={cn(
                          "text-xs uppercase tracking-[0.16em]",
                          service.featured ? "text-[#9bb5ad]" : "text-[#0f766e]"
                        )}
                      >
                        {service.time}
                      </p>
                      <h3 className="mt-3 font-display text-2xl font-semibold">
                        {service.name}
                      </h3>
                      <p
                        className={cn(
                          "mt-2 text-sm font-medium",
                          service.featured ? "text-white/70" : "text-[#6f675c]"
                        )}
                      >
                        {service.price}
                      </p>
                      <ul className="mt-6 flex-1 space-y-2">
                        {service.points.map((point) => (
                          <li key={point} className="flex gap-2 text-sm">
                            <Check
                              className={cn(
                                "mt-0.5 h-4 w-4 shrink-0",
                                service.featured ? "text-[#9bb5ad]" : "text-[#0f766e]"
                              )}
                            />
                            {point}
                          </li>
                        ))}
                      </ul>
                      <Button
                        className={cn(
                          "mt-6",
                          service.featured
                            ? "bg-white text-[#161410] hover:bg-white/90"
                            : "bg-[#161410] hover:bg-black"
                        )}
                        onClick={() => setPage("enquire")}
                      >
                        Enquire
                      </Button>
                    </article>
                  ))}
                </div>
              </section>
            ) : null}

            {page === "work" ? (
              <section className="px-5 py-10 sm:px-10 sm:py-14">
                <p className="text-xs uppercase tracking-[0.18em] text-[#0f766e]">Selected work</p>
                <h2 className="mt-3 font-display text-4xl font-semibold">Proof over promises.</h2>
                <div className="mt-10 divide-y divide-[#ddd6c8] border-y border-[#ddd6c8]">
                  {cases.map((item) => (
                    <button
                      key={item.client}
                      type="button"
                      onClick={() => setPage("enquire")}
                      className="flex w-full flex-col gap-2 py-6 text-left transition hover:bg-white/60 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
                    >
                      <div>
                        <p className="font-display text-2xl font-semibold">{item.client}</p>
                        <p className="mt-1 text-sm text-[#6f675c]">{item.focus}</p>
                      </div>
                      <p className="text-sm font-semibold text-[#0f766e]">{item.result}</p>
                    </button>
                  ))}
                </div>
              </section>
            ) : null}

            {page === "enquire" ? (
              <section className="px-5 py-10 sm:px-10 sm:py-14">
                {sent ? (
                  <div className="mx-auto max-w-lg border border-[#ddd6c8] bg-white p-8 text-center">
                    <p className="font-display text-2xl font-semibold">Enquiry received</p>
                    <p className="mt-2 text-sm text-[#6f675c]">
                      In production this routes to your pipeline with an optional AI prep brief.
                    </p>
                  </div>
                ) : (
                  <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-[#0f766e]">
                        Discovery
                      </p>
                      <h2 className="mt-3 font-display text-4xl font-semibold">
                        Tell us the goal. We’ll propose the right engagement.
                      </h2>
                      <ul className="mt-6 space-y-2 text-sm text-[#6f675c]">
                        {[
                          "Filters tire-kickers before the call",
                          "Routes into services pipeline",
                          "Humans own proposals and pricing",
                        ].map((line) => (
                          <li key={line} className="flex gap-2">
                            <Check className="mt-0.5 h-4 w-4 text-[#0f766e]" />
                            {line}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <form
                      className="space-y-3 border border-[#ddd6c8] bg-white p-6"
                      onSubmit={(e) => {
                        e.preventDefault();
                        setSent(true);
                      }}
                    >
                      <Input placeholder="Full name" required className="h-12" />
                      <Input type="email" placeholder="Work email" required className="h-12" />
                      <Input placeholder="Company" className="h-12" />
                      <select className="flex h-12 w-full rounded-xl border border-input bg-white px-3 text-sm">
                        <option>Growth audit</option>
                        <option>Launch sprint</option>
                        <option>Retainer partnership</option>
                      </select>
                      <textarea
                        className="min-h-28 w-full rounded-xl border border-input px-3 py-3 text-sm"
                        placeholder="What should success look like?"
                      />
                      <Button type="submit" size="lg" className="w-full bg-[#161410] hover:bg-black">
                        Submit enquiry
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
