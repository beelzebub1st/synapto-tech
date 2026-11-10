import Link from "next/link";
import { ArrowRight, Bot, Headphones, RefreshCw, Workflow } from "lucide-react";
import { FadeIn } from "@/components/marketing/fade-in";
import {
  Section,
  SectionEyebrow,
  SectionHeading,
  SectionLead,
} from "@/components/marketing/section";
import { Button } from "@/components/ui/button";
import { aiDelivery, aiServices, aiServicesIntro } from "@/content/ai-services";

const icons = [Bot, RefreshCw, Workflow, Headphones] as const;

export function AiServicesSection() {
  return (
    <Section id="ai-services" className="overflow-hidden bg-white">
      <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end lg:gap-14">
        <FadeIn>
          <SectionEyebrow>{aiServicesIntro.eyebrow}</SectionEyebrow>
          <SectionHeading>{aiServicesIntro.title}</SectionHeading>
          <SectionLead>{aiServicesIntro.lead}</SectionLead>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="w-full touch-manipulation sm:w-auto">
              <Link href="/ai-agents">
                Explore AI agents
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full touch-manipulation sm:w-auto"
            >
              <Link href="/book-a-demo">Add AI to your plan</Link>
            </Button>
          </div>
        </FadeIn>

        <FadeIn delay={0.06}>
          <div className="grid gap-3 sm:grid-cols-3">
            {aiDelivery.map((item) => (
              <div
                key={item.step}
                className="border border-border/80 bg-off-white/70 p-4 sm:p-5"
              >
                <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-primary">
                  {item.step}
                </p>
                <p className="mt-2 font-display text-lg font-semibold text-midnight">
                  {item.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>

      <div className="mt-10 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {aiServices.map((service, index) => {
          const Icon = icons[index] ?? Bot;
          return (
            <FadeIn key={service.id} delay={0.04 * index}>
              <article className="flex h-full flex-col border border-border/90 bg-off-white/50 p-5 transition hover:border-primary/40 sm:p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold text-midnight">
                  {service.name}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {service.summary}
                </p>
                <ul className="mt-4 space-y-1.5 border-t border-border/70 pt-4">
                  {service.outcomes.map((outcome) => (
                    <li
                      key={outcome}
                      className="text-sm font-medium text-midnight/80"
                    >
                      {outcome}
                    </li>
                  ))}
                </ul>
              </article>
            </FadeIn>
          );
        })}
      </div>
    </Section>
  );
}
