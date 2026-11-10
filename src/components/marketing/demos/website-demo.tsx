"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Clock3,
  MapPin,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type UseCaseId = "b2b" | "commerce" | "services" | "local";
type PageKey = "home" | "offer" | "people" | "contact";

const useCases: Record<
  UseCaseId,
  {
    label: string;
    brand: string;
    domain: string;
    eyebrow: string;
    headline: string;
    support: string;
    cta: string;
    secondary: string;
    nav: [string, string, string, string];
    proofs: string[];
    whyTitle: string;
    whyPoints: string[];
    quote: string;
    quoteBy: string;
    offerTitle: string;
    offers: { title: string; blurb: string; meta: string }[];
    peopleTitle: string;
    peopleLabel: string;
    people: { name: string; role: string; focus: string }[];
    contactTitle: string;
    contactLead: string;
    contactNotes: string[];
    selectOptions: string[];
  }
> = {
  b2b: {
    label: "B2B / SaaS",
    brand: "Atlas Industrial",
    domain: "atlasindustrial.com",
    eyebrow: "B2B platform",
    headline: "Specify faster. Quote cleaner. Close with confidence.",
    support:
      "A conversion-led B2B website: clear proof, technical clarity, and an RFQ path built for multi-stakeholder buyers.",
    cta: "Request a quote",
    secondary: "See solutions",
    nav: ["Home", "Solutions", "Team", "RFQ"],
    proofs: ["Enterprise-ready specs", "Account-based journeys", "Same-week demos"],
    whyTitle: "Why buyers convert",
    whyPoints: [
      "Offer paths that match how procurement actually buys",
      "Case proof and specs above the fold",
      "RFQ forms that feel precise, not spammy",
      "Mobile performance that keeps trust intact",
    ],
    quote: "“Finally a B2B site that helps sales instead of confusing them.”",
    quoteBy: "VP Sales · Mid-market manufacturer",
    offerTitle: "Solutions built for clarity.",
    offers: [
      {
        title: "Industrial components",
        blurb: "Catalog clarity with filters buyers can actually use.",
        meta: "B2B catalog",
      },
      {
        title: "Custom assemblies",
        blurb: "Guided RFQ with required fields sales needs first.",
        meta: "Quote path",
      },
      {
        title: "Partner portal",
        blurb: "Status, documents, and reorder for account holders.",
        meta: "Accounts",
      },
    ],
    peopleTitle: "Experts buyers trust before they book a call.",
    peopleLabel: "Leadership",
    people: [
      { name: "Jordan Hale", role: "CEO", focus: "Operations · Expansion" },
      { name: "Mira Elson", role: "Head of Sales", focus: "Enterprise · Partners" },
      { name: "Sofia Nguyen", role: "Solutions Lead", focus: "Specs · Onboarding" },
    ],
    contactTitle: "Tell us what you’re buying. We’ll prep the right quote.",
    contactLead: "Request a quote",
    contactNotes: [
      "Routes into Business OS lead queue",
      "Optional AI completeness check before sales follow up",
      "Human approval on anything customer-facing",
    ],
    selectOptions: ["Components catalog", "Custom assembly", "Partner program"],
  },
  commerce: {
    label: "E-commerce",
    brand: "Harbor Goods",
    domain: "harborgoods.com",
    eyebrow: "Commerce brand",
    headline: "A storefront that sells like your brand looks.",
    support:
      "Merchandising, PDP trust, and checkout paths engineered for conversion—not another generic theme.",
    cta: "Shop the drop",
    secondary: "Browse collections",
    nav: ["Home", "Shop", "Story", "Cart"],
    proofs: ["Free shipping over €75", "2–4 day delivery", "Easy returns"],
    whyTitle: "Why shoppers convert",
    whyPoints: [
      "Collections that mirror buyer intent",
      "PDPs with proof, not fluff",
      "Checkout that feels calm on mobile",
      "Post-purchase status that reduces support tickets",
    ],
    quote: "“We stopped looking like every other Shopify clone.”",
    quoteBy: "Founder · DTC brand",
    offerTitle: "Collections built to convert.",
    offers: [
      {
        title: "Essentials",
        blurb: "Everyday bestsellers with fast PDP paths.",
        meta: "Core line",
      },
      {
        title: "Limited drop",
        blurb: "Campaign landing + scarcity without gimmicks.",
        meta: "Seasonal",
      },
      {
        title: "Bundles",
        blurb: "Kits that raise AOV with clear comparisons.",
        meta: "Merch",
      },
    ],
    peopleTitle: "The team behind the brand.",
    peopleLabel: "Brand",
    people: [
      { name: "Alex Rivera", role: "Founder", focus: "Product · Brand" },
      { name: "Kim Park", role: "Growth", focus: "Acquisition · CRM" },
      { name: "Noah Blake", role: "Ops", focus: "Fulfillment · CX" },
    ],
    contactTitle: "Questions before you buy? We’ll reply fast.",
    contactLead: "Contact / order help",
    contactNotes: [
      "Routes to commerce support queue",
      "Order lookup + AI draft replies",
      "Humans approve anything brand-facing",
    ],
    selectOptions: ["Order help", "Wholesale enquiry", "Press / collab"],
  },
  services: {
    label: "Services",
    brand: "Northline Advisory",
    domain: "northline.agency",
    eyebrow: "Professional services",
    headline: "Expertise that feels premium before the first call.",
    support:
      "Authority-led website architecture with case proof, clear offers, and an enquiry path that qualifies serious clients.",
    cta: "Book a discovery call",
    secondary: "View services",
    nav: ["Home", "Services", "People", "Enquire"],
    proofs: ["Strategy-first retainers", "Remote + on-site", "Kickoff in 10 days"],
    whyTitle: "Why clients convert",
    whyPoints: [
      "Offer packaging that reduces ambiguity",
      "Proof that matches the buyer’s world",
      "Enquiry forms that filter tire-kickers",
      "Mobile readability for busy executives",
    ],
    quote: "“Our site finally sells the work the way we deliver it.”",
    quoteBy: "Managing Partner · Advisory firm",
    offerTitle: "Engagements with clear outcomes.",
    offers: [
      {
        title: "Growth audit",
        blurb: "2-week diagnostic with prioritized roadmap.",
        meta: "2 weeks",
      },
      {
        title: "Retainer partnership",
        blurb: "Ongoing strategy and execution ownership.",
        meta: "Monthly",
      },
      {
        title: "Launch sprint",
        blurb: "Focused build for a campaign or product surface.",
        meta: "6 weeks",
      },
    ],
    peopleTitle: "Partners clients want on the call.",
    peopleLabel: "Partners",
    people: [
      { name: "Elena Voss", role: "Managing Partner", focus: "Strategy · Growth" },
      { name: "Chris Adeyemi", role: "Partner", focus: "Ops · Systems" },
      { name: "Priya Shah", role: "Director", focus: "Brand · Content" },
    ],
    contactTitle: "Tell us the goal. We’ll propose the right engagement.",
    contactLead: "Start an enquiry",
    contactNotes: [
      "Routes into services pipeline",
      "AI drafts a prep brief for the call",
      "Humans own proposals and pricing",
    ],
    selectOptions: ["Growth audit", "Retainer", "Launch sprint"],
  },
  local: {
    label: "Local business",
    brand: "Cedar & Co.",
    domain: "cedarandco.studio",
    eyebrow: "Local brand",
    headline: "Look bigger than a template. Convert like a pro.",
    support:
      "A premium local website with booking, clear offers, and proof that makes walk-ins and enquiries feel easy.",
    cta: "Book online",
    secondary: "See offers",
    nav: ["Home", "Offers", "Team", "Book"],
    proofs: ["Same-week bookings", "Two locations", "Walk-ins welcome"],
    whyTitle: "Why locals convert",
    whyPoints: [
      "Offers that are obvious in seconds",
      "Photos and proof that feel real",
      "Booking without phone-tag",
      "Mobile-first from the first scroll",
    ],
    quote: "“We look like the business we actually are.”",
    quoteBy: "Owner · Multi-location studio",
    offerTitle: "Offers people actually book.",
    offers: [
      {
        title: "Signature session",
        blurb: "Flagship experience with clear inclusions.",
        meta: "60 min",
      },
      {
        title: "Membership",
        blurb: "Recurring visits with simple perks.",
        meta: "Monthly",
      },
      {
        title: "Events / groups",
        blurb: "Private bookings with enquiry routing.",
        meta: "On request",
      },
    ],
    peopleTitle: "Faces customers remember.",
    peopleLabel: "Team",
    people: [
      { name: "Sam Ortiz", role: "Owner", focus: "Experience · Community" },
      { name: "Riley Chen", role: "Lead", focus: "Bookings · Floor" },
      { name: "Jamie Cole", role: "Host", focus: "Events · Groups" },
    ],
    contactTitle: "Pick a time. We’ll confirm fast.",
    contactLead: "Book a visit",
    contactNotes: [
      "Routes into booking + CRM",
      "Reminders via automation",
      "Staff can override anytime",
    ],
    selectOptions: ["Signature session", "Membership", "Private event"],
  },
};

