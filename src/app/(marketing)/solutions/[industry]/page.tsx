import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";
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
import { Card, CardContent } from "@/components/ui/card";
import { brand, industries } from "@/content/brand";
import { getIndustryContent } from "@/content/industry-pages";
import { pageMetadata } from "@/lib/page-metadata";

type PageProps = {
  params: Promise<{ industry: string }>;
};

export function generateStaticParams() {
  return industries.map((industry) => ({ industry: industry.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { industry: slug } = await params;
  const industry = industries.find((i) => i.slug === slug);
  if (!industry) return {};

  return pageMetadata(
    `${industry.name} solutions`,
    `${industry.description} Learn how ${brand.name} supports ${industry.name.toLowerCase()}.`,
    { path: `/solutions/${slug}` }
  );
}

export default async function IndustrySolutionPage({ params }: PageProps) {
  const { industry: slug } = await params;
  const industry = industries.find((i) => i.slug === slug);
  const content = getIndustryContent(slug);

  if (!industry || !content) {
    notFound();
  }

  return (
    <>
      <PageHero
        eyebrow={industry.name}
        title={content.headline}
        lead={content.subhead}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/book-a-demo">
              Book a demo
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/features">View features</Link>
          </Button>
        </div>
      </PageHero>

      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <FadeIn>
            <SectionEyebrow>Challenges</SectionEyebrow>
            <SectionHeading className="text-3xl md:text-4xl">
              What we hear from {industry.name.toLowerCase()}
            </SectionHeading>
            <ul className="mt-8 space-y-4">
              {content.challenges.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </FadeIn>
          <FadeIn delay={0.08}>
            <SectionEyebrow>Outcomes</SectionEyebrow>
            <SectionHeading className="text-3xl md:text-4xl">
              What a connected platform unlocks
            </SectionHeading>
            <ul className="mt-8 space-y-4">
              {content.outcomes.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sage" />
                  {item}
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </Section>

      <Section className="bg-white/60">
        <FadeIn>
          <SectionEyebrow>Capabilities</SectionEyebrow>
          <SectionHeading>Built for your vertical</SectionHeading>
          <SectionLead>
            Highlights for {industry.name}—full platform capabilities live on the Features and
            Platform pages.
          </SectionLead>
        </FadeIn>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {content.highlights.map((item, i) => (
            <FadeIn key={item.title} delay={0.05 * i}>
              <Card className="h-full border-border/80">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-midnight">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
      </Section>

      <FinalCtaSection />
    </>
  );
}
