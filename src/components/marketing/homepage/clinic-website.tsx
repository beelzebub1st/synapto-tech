import Link from "next/link";
import { ArrowRight, Palette, Sparkles, Stethoscope } from "lucide-react";
import { FadeIn } from "@/components/marketing/fade-in";
import {
  Section,
  SectionEyebrow,
  SectionHeading,
  SectionLead,
} from "@/components/marketing/section";
import { Button } from "@/components/ui/button";
import {
  clinicDeliverables,
  clinicPainPoints,
  clinicWebsiteCopy,
} from "@/content/clinic-website";

export function ClinicWebsiteSection() {
  return (
    <Section id="clinic-website" className="bg-off-white">
      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-14">
        <div>
          <FadeIn>
            <SectionEyebrow>{clinicWebsiteCopy.eyebrow}</SectionEyebrow>
            <SectionHeading>{clinicWebsiteCopy.headline}</SectionHeading>
            <SectionLead>{clinicWebsiteCopy.support}</SectionLead>
          </FadeIn>

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {clinicPainPoints.map((item, index) => (
              <FadeIn key={item.title} delay={0.04 * index}>
                <div className="h-full rounded-2xl border border-border/80 bg-white p-4 shadow-[0_1px_2px_rgba(16,24,32,0.03)]">
                  <h3 className="text-sm font-semibold text-midnight">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {item.text}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.12}>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="w-full shadow-[0_8px_24px_rgba(82,107,255,0.25)] touch-manipulation sm:w-auto"
              >
                <Link href="/clinic-website">
                  {clinicWebsiteCopy.primaryCta}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-full bg-white touch-manipulation sm:w-auto"
              >
                <Link href="/book-a-demo?interest=Website+%2B+branding+package">
                  Book a branding consult
                </Link>
              </Button>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.08}>
          <div className="overflow-hidden rounded-3xl border border-border/80 bg-white shadow-[0_20px_50px_rgba(16,24,32,0.08)]">
            <div className="border-b border-border bg-[#f4f5f3] px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                <span className="ml-2 text-[11px] text-muted-foreground">
                  yourclinic.com — preview concept
                </span>
              </div>
            </div>
            <div className="space-y-4 p-5 sm:p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-midnight text-white">
                  <Stethoscope className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-midnight">
                    Northside Clinical Group
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Sample clinic brand direction
                  </p>
                </div>
              </div>
              <div className="rounded-2xl bg-gradient-to-br from-off-white via-white to-sage/20 p-5">
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-primary">
                  Care, clearly presented
                </p>
                <p className="mt-2 text-xl font-semibold tracking-tight text-midnight">
                  Modern medicine with a calmer patient experience.
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Services, providers, and next steps—designed to feel clinical,
                  premium, and easy to act on.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-full bg-midnight px-3 py-1.5 text-xs font-medium text-white">
                    Book a consultation
                  </span>
                  <span className="rounded-full border border-border bg-white px-3 py-1.5 text-xs font-medium text-midnight">
                    View services
                  </span>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  { icon: Palette, label: "Brand system" },
                  { icon: Sparkles, label: "Trust-led UX" },
                  { icon: Stethoscope, label: "Clinical clarity" },
                ].map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="rounded-xl border border-border/80 bg-off-white/80 px-3 py-3 text-center"
                  >
                    <Icon className="mx-auto h-4 w-4 text-primary" />
                    <p className="mt-2 text-xs font-medium text-midnight">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
              <ul className="space-y-2 border-t border-border/70 pt-4">
                {clinicDeliverables.slice(0, 3).map((item) => (
                  <li key={item.title} className="text-sm text-midnight/85">
                    <span className="font-medium">{item.title}</span>
                    <span className="text-muted-foreground"> — {item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </FadeIn>
      </div>
    </Section>
  );
}
