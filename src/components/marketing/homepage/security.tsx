import Link from "next/link";
import { FadeIn } from "@/components/marketing/fade-in";
import {
  Section,
  SectionEyebrow,
  SectionHeading,
  SectionLead,
} from "@/components/marketing/section";

const points = [
  "Provider verification during onboarding",
  "Product eligibility & age rules where required",
  "Jurisdiction-aware catalog configuration",
  "Secure payment provider integrations",
  "Role-based access and audit-friendly trails",
  "Legal review as part of go-live planning",
] as const;

export function SecuritySection() {
  return (
    <Section className="bg-white">
          <div className="rounded-2xl border border-border/80 bg-off-white/90 p-4 sm:rounded-3xl sm:p-6 md:p-8 lg:p-10">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-start lg:gap-8">
          <FadeIn>
            <SectionEyebrow>Trust & configuration</SectionEyebrow>
            <SectionHeading className="text-2xl sm:text-3xl md:text-3xl">
              Built with healthcare commerce requirements in mind.
            </SectionHeading>
            <SectionLead>
              Configurable controls—not blanket claims. We do not claim HIPAA
              compliance or that every medical product can be sold by default.
              Legal and regulatory review is part of onboarding.
            </SectionLead>
            <Link
              href="/healthcare-commerce-disclaimer"
              className="mt-4 inline-block text-sm font-medium text-primary hover:underline"
            >
              Read the healthcare commerce disclaimer
            </Link>
          </FadeIn>
          <FadeIn delay={0.08}>
            <ul className="grid gap-2 sm:grid-cols-2">
              {points.map((point) => (
                <li
                  key={point}
                  className="rounded-xl border border-border/70 bg-white px-3.5 py-3 text-sm text-midnight/85"
                >
                  {point}
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </div>
    </Section>
  );
}
