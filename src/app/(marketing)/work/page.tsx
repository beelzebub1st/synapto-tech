import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/marketing/page-hero";
import { ProposalForm } from "@/components/marketing/proposal-form";
import { FadeIn } from "@/components/marketing/fade-in";
import {
  Section,
  SectionHeading,
  SectionLead,
} from "@/components/marketing/section";
import { Button } from "@/components/ui/button";
import { caseStudies } from "@/content/case-studies";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata(
  "Case studies",
  "See how Synapto Tech rebuilds clinic websites, PWAs, and operating systems that convert and run the business.",
  { path: "/work" }
);

export default function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Case studies"
        title="Proof from clinics that shipped with us."
        lead="Real packages, real delivery stacks, and the metrics that matter — qualified enquiries, admin hours saved, and tools consolidated."
      />
      <Section className="pt-0 md:pt-4">
        <div className="grid gap-5 lg:grid-cols-3">
          {caseStudies.map((study, index) => (
            <FadeIn key={study.slug} delay={0.05 * index}>
              <article className="flex h-full flex-col border border-border/90 bg-white p-6 sm:p-7">
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-primary">
                  {study.type} · {study.package}
                </p>
                <h3 className="mt-3 font-display text-2xl font-semibold text-midnight">
                  {study.clinic}
                </h3>
                <p className="mt-2 text-sm font-medium text-midnight">
                  {study.headline}
                </p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {study.summary}
                </p>
                <div className="mt-5 grid grid-cols-3 gap-2 border-t border-border/70 pt-4">
                  {study.metrics.map((metric) => (
                    <div key={metric.label}>
                      <p className="font-display text-xl font-semibold text-midnight">
                        {metric.value}
                      </p>
                      <p className="mt-1 text-[11px] leading-snug text-muted-foreground">
                        {metric.label}
                      </p>
                    </div>
                  ))}
                </div>
                <Button asChild className="mt-6 w-full" variant="outline">
                  <Link href={`/work/${study.slug}`}>
                    Read case study
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </article>
            </FadeIn>
          ))}
        </div>
      </Section>

      <Section className="bg-white">
        <div className="mx-auto max-w-2xl text-center">
          <FadeIn>
            <SectionHeading className="mx-auto">
              Want a scoped outline for your clinic?
            </SectionHeading>
            <SectionLead className="mx-auto">
              Generate a package proposal outline, then reserve start or book a
              call.
            </SectionLead>
          </FadeIn>
        </div>
        <div className="mx-auto mt-10 max-w-2xl">
          <FadeIn delay={0.06}>
            <ProposalForm />
          </FadeIn>
        </div>
      </Section>
    </>
  );
}
