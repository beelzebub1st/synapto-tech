import Link from "next/link";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { brand } from "@/content/brand";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata(
  "Pricing",
  "Consultation-led pricing for Synapto Tech—websites, commerce, apps, and AI automations scoped to your business.",
  { path: "/pricing" }
);

const packages = [
  {
    name: "Essentials",
    summary:
      "A polished digital presence and core commerce setup to start selling professionally.",
    includes: [
      "Brand-aligned website or storefront",
      "Catalog & order management basics",
      "Essential integrations checklist",
      "Launch training for your team",
    ],
  },
  {
    name: "Growth",
    summary:
      "Commerce plus AI automations and deeper operations for teams ready to scale.",
    includes: [
      "Everything in Essentials",
      "AI lead & follow-up automations",
      "Full operations dashboard",
      "Analytics and ongoing optimization cadence",
    ],
    featured: true,
  },
  {
    name: "Enterprise",
    summary:
      "Custom workflows, multi-location needs, and coordinated digital transformation.",
    includes: [
      "Everything in Growth",
      "Custom digital solutions & integrations",
      "Advanced automation design",
      "Dedicated implementation partnership",
    ],
  },
];

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="Investment aligned to outcomes—not a generic SaaS meter"
        lead="Packages below are conversation starters. Scope, timeline, and pricing are confirmed after we understand your catalog, automations, and support needs."
        align="center"
      />

      <Section className="pt-0">
        <FadeIn>
          <p className="mx-auto max-w-2xl text-center text-sm leading-relaxed text-muted-foreground">
            {brand.name} pricing reflects digital scope, AI automation depth,
            commerce complexity, and ongoing support—not invented discounts.
          </p>
        </FadeIn>
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {packages.map((pkg, i) => (
            <FadeIn key={pkg.name} delay={0.06 * i}>
              <Card
                className={
                  pkg.featured
                    ? "relative h-full border-primary/40 shadow-md ring-1 ring-primary/20"
                    : "h-full"
                }
              >
                {pkg.featured ? (
                  <span className="absolute -top-3 left-5 rounded-full bg-primary px-3 py-1 text-xs font-medium text-white">
                    Most chosen
                  </span>
                ) : null}
                <CardHeader>
                  <CardTitle>{pkg.name}</CardTitle>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {pkg.summary}
                  </p>
                </CardHeader>
                <CardContent className="space-y-5">
                  <ul className="space-y-2">
                    {pkg.includes.map((line) => (
                      <li
                        key={line}
                        className="flex items-start gap-2 text-sm text-midnight/85"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        {line}
                      </li>
                    ))}
                  </ul>
                  <Button asChild className="w-full" variant={pkg.featured ? "default" : "outline"}>
                    <Link href="/book-a-demo">Talk to us</Link>
                  </Button>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
      </Section>

      <Section className="bg-white">
        <FadeIn>
          <SectionEyebrow>How scoping works</SectionEyebrow>
          <SectionHeading>Clarity before commitment</SectionHeading>
          <SectionLead>
            We define goals, recommend the right mix of solutions and
            automations, then share a written proposal—no pressure tactics.
          </SectionLead>
        </FadeIn>
      </Section>

      <FinalCtaSection />
    </>
  );
}
