import Link from "next/link";
import {
  ArrowRight,
  Bot,
  ChartColumnIncreasing,
  Handshake,
  Plug,
  Smartphone,
  Sparkles,
  Store,
} from "lucide-react";
import { FadeIn } from "@/components/marketing/fade-in";
import {
  Section,
  SectionHeading,
  SectionLead,
} from "@/components/marketing/section";
import { Button } from "@/components/ui/button";
import { offerings } from "@/content/brand";

const icons = [
  Sparkles,
  Smartphone,
  Bot,
  Store,
  Plug,
  ChartColumnIncreasing,
  Handshake,
] as const;

export function OfferingsSection() {
  return (
    <Section id="solutions" className="bg-off-white">
      <div className="mx-auto max-w-3xl text-center">
        <FadeIn>
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.16em] text-primary">
            Full partnership
          </p>
          <SectionHeading className="mx-auto">
            Everything needed to launch, operate, and grow.
          </SectionHeading>
          <SectionLead className="mx-auto">
            Presence, products, AI, commerce, and ongoing partnership—scoped as
            one accountable system for small businesses through enterprise teams.
          </SectionLead>
        </FadeIn>
      </div>

      <div className="mt-12 space-y-0 border-t border-border/80">
        {offerings.map((item, index) => {
          const Icon = icons[index] ?? Sparkles;
          return (
            <FadeIn key={item.title} delay={0.03 * index}>
              <article className="grid gap-4 border-b border-border/80 py-7 md:grid-cols-[220px_1fr_220px] md:items-start md:gap-8 md:py-8">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-midnight text-white">
                    <Icon className="h-4 w-4" />
                  </span>
                  <h3 className="font-display text-lg font-semibold tracking-tight text-midnight md:hidden">
                    {item.title}
                  </h3>
                </div>
                <div>
                  <h3 className="hidden font-display text-xl font-semibold tracking-tight text-midnight md:block">
                    {item.title}
                  </h3>
                  <p className="mt-0 text-sm leading-relaxed text-muted-foreground md:mt-2 md:text-base">
                    {item.description}
                  </p>
                </div>
                <ul className="space-y-2 md:pt-1">
                  {item.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-center gap-2 text-sm text-midnight/80"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            </FadeIn>
          );
        })}
      </div>

      <FadeIn delay={0.1}>
        <div className="mt-10 flex flex-col items-start justify-between gap-5 border border-border/80 bg-white px-6 py-7 sm:flex-row sm:items-center sm:px-8">
          <p className="max-w-xl text-base font-medium text-midnight sm:text-lg">
            Tell us how your business operates today. We will map the website,
            app, AI agents, and system stack around it.
          </p>
          <Button asChild size="lg" className="touch-manipulation shrink-0">
            <Link href="/book-a-demo">
              Book your strategy call
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </FadeIn>
    </Section>
  );
}