export function WebsiteDemo() {
  const reduce = useReducedMotion();
  const [useCase, setUseCase] = useState<UseCaseId>("b2b");
  const [page, setPage] = useState<PageKey>("home");
  const [sent, setSent] = useState(false);
  const data = useCases[useCase];
  const pageLabels = useMemo(
    () =>
      [
        { key: "home" as const, label: data.nav[0] },
        { key: "offer" as const, label: data.nav[1] },
        { key: "people" as const, label: data.nav[2] },
        { key: "contact" as const, label: data.nav[3] },
      ] as const,
    [data.nav]
  );

  function switchUseCase(id: UseCaseId) {
    setUseCase(id);
    setPage("home");
    setSent(false);
  }

  return (
    <div className="flex h-[calc(100dvh-3.5rem)] flex-col bg-[#071216]">
      <div className="shrink-0 border-b border-white/10 bg-[#0c1a1f] px-3 py-2.5 sm:px-4">
        <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.16em] text-white/45">
          Use case
        </p>
        <div className="flex gap-2 overflow-x-auto pb-0.5">
          {(Object.keys(useCases) as UseCaseId[]).map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => switchUseCase(id)}
              className={cn(
                "shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition",
                useCase === id
                  ? "bg-primary text-white"
                  : "bg-white/10 text-white/70 hover:bg-white/15"
              )}
            >
              {useCases[id].label}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-[1400px] flex-1 flex-col overflow-hidden border-x border-white/5 bg-[#f4f7f6]">
        <div className="flex items-center gap-3 border-b border-black/5 bg-[#e8eeec] px-3 py-2.5 sm:px-4">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          </div>
          <div className="flex min-w-0 flex-1 items-center rounded-lg bg-white px-3 py-1.5 text-xs text-[#5a6b72] shadow-sm">
            <ShieldCheck className="mr-2 h-3.5 w-3.5 shrink-0 text-primary" />
            <span className="truncate">{data.domain}</span>
          </div>
        </div>

        <header className="flex items-center justify-between gap-3 border-b border-[#d5e0dd] bg-white/90 px-4 py-3 backdrop-blur sm:px-8">
          <button
            type="button"
            onClick={() => setPage("home")}
            className="font-display text-lg font-semibold tracking-tight text-[#0c1a1f] sm:text-xl"
          >
            {data.brand}
          </button>
          <nav className="hidden items-center gap-1 md:flex">
            {pageLabels.map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => {
                  setPage(item.key);
                  setSent(false);
                }}
                className={cn(
                  "rounded-full px-3.5 py-2 text-sm font-medium transition",
                  page === item.key
                    ? "bg-[#0c1a1f] text-white"
                    : "text-[#5a6b72] hover:text-[#0c1a1f]"
                )}
              >
                {item.label}
              </button>
            ))}
          </nav>
          <Button
            size="sm"
            className="touch-manipulation"
            onClick={() => {
              setPage("contact");
              setSent(false);
            }}
          >
            {data.cta}
          </Button>
        </header>

        <div className="flex gap-1 overflow-x-auto border-b border-[#d5e0dd] bg-white px-3 py-2 md:hidden">
          {pageLabels.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => {
                setPage(item.key);
                setSent(false);
              }}
              className={cn(
                "shrink-0 rounded-full px-3 py-1.5 text-xs font-medium",
                page === item.key
                  ? "bg-[#0c1a1f] text-white"
                  : "bg-[#e4ecea] text-[#5a6b72]"
              )}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${useCase}-${page}-${String(sent)}`}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="min-h-full"
            >
              {page === "home" ? (
                <HomeView
                  data={data}
                  onContact={() => setPage("contact")}
                  onOffer={() => setPage("offer")}
                />
              ) : null}
              {page === "offer" ? (
                <OfferView data={data} onContact={() => setPage("contact")} />
              ) : null}
              {page === "people" ? (
                <PeopleView data={data} onContact={() => setPage("contact")} />
              ) : null}
              {page === "contact" ? (
                <ContactView
                  data={data}
                  sent={sent}
                  onSend={() => setSent(true)}
                />
              ) : null}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function HomeView({
  data,
  onContact,
  onOffer,
}: {
  data: (typeof useCases)[UseCaseId];
  onContact: () => void;
  onOffer: () => void;
}) {
  return (
    <>
      <section className="relative overflow-hidden bg-[#0c1a1f] px-5 py-14 text-white sm:px-10 sm:py-20">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 80% 20%, rgba(15,118,110,0.45), transparent 55%), radial-gradient(ellipse 50% 40% at 10% 90%, rgba(155,181,173,0.2), transparent 50%)",
          }}
        />
        <div className="relative mx-auto max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#5eead4]">
            {data.eyebrow}
          </p>
          <h1 className="mt-4 font-display text-[clamp(2.4rem,6vw,4.5rem)] font-semibold leading-[0.95] tracking-tight">
            {data.headline}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg">
            {data.support}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" onClick={onContact} className="touch-manipulation">
              {data.cta}
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={onOffer}
              className="border-white/25 bg-transparent text-white touch-manipulation hover:bg-white/10"
            >
              {data.secondary}
            </Button>
          </div>
        </div>
      </section>

      <section className="grid gap-px bg-[#d5e0dd] sm:grid-cols-3">
        {[ShieldCheck, MapPin, Clock3].map((Icon, index) => (
          <div
            key={data.proofs[index]}
            className="flex items-center gap-3 bg-white px-5 py-5 text-sm font-medium text-[#0c1a1f]"
          >
            <Icon className="h-4 w-4 text-primary" />
            {data.proofs[index]}
          </div>
        ))}
      </section>

      <section className="px-5 py-12 sm:px-10 sm:py-16">
        <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
              Conversion
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-[#0c1a1f]">
              {data.whyTitle}
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {data.whyPoints.map((line) => (
              <div
                key={line}
                className="flex gap-2.5 border-t border-primary/25 pt-4 text-sm text-[#12252c]"
              >
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                {line}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[#d5e0dd] bg-white px-5 py-12 sm:px-10">
        <div className="mx-auto flex max-w-5xl flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-1 text-primary">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <p className="mt-3 max-w-lg font-display text-2xl font-semibold text-[#0c1a1f]">
              {data.quote}
            </p>
            <p className="mt-2 text-sm text-[#5a6b72]">{data.quoteBy}</p>
          </div>
          <Button onClick={onContact} className="touch-manipulation">
            {data.cta}
          </Button>
        </div>
      </section>
    </>
  );
}

function OfferView({
  data,
  onContact,
}: {
  data: (typeof useCases)[UseCaseId];
  onContact: () => void;
}) {
  return (
    <section className="px-5 py-10 sm:px-10 sm:py-14">
      <div className="mx-auto max-w-4xl">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
          {data.nav[1]}
        </p>
        <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-[#0c1a1f]">
          {data.offerTitle}
        </h2>
        <div className="mt-10 space-y-4">
          {data.offers.map((item) => (
            <button
              key={item.title}
              type="button"
              onClick={onContact}
              className="group flex w-full flex-col gap-3 rounded-3xl border border-[#d5e0dd] bg-white p-5 text-left transition hover:border-primary/40 sm:flex-row sm:items-center sm:justify-between sm:p-6"
            >
              <div>
                <p className="font-display text-2xl font-semibold text-[#0c1a1f]">
                  {item.title}
                </p>
                <p className="mt-1 text-sm text-[#5a6b72]">{item.blurb}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs font-medium uppercase tracking-[0.14em] text-primary">
                  {item.meta}
                </span>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                  Continue
                  <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function PeopleView({
  data,
  onContact,
}: {
  data: (typeof useCases)[UseCaseId];
  onContact: () => void;
}) {
  return (
    <section className="px-5 py-10 sm:px-10 sm:py-14">
      <div className="mx-auto max-w-5xl">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
          {data.peopleLabel}
        </p>
        <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-[#0c1a1f]">
          {data.peopleTitle}
        </h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {data.people.map((person, index) => (
            <article
              key={person.name}
              className="overflow-hidden rounded-3xl border border-[#d5e0dd] bg-white"
            >
              <div
                className="h-36"
                style={{
                  background: `linear-gradient(145deg, ${
                    index === 0 ? "#0f766e" : index === 1 ? "#0c1a1f" : "#134e4a"
                  }, #071216)`,
                }}
              />
              <div className="p-5">
                <p className="font-display text-xl font-semibold text-[#0c1a1f]">
                  {person.name}
                </p>
                <p className="mt-1 text-sm text-primary">{person.role}</p>
                <p className="mt-2 text-sm text-[#5a6b72]">{person.focus}</p>
              </div>
            </article>
          ))}
        </div>
        <Button onClick={onContact} className="mt-8 touch-manipulation">
          {data.cta}
        </Button>
      </div>
    </section>
  );
}

