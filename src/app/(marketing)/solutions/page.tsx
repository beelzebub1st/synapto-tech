import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FinalCtaSection } from "@/components/marketing/homepage/final-cta";
import { PageHero } from "@/components/marketing/page-hero";
import { FadeIn } from "@/components/marketing/fade-in";
import { Section, SectionEyebrow, SectionLead } from "@/components/marketing/section";
import { Card, CardContent } from "@/components/ui/card";
import { industries } from "@/content/brand";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata(
  "Solutions",
  "Industry solutions for medical clinics, wellness brands, aesthetic practices, longevity programs, healthcare brands, and telehealth businesses.",
  { path: "/solutions" }
);

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Solutions"
        title="Tailored commerce for how you practice"
        lead="Explore vertical landing pages with outcomes, challenges, and launch paths aligned to your business type."
        align="center"
      />

      <Section className="pt-0 md:pt-4">
        <FadeIn>
          <SectionEyebrow className="text-center">Industries</SectionEyebrow>
          <SectionLead className="mx-auto text-center">
            Select your industry to see how Synapto Tech supports your catalog, brand, and
            operations—not a generic retail template.
          </SectionLead>
        </FadeIn>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry, i) => (
            <FadeIn key={industry.slug} delay={0.04 * i}>
              <Link href={`/solutions/${industry.slug}`} className="group block h-full">
                <Card className="h-full border-border/80 transition-all group-hover:border-primary/30 group-hover:shadow-md">
                  <CardContent className="flex h-full flex-col p-6">
                    <h2 className="text-lg font-semibold text-midnight group-hover:text-primary">
                      {industry.name}
                    </h2>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {industry.description}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                      View solution
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            </FadeIn>
          ))}
        </div>
      </Section>

      <FinalCtaSection />
    </>
  );
}
