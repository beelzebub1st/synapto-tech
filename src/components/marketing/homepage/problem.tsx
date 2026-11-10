import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/marketing/fade-in";
import {
  Section,
  SectionEyebrow,
  SectionHeading,
  SectionLead,
} from "@/components/marketing/section";
import { Button } from "@/components/ui/button";

const problems = [
  {
    title: "Too many vendors",
    text: "A site agency, an app freelancer, a no-code tool, and an automation stack—nobody owns the outcome.",
  },
  {
    title: "Templates that do not convert",
    text: "Generic builders were never designed for clinical trust, regulated offers, or patient journeys.",
  },
  {
    title: "Disconnected systems",
    text: "Website, CRM, intake, and dashboard live in different worlds—so staff retype everything.",
  },
  {
    title: "No lasting partner",
    text: "Most projects end at launch. Your team is left maintaining a stack they did not design.",
  },
] as const;

export function ProblemSection() {
  return (
    <Section className="bg-white">
      <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end lg:gap-16">
        <FadeIn>
          <SectionEyebrow>Why Synapto</SectionEyebrow>
          <SectionHeading>
            Stop assembling pieces. Get a converting digital system.
          </SectionHeading>
          <SectionLead>
            Synapto replaces the agency + builder + app scramble with one partner
            accountable for websites, apps, PWAs, AI, and operations.
          </SectionLead>
          <Button asChild className="mt-6 touch-manipulation" size="lg">
            <Link href="/book-a-demo">
              Get a tailored plan
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </FadeIn>
        <FadeIn delay={0.08}>
          <div className="grid gap-6 sm:grid-cols-2">
            {problems.map((item) => (
              <div key={item.title} className="border-t border-border/90 pt-4">
                <h3 className="font-display text-lg font-semibold text-midnight">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </Section>
  );
}
