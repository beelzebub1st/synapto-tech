import { FadeIn } from "@/components/marketing/fade-in";
import {
  Section,
  SectionEyebrow,
  SectionHeading,
  SectionLead,
} from "@/components/marketing/section";

const steps = [
  {
    step: "01",
    title: "Discover",
    text: "We map brand, patient journeys, apps, and the systems your team already depends on.",
  },
  {
    step: "02",
    title: "Build",
    text: "We design and ship the website, PWA/app surfaces, AI workflows, and operating dashboard.",
  },
  {
    step: "03",
    title: "Launch",
    text: "Domains, payments readiness, training, and go-live support—so day one is calm.",
  },
  {
    step: "04",
    title: "Grow",
    text: "We keep converting and iterating—funnels, agents, and product surfaces together.",
  },
] as const;

export function HowItWorksSection() {
  return (
    <Section id="how-it-works" className="bg-off-white">
      <FadeIn>
        <SectionEyebrow>How it works</SectionEyebrow>
        <SectionHeading>From first call to a live operating system.</SectionHeading>
        <SectionLead>
          A clear path from strategy to launch and ongoing growth—so your clinic
          always knows what comes next.
        </SectionLead>
      </FadeIn>

      <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
        {steps.map((item, index) => (
          <FadeIn key={item.step} delay={0.05 * index}>
            <div className="h-full border-t border-primary/30 pt-5">
              <p className="font-mono text-xs font-medium text-primary">
                {item.step}
              </p>
              <h3 className="mt-3 font-display text-xl font-semibold text-midnight">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.text}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}
