import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/marketing/fade-in";
import {
  Section,
  SectionHeading,
  SectionLead,
} from "@/components/marketing/section";
import { Button } from "@/components/ui/button";
import { caseStudies } from "@/content/case-studies";

export function CaseStudiesTeaserSection() {
  return (
    <Section id="work" className="bg-white">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <FadeIn>
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-primary">
            Case studies
          </p>
          <SectionHeading>Clinics that shipped with us</SectionHeading>
          <SectionLead>
            Presence, Product, and System packages — with the metrics that
            matter after launch.
          </SectionLead>
        </FadeIn>
        <FadeIn delay={0.05}>
          <Button asChild size="lg" variant="outline" className="touch-manipulation">
            <Link href="/work">
              View all work
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </FadeIn>
      </div>
      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {caseStudies.map((study, index) => (
          <FadeIn key={study.slug} delay={0.05 * index}>
            <Link
              href={`/work/${study.slug}`}
              className="block h-full border border-border/90 bg-off-white/40 p-6 transition hover:border-primary/40"
            >
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-primary">
                {study.package}
              </p>
              <h3 className="mt-3 font-display text-2xl font-semibold text-midnight">
                {study.clinic}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {study.headline}
              </p>
              <p className="mt-5 font-display text-3xl font-semibold text-midnight">
                {study.metrics[0]?.value}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {study.metrics[0]?.label}
              </p>
            </Link>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}
