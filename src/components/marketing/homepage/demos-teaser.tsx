import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/marketing/fade-in";
import {
  Section,
  SectionHeading,
  SectionLead,
} from "@/components/marketing/section";
import { Button } from "@/components/ui/button";
import { demos } from "@/content/demos";

export function DemosTeaserSection() {
  return (
    <Section id="demos" className="bg-midnight text-white">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <FadeIn>
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-primary">
            Fullscreen demos
          </p>
          <SectionHeading className="text-white">
            See websites, apps, and systems before the call.
          </SectionHeading>
          <SectionLead className="text-white/65">
            Converting website, PWA, mobile app, Business OS, automations, and
            AI agents — click through the real experience.
          </SectionLead>
        </FadeIn>
        <FadeIn delay={0.05}>
          <Button asChild size="lg" className="touch-manipulation">
            <Link href="/demos">
              Enter demo gallery
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </FadeIn>
      </div>
      <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {demos.map((demo, index) => (
          <FadeIn key={demo.id} delay={0.04 * index}>
            <Link
              href={demo.href}
              className="group block h-full border border-white/15 bg-white/[0.04] p-5 transition hover:border-primary/50 hover:bg-white/[0.07]"
            >
              <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/40">
                {demo.category}
              </p>
              <p className="mt-2 font-display text-xl font-semibold text-white">
                {demo.name}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-white/55">
                {demo.tagline}
              </p>
              <p className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                Open fullscreen
                <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
              </p>
            </Link>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}