function ContactView({
  data,
  sent,
  onSend,
}: {
  data: (typeof useCases)[UseCaseId];
  sent: boolean;
  onSend: () => void;
}) {
  if (sent) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center px-5 py-16">
        <div className="max-w-md rounded-3xl border border-primary/20 bg-white p-8 text-center shadow-[0_24px_60px_rgba(12,26,31,0.08)]">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Sparkles className="h-5 w-5" />
          </div>
          <h3 className="mt-4 font-display text-2xl font-semibold text-[#0c1a1f]">
            Enquiry received
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-[#5a6b72]">
            In production this routes to your team and optional AI follow-up —
            with humans approving anything customer-facing.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="px-5 py-10 sm:px-10 sm:py-14">
      <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
            {data.contactLead}
          </p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-[#0c1a1f]">
            {data.contactTitle}
          </h2>
          <ul className="mt-6 space-y-3 text-sm text-[#5a6b72]">
            {data.contactNotes.map((line) => (
              <li key={line} className="flex gap-2.5">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                {line}
              </li>
            ))}
          </ul>
        </div>
        <form
          className="space-y-3 rounded-3xl border border-[#d5e0dd] bg-white p-5 shadow-[0_20px_50px_rgba(12,26,31,0.05)] sm:p-7"
          onSubmit={(e) => {
            e.preventDefault();
            onSend();
          }}
        >
          <Input placeholder="Full name" required className="h-12" />
          <Input type="email" placeholder="Work email" required className="h-12" />
          <Input placeholder="Company (optional)" className="h-12" />
          <select className="flex h-12 w-full rounded-xl border border-input bg-white px-3 text-sm">
            {data.selectOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
          <textarea
            className="min-h-28 w-full rounded-xl border border-input bg-white px-3 py-3 text-sm"
            placeholder="What should we prepare?"
          />
          <Button type="submit" size="lg" className="w-full touch-manipulation">
            Submit
            <ArrowRight className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </section>
  );
}
