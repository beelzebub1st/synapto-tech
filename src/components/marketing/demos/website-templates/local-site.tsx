"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Clock3, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { BrowserChrome } from "./browser-chrome";

type Page = "home" | "offers" | "team" | "book";

const offers = [
  {
    name: "Signature session",
    time: "60 min",
    price: "€95",
    blurb: "Flagship experience with clear inclusions and easy booking.",
  },
  {
    name: "Membership",
    time: "Monthly",
    price: "€149",
    blurb: "Recurring visits with simple perks and reminder automations.",
  },
  {
    name: "Private event",
    time: "On request",
    price: "Custom",
    blurb: "Group bookings with enquiry routing to your host team.",
  },
];

const team = [
  { name: "Sam Ortiz", role: "Owner", focus: "Experience · Community" },
  { name: "Riley Chen", role: "Lead host", focus: "Bookings · Floor" },
  { name: "Jamie Cole", role: "Events", focus: "Groups · Private" },
];

export function LocalSiteDemo() {
  const reduce = useReducedMotion();
  const [page, setPage] = useState<Page>("home");
  const [booked, setBooked] = useState(false);

  return (
    <div className="flex h-full flex-col bg-[#fff8f1] text-[#2a2118]">
      <BrowserChrome domain="cedarandco.studio" accent="bg-[#f3e7d8]" />

      <div className="flex items-center justify-between gap-3 border-b border-[#ead9c4] bg-[#2a2118] px-4 py-2 text-[11px] text-[#f7efe4] sm:px-6">
        <p className="inline-flex items-center gap-1.5">
          <MapPin className="h-3 w-3 text-[#d4a574]" />
          Two locations · Open today until 8pm
        </p>
        <p className="hidden items-center gap-1.5 sm:inline-flex">
          <Phone className="h-3 w-3 text-[#d4a574]" />
          +1 (555) 014-220
        </p>
      </div>

      <header className="flex items-center justify-between gap-3 border-b border-[#ead9c4] bg-[#fff8f1] px-4 py-3 sm:px-6">
        <button
          type="button"
          onClick={() => {
            setPage("home");
            setBooked(false);
          }}
          className="font-display text-xl font-semibold tracking-tight"
        >
          Cedar & Co.
        </button>
        <nav className="hidden items-center gap-5 text-sm md:flex">
          {(
            [
              ["home", "Home"],
              ["offers", "Offers"],
              ["team", "Team"],
              ["book", "Book"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => {
                setPage(id);
                setBooked(false);
              }}
              className={cn(
                "transition",
                page === id ? "font-semibold text-[#9a5b2f]" : "text-[#7a6a58]"
              )}
            >
              {label}
            </button>
          ))}
        </nav>
        <Button
          size="sm"
          className="bg-[#9a5b2f] hover:bg-[#7f4a24]"
          onClick={() => {
            setPage("book");
            setBooked(false);
          }}
        >
          Book online
        </Button>
      </header>

      <div className="flex gap-1 overflow-x-auto border-b border-[#ead9c4] px-3 py-2 md:hidden">
        {(["home", "offers", "team", "book"] as Page[]).map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setPage(item)}
            className={cn(
              "shrink-0 rounded-full px-3 py-1.5 text-xs font-medium capitalize",
              page === item ? "bg-[#2a2118] text-white" : "bg-[#f3e7d8] text-[#7a6a58]"
            )}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={page + String(booked)}
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.22 }}
          >
            {page === "home" ? (
              <>
                <section className="relative overflow-hidden px-5 py-14 sm:px-8 sm:py-20">
                  <div
                    className="pointer-events-none absolute inset-0 opacity-80"
                    style={{
                      background:
                        "radial-gradient(ellipse 70% 60% at 90% 10%, rgba(154,91,47,0.22), transparent 55%), radial-gradient(ellipse 50% 40% at 10% 90%, rgba(212,165,116,0.25), transparent 50%)",
                    }}
                  />
                  <div className="relative max-w-2xl">
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#9a5b2f]">
                      Local brand
                    </p>
                    <h1 className="mt-4 font-display text-[clamp(2.6rem,7vw,4.8rem)] font-semibold leading-[0.94]">
                      Look bigger than a template. Convert like a pro.
                    </h1>
                    <p className="mt-5 max-w-lg text-base leading-relaxed text-[#7a6a58]">
                      Warm local layout with hours, locations, offers, and booking first —
                      built for walk-ins and online reservations.
                    </p>
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                      <Button
                        size="lg"
                        className="bg-[#9a5b2f] hover:bg-[#7f4a24]"
                        onClick={() => setPage("book")}
                      >
                        Book a visit
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                      <Button
                        size="lg"
                        variant="outline"
                        className="border-[#ead9c4]"
                        onClick={() => setPage("offers")}
                      >
                        See offers
                      </Button>
                    </div>
                  </div>
                </section>

                <section className="grid gap-px bg-[#ead9c4] sm:grid-cols-3">
                  {[
                    { icon: Clock3, label: "Same-week bookings" },
                    { icon: MapPin, label: "Downtown + Riverside" },
                    { icon: Phone, label: "Walk-ins welcome" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center gap-3 bg-[#fff8f1] px-5 py-5 text-sm font-medium"
                    >
                      <item.icon className="h-4 w-4 text-[#9a5b2f]" />
                      {item.label}
                    </div>
                  ))}
                </section>

                <section className="px-5 py-10 sm:px-8">
                  <h2 className="font-display text-2xl font-semibold">Popular this week</h2>
                  <div className="mt-5 grid gap-3 sm:grid-cols-3">
                    {offers.map((offer) => (
                      <button
                        key={offer.name}
                        type="button"
                        onClick={() => setPage("book")}
                        className="rounded-[1.25rem] border border-[#ead9c4] bg-white p-5 text-left transition hover:border-[#9a5b2f]/50"
                      >
                        <p className="text-xs uppercase tracking-[0.14em] text-[#9a5b2f]">
                          {offer.time}
                        </p>
                        <p className="mt-2 font-display text-xl font-semibold">
                          {offer.name}
                        </p>
                        <p className="mt-2 text-sm text-[#7a6a58]">{offer.blurb}</p>
                        <p className="mt-4 font-semibold text-[#2a2118]">{offer.price}</p>
                      </button>
                    ))}
                  </div>
                </section>
              </>
            ) : null}

            {page === "offers" ? (
              <section className="px-5 py-10 sm:px-8">
                <p className="text-xs uppercase tracking-[0.18em] text-[#9a5b2f]">Offers</p>
                <h2 className="mt-3 font-display text-4xl font-semibold">
                  Offers people actually book.
                </h2>
                <div className="mt-8 space-y-4">
                  {offers.map((offer) => (
                    <div
                      key={offer.name}
                      className="flex flex-col gap-4 rounded-[1.5rem] border border-[#ead9c4] bg-white p-5 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div>
                        <p className="font-display text-2xl font-semibold">{offer.name}</p>
                        <p className="mt-1 text-sm text-[#7a6a58]">{offer.blurb}</p>
                        <p className="mt-2 text-xs uppercase tracking-[0.14em] text-[#9a5b2f]">
                          {offer.time} · {offer.price}
                        </p>
                      </div>
                      <Button
                        className="bg-[#9a5b2f] hover:bg-[#7f4a24]"
                        onClick={() => setPage("book")}
                      >
                        Book
                      </Button>
                    </div>
                  ))}
                </div>
              </section>
            ) : null}

            {page === "team" ? (
              <section className="px-5 py-10 sm:px-8">
                <p className="text-xs uppercase tracking-[0.18em] text-[#9a5b2f]">Team</p>
                <h2 className="mt-3 font-display text-4xl font-semibold">
                  Faces customers remember.
                </h2>
                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  {team.map((person, index) => (
                    <article
                      key={person.name}
                      className="overflow-hidden rounded-[1.5rem] border border-[#ead9c4] bg-white"
                    >
                      <div
                        className="h-36"
                        style={{
                          background: `linear-gradient(145deg, ${
                            index === 0
                              ? "#9a5b2f"
                              : index === 1
                                ? "#2a2118"
                                : "#d4a574"
                          }, #1a1510)`,
                        }}
                      />
                      <div className="p-5">
                        <p className="font-display text-xl font-semibold">{person.name}</p>
                        <p className="mt-1 text-sm text-[#9a5b2f]">{person.role}</p>
                        <p className="mt-2 text-sm text-[#7a6a58]">{person.focus}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ) : null}

            {page === "book" ? (
              <section className="px-5 py-10 sm:px-8">
                {booked ? (
                  <div className="mx-auto max-w-lg rounded-[1.5rem] border border-[#9a5b2f]/30 bg-white p-8 text-center">
                    <p className="font-display text-2xl font-semibold">Booking requested</p>
                    <p className="mt-2 text-sm text-[#7a6a58]">
                      In production this confirms availability and triggers reminder automations.
                    </p>
                  </div>
                ) : (
                  <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-[#9a5b2f]">
                        Book a visit
                      </p>
                      <h2 className="mt-3 font-display text-4xl font-semibold">
                        Pick a time. We’ll confirm fast.
                      </h2>
                      <div className="mt-6 space-y-3 rounded-[1.25rem] border border-[#ead9c4] bg-white p-4 text-sm text-[#7a6a58]">
                        <p className="inline-flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-[#9a5b2f]" />
                          Downtown studio · 14 Oak Street
                        </p>
                        <p className="inline-flex items-center gap-2">
                          <Clock3 className="h-4 w-4 text-[#9a5b2f]" />
                          Mon–Sat · 9:00–20:00
                        </p>
                      </div>
                    </div>
                    <form
                      className="space-y-3 rounded-[1.5rem] border border-[#ead9c4] bg-white p-5"
                      onSubmit={(e) => {
                        e.preventDefault();
                        setBooked(true);
                      }}
                    >
                      <Input placeholder="Full name" required className="h-12" />
                      <Input type="email" placeholder="Email" required className="h-12" />
                      <Input placeholder="Phone" className="h-12" />
                      <select className="flex h-12 w-full rounded-xl border border-input bg-white px-3 text-sm">
                        <option>Signature session</option>
                        <option>Membership consult</option>
                        <option>Private event</option>
                      </select>
                      <select className="flex h-12 w-full rounded-xl border border-input bg-white px-3 text-sm">
                        <option>Thu · 10:30</option>
                        <option>Thu · 14:00</option>
                        <option>Fri · 11:00</option>
                        <option>Sat · 09:30</option>
                      </select>
                      <Button
                        type="submit"
                        size="lg"
                        className="w-full bg-[#9a5b2f] hover:bg-[#7f4a24]"
                      >
                        Confirm booking request
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
