import Link from "next/link";
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  ClipboardCheck,
  MessageSquare,
} from "lucide-react";
import { FadeIn } from "@/components/marketing/fade-in";
import {
  Section,
  SectionEyebrow,
  SectionHeading,
  SectionLead,
} from "@/components/marketing/section";
import { Button } from "@/components/ui/button";
import { aiAgents, aiAgentsIntro } from "@/content/ai-agents";

const previewAgents = aiAgents.slice(0, 3);
const icons = [ClipboardCheck, Bot, MessageSquare] as const;

export function AiAgentsSection() {
  return (
    <Section id="ai-agents" className="overflow-hidden bg-midnight text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 85% 10%, rgba(15,118,110,0.32), transparent 55%)",
        }}
        aria-hidden
      />
      <div className="relative grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-12">
        <FadeIn>
          <SectionEyebrow className="text-primary">
            {aiAgentsIntro.eyebrow}
          </SectionEyebrow>
          <SectionHeading className="text-white">
            AI that works the way real teams actually work.
          </SectionHeading>
          <SectionLead className="text-white/65">
            Agents review applications, check missing information, draft
            replies, and keep follow-ups moving—so your people spend more time
            with customers, not paperwork.
          </SectionLead>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="w-full touch-manipulation sm:w-auto">
              <Link href="/ai-agents">
                Explore AI Agents
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full border-white/20 bg-transparent text-white touch-manipulation hover:bg-white/10 sm:w-auto"
            >
              <Link href="/book-a-demo">Add agents to your plan</Link>
            </Button>
          </div>
        </FadeIn>

        <div className="grid gap-3">
          {previewAgents.map((agent, index) => {
            const Icon = icons[index] ?? Bot;
            return (
              <FadeIn key={agent.name} delay={0.06 * index}>
                <article className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] p-4 backdrop-blur-sm sm:p-5">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-white">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/45">
                        {agent.role}
                      </p>
                      <h3 className="mt-1 text-base font-semibold text-white sm:text-lg">
                        {agent.name}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-white/65">
                        {agent.description}
                      </p>
                      <ul className="mt-3 space-y-1.5">
                        {agent.does.slice(0, 2).map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2 text-sm text-white/80"
                          >
                            <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-sage" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
