import { Suspense } from "react";
import Link from "next/link";
import { PageHero } from "@/components/marketing/page-hero";
import { BookingScheduler } from "@/components/marketing/booking-scheduler";
import { FadeIn } from "@/components/marketing/fade-in";
import { Section } from "@/components/marketing/section";
import { brand } from "@/content/brand";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata(
  "Book a Strategy Call",
  `Book a Synapto Tech strategy call — pick a live slot for websites, commerce, apps, PWAs, and systems.`,
  { path: "/book-a-demo" }
);

const demoTopics = [
  "High-converting websites (marketing, B2B, brand)",
  "Commerce storefronts and B2B ordering",
  "Apps / PWAs for customers and staff",
  "AI agents for leads, messaging, and calls",
  "Full Business OS for multi-team growth",
];

export default function BookADemoPage() {
  return (
    <>
      <PageHero
        eyebrow="Strategy call"
        title="Pick a time. We’ll map your first digital win."
        lead="Live booking — no Cal.com. Tell us what you need and choose a 30-minute slot. We’ll come prepared with a clear project path."
      />

      <Section className="pt-0 md:pt-4">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <FadeIn>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Strategy calls are for B2B teams, e-commerce brands, services
              firms, and growing companies exploring {brand.name}. Every
              conversation is tailored — no generic pitch deck.
            </p>
            <ul className="mt-8 space-y-3">
              {demoTopics.map((topic) => (
                <li
                  key={topic}
                  className="flex gap-3 text-sm text-muted-foreground"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {topic}
                </li>
              ))}
            </ul>
            <div className="mt-8 space-y-3 rounded-2xl border border-border/80 bg-off-white/80 p-5">
              <p className="text-sm font-semibold text-midnight">
                Prefer to self-qualify first?
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Take the 2-minute recommendation quiz, explore clickable demos,
                or reserve a project start with a deposit.
              </p>
              <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm font-medium text-primary">
                <Link href="/start" className="hover:underline">
                  Recommendation quiz
                </Link>
                <Link href="/demos" className="hover:underline">
                  Live demos
                </Link>
                <Link href="/reserve" className="hover:underline">
                  Reserve start
                </Link>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.08}>
            <Suspense
              fallback={
                <div className="h-96 animate-pulse rounded-3xl bg-secondary/60" />
              }
            >
              <BookingScheduler />
            </Suspense>
          </FadeIn>
        </div>
      </Section>
    </>
  );
}
