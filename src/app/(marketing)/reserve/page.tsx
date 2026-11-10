import { Suspense } from "react";
import Link from "next/link";
import { PageHero } from "@/components/marketing/page-hero";
import { DepositForm } from "@/components/marketing/deposit-form";
import { FadeIn } from "@/components/marketing/fade-in";
import { Section } from "@/components/marketing/section";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata(
  "Reserve project start",
  "Reserve your Synapto Tech project start with a package deposit. We’ll confirm payment details and kickoff by email.",
  { path: "/reserve" }
);

export default function ReservePage() {
  return (
    <>
      <PageHero
        eyebrow="Reserve start"
        title="Lock your place in the build queue."
        lead="Choose Presence, Product, or System, leave your details, and we’ll confirm deposit payment and kickoff within one business day."
      />
      <Section className="pt-0 md:pt-4">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <FadeIn>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Deposits reserve your start date and scope band. Prefer to talk
              first?{" "}
              <Link
                href="/book-a-demo"
                className="font-medium text-primary hover:underline"
              >
                Book a strategy call
              </Link>{" "}
              or{" "}
              <Link
                href="/start"
                className="font-medium text-primary hover:underline"
              >
                take the quiz
              </Link>
              .
            </p>
            <ul className="mt-8 space-y-3 text-sm text-muted-foreground">
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                Clear package scope before money moves
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                Human confirmation of payment details
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                Optional kickoff call after reservation
              </li>
            </ul>
          </FadeIn>
          <FadeIn delay={0.08}>
            <Suspense
              fallback={
                <div className="h-96 animate-pulse rounded-3xl bg-secondary/60" />
              }
            >
              <DepositForm />
            </Suspense>
          </FadeIn>
        </div>
      </Section>
    </>
  );
}
