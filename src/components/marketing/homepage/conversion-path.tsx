import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/marketing/fade-in";
import {
  Section,
  SectionHeading,
  SectionLead,
} from "@/components/marketing/section";
import { Button } from "@/components/ui/button";

const paths = [
  {
    step: "01",
    title: "Take the quiz",
    text: "Two minutes to a scored Presence, Product, or System recommendation.",
    href: "/start",
    cta: "Start quiz",
  },
  {
    step: "02",
    title: "Click the demos",
    text: "Walk website, PWA, and Clinic OS flows before you talk to anyone.",
    href: "/demos",
    cta: "Open demos",
  },
  {
    step: "03",
    title: "Book or reserve",
    text: "Pick a live strategy slot — or reserve project start with a deposit.",
    href: "/book-a-demo",
    cta: "Book a call",
  },
] as const;

export function ConversionPathSection() {
  return (
    <Section className="bg-off-white">
      <div className="mx-auto max-w-3xl text-center">
        <FadeIn>
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-primary">
            How buying works
          </p>
          <SectionHeading className="mx-auto">
            Self-serve proof. Human kickoff.
          </SectionHeading>
          <SectionLead className="mx-auto">
            No third-party calendar embed. Our own booking, quiz, demos, and
            deposit flow — wired to get you to a clear next step.
          </SectionLead>
        </FadeIn>
      </div>
      <div className="mt-12 grid gap-5 lg:grid-cols-3">
        {paths.map((item, index) => (
          <FadeIn key={item.step} delay={0.05 * index}>
            <article className="flex h-full flex-col border border-border/90 bg-white p-6 sm:p-7">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
                {item.step}
              </p>
              <h3 className="mt-3 font-display text-2xl font-semibold text-midnight">
                {item.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {item.text}
              </p>
              <Button asChild className="mt-6 w-full touch-manipulation" variant="outline">
                <Link href={item.href}>
                  {item.cta}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </article>
          </FadeIn>
        ))}
      </div>
      <div className="mt-8 text-center">
        <Button asChild size="lg" className="touch-manipulation">
          <Link href="/reserve">
            Or reserve project start
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </Section>
  );
}
