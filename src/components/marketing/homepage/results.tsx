import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/marketing/fade-in";
import {
  Section,
  SectionHeading,
  SectionLead,
} from "@/components/marketing/section";
import { Button } from "@/components/ui/button";
import { resultsStories } from "@/content/conversion";

export function ResultsSection() {
  return (
    <Section className="bg-off-white">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-16">
        <FadeIn>
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-primary">
            Proof that converts
          </p>
          <SectionHeading>
            Designed for bookings, not just “a nicer website.”
          </SectionHeading>
          <SectionLead>
            Conversion is the product. We measure success in qualified enquiries,
            completed intakes, and systems your staff can run without another
            vendor.
          </SectionLead>
          <Button asChild size="lg" className="mt-6 touch-manipulation">
            <Link href="/start">
              Get my conversion plan
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </FadeIn>

        <div className="grid gap-6 sm:grid-cols-3">
          {resultsStories.map((item, index) => (
            <FadeIn key={item.label} delay={0.06 * index}>
              <div className="border-t border-primary/35 pt-5">
                <p className="font-display text-4xl font-semibold tracking-tight text-midnight sm:text-5xl">
                  {item.metric}
                </p>
                <p className="mt-2 text-sm font-semibold text-midnight">
                  {item.label}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.context}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </Section>
  );
}
