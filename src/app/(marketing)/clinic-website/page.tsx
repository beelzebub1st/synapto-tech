import Link from "next/link";
import { Check } from "lucide-react";
import { FinalCtaSection } from "@/components/marketing/homepage/final-cta";
import { LeadForm } from "@/components/marketing/lead-form";
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
import {
  clinicDeliverables,
  clinicHelpAreas,
  clinicPainPoints,
  clinicWebsiteCopy,
  clinicWebsitePackage,
} from "@/content/clinic-website";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata(
  "Clinic Website & Branding",
  "Premium clinic websites and branding for medical, wellness, aesthetic, and longevity practices. Start your redesign with Synapto Tech.",
  { path: "/clinic-website" }
);

export default function ClinicWebsitePage() {
  return (
    <>
      <PageHero
        eyebrow={clinicWebsiteCopy.eyebrow}
        title={clinicWebsiteCopy.headline}
        lead={clinicWebsiteCopy.support}
      >
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Button asChild size="lg" className="w-full sm:w-auto">
            <Link href="#start-project">{clinicWebsiteCopy.primaryCta}</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
            <Link href="#whats-included">{clinicWebsiteCopy.secondaryCta}</Link>
          </Button>
        </div>
      </PageHero>

      <Section className="bg-white pt-0">
        <FadeIn>
          <SectionEyebrow>Why clinics redesign with us</SectionEyebrow>
          <SectionHeading>
            Your digital presence should feel as clinical and premium as your practice.
          </SectionHeading>
          <SectionLead>
            Patients decide quickly. A clear brand and website help them trust your
            clinic, understand your services, and take the next step.
          </SectionLead>
        </FadeIn>
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {clinicPainPoints.map((item, i) => (
            <FadeIn key={item.title} delay={0.04 * i}>
              <div className="h-full rounded-2xl border border-border/80 bg-off-white/70 p-5">
                <h3 className="font-semibold text-midnight">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.text}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      <Section id="whats-included" className="bg-off-white">
        <FadeIn>
          <SectionEyebrow>What’s included</SectionEyebrow>
          <SectionHeading>Website + branding built specifically for clinics.</SectionHeading>
          <SectionLead>
            Not a generic agency package. A clinical digital launch designed around
            trust, clarity, and conversion.
          </SectionLead>
        </FadeIn>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {clinicDeliverables.map((item, i) => (
            <FadeIn key={item.title} delay={0.04 * i}>
              <article className="h-full rounded-3xl border border-border/80 bg-white p-5 sm:p-6">
                <h3 className="text-lg font-semibold text-midnight">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.text}
                </p>
                <ul className="mt-4 space-y-2 border-t border-border/70 pt-4">
                  {item.items.map((line) => (
                    <li
                      key={line}
                      className="flex items-center gap-2 text-sm text-midnight/85"
                    >
                      <Check className="h-4 w-4 shrink-0 text-primary" />
                      {line}
                    </li>
                  ))}
                </ul>
              </article>
            </FadeIn>
          ))}
        </div>
      </Section>

      <Section className="bg-white">
        <FadeIn>
          <SectionEyebrow>How we help clinically oriented brands</SectionEyebrow>
          <SectionHeading>Practical support for real clinic workflows.</SectionHeading>
        </FadeIn>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {clinicHelpAreas.map((item, i) => (
            <FadeIn key={item.title} delay={0.03 * i}>
              <div className="h-full rounded-2xl border border-border/80 bg-off-white/60 p-5">
                <h3 className="font-semibold text-midnight">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.text}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      <Section id="start-project" className="bg-off-white">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <FadeIn>
            <SectionEyebrow>Clinic Website & Branding Launch</SectionEyebrow>
            <SectionHeading>{clinicWebsitePackage.name}</SectionHeading>
            <SectionLead>{clinicWebsitePackage.summary}</SectionLead>
            <ul className="mt-6 space-y-2.5">
              {clinicWebsitePackage.includes.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-sm text-midnight/85"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-6 rounded-2xl border border-border/80 bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                Ideal for
              </p>
              <ul className="mt-3 space-y-2">
                {clinicWebsitePackage.idealFor.map((item) => (
                  <li key={item} className="text-sm text-muted-foreground">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          <FadeIn delay={0.08}>
            <Card className="border-border/80 shadow-[0_16px_40px_rgba(16,24,32,0.06)]">
              <CardContent className="p-5 sm:p-7">
                <p className="text-lg font-semibold text-midnight">
                  Request your clinic website project
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Tell us about your practice. We’ll follow up with a scoped plan
                  for branding, website, and launch.
                </p>
                <div className="mt-6">
                  <LeadForm
                    intent="demo"
                    defaultInterest="Website + branding package"
                  />
                </div>
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </Section>

      <FinalCtaSection />
    </>
  );
}
