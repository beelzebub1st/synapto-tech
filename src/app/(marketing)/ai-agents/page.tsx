import Link from "next/link";
import { CheckCircle2, XCircle } from "lucide-react";
import { FinalCtaSection } from "@/components/marketing/homepage/final-cta";
import { PageHero } from "@/components/marketing/page-hero";
import { FadeIn } from "@/components/marketing/fade-in";
import {
  Section,
  SectionEyebrow,
  SectionHeading,
  SectionLead,
} from "@/components/marketing/section";
import { Button } from "@/components/ui/button";
import { aiAgents, aiAgentsIntro, aiGuardrails } from "@/content/ai-agents";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata(
  "AI Agents",
  "Synapto AI Agents help teams review applications, check incomplete forms, route enquiries, and automate follow-ups—with humans in control.",
  { path: "/ai-agents" }
);

export default function AiAgentsPage() {
  return (
    <>
      <PageHero
        eyebrow={aiAgentsIntro.eyebrow}
        title={aiAgentsIntro.headline}
        lead={aiAgentsIntro.support}
      >
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Button asChild size="lg" className="w-full sm:w-auto">
            <Link href="/book-a-demo">Book a strategy call</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
            <Link href="/#solutions">See all solutions</Link>
          </Button>
        </div>
      </PageHero>

      <Section className="bg-white pt-0">
        <FadeIn>
          <SectionEyebrow>How teams use them</SectionEyebrow>
          <SectionHeading>
            Practical agents for people who deal with customers every day.
          </SectionHeading>
          <SectionLead>
            Think operations copilots: they inspect packets, prepare next steps,
            and reduce admin drag. Critical decisions stay with your people.
          </SectionLead>
        </FadeIn>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {aiAgents.map((agent, index) => (
            <FadeIn key={agent.name} delay={0.04 * index}>
              <article className="flex h-full flex-col rounded-2xl border border-border/80 bg-off-white/70 p-5 sm:p-6">
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-primary">
                  {agent.role}
                </p>
                <h3 className="mt-2 text-xl font-semibold tracking-tight text-midnight">
                  {agent.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {agent.description}
                </p>
                <div className="mt-5 grid gap-4 border-t border-border/70 pt-4 sm:grid-cols-2">
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-midnight">
                      Helps with
                    </p>
                    <ul className="space-y-1.5">
                      {agent.does.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2 text-sm text-midnight/85"
                        >
                          <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-midnight">
                      Stays out of
                    </p>
                    <ul className="space-y-1.5">
                      {agent.doesNot.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <XCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground/70" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </Section>

      <Section className="bg-off-white">
        <FadeIn>
          <SectionEyebrow>Guardrails</SectionEyebrow>
          <SectionHeading>Designed for trust, not hype.</SectionHeading>
          <SectionLead>
            Agents amplify your team. Final accountability for care, compliance,
            and patient communication remains with your practice.
          </SectionLead>
        </FadeIn>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {aiGuardrails.map((item) => (
            <li
              key={item}
              className="rounded-2xl border border-border/80 bg-white px-4 py-3.5 text-sm text-midnight/85"
            >
              {item}
            </li>
          ))}
        </ul>
      </Section>

      <FinalCtaSection />
    </>
  );
}
