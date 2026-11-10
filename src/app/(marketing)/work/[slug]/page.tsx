import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { PageHero } from "@/components/marketing/page-hero";
import { FadeIn } from "@/components/marketing/fade-in";
import { Section } from "@/components/marketing/section";
import { Button } from "@/components/ui/button";
import { caseStudies, getCaseStudy } from "@/content/case-studies";
import { pageMetadata } from "@/lib/page-metadata";

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  return pageMetadata(study.clinic, study.summary, {
    path: `/work/${study.slug}`,
  });
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  return (
    <>
      <PageHero
        eyebrow={`${study.type} · ${study.package}`}
        title={study.headline}
        lead={study.summary}
      />
      <Section className="pt-0 md:pt-4">
        <FadeIn>
          <div className="grid gap-4 sm:grid-cols-3">
            {study.metrics.map((metric) => (
              <div
                key={metric.label}
                className="border-t border-primary/30 pt-4"
              >
                <p className="font-display text-4xl font-semibold text-midnight">
                  {metric.value}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>
        <FadeIn delay={0.06}>
          <div className="mt-12 max-w-2xl">
            <h2 className="font-display text-2xl font-semibold text-midnight">
              What we delivered for {study.clinic}
            </h2>
            <ul className="mt-6 space-y-3">
              {study.delivered.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-sm text-midnight"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>
        <div className="mt-12 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/book-a-demo">
              Book a strategy call
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/start">Get my package recommendation</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/work">All case studies</Link>
          </Button>
        </div>
      </Section>
    </>
  );
}
