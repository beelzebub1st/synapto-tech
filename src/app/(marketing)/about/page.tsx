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
import { brand } from "@/content/brand";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata(
  "About",
  `Learn about ${brand.name}—websites, commerce, apps, and systems for B2B, e-commerce, and growing companies.`,
  { path: "/about" }
);

const values = [
  {
    title: "Trust by design",
    body: "We build interfaces and workflows that encourage clear policies, accurate product data, and honest merchandising—not hype.",
  },
  {
    title: "Connected operations",
    body: "Storefronts should not float apart from orders and catalog management. We optimize for one connected system.",
  },
  {
    title: "Practical compliance",
    body: "We provide configurable controls and guidance for implementation—we do not claim to be your lawyer or compliance officer.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title={`${brand.name} exists for companies that need digital that actually converts`}
        lead={brand.tagline}
      />

      <Section>
        <FadeIn>
          <SectionEyebrow>Our story</SectionEyebrow>
          <SectionHeading>From fragmented tools to one accountable stack</SectionHeading>
          <SectionLead>
            We started Synapto Tech after watching B2B teams, e-commerce brands, and growing
            companies stitch together website builders, payment links, spreadsheets, and
            disconnected dashboards. Buyers noticed the friction—and teams burned time
            reconciling work instead of winning customers.
          </SectionLead>
          <div className="mt-8 max-w-3xl space-y-4 text-sm leading-relaxed text-muted-foreground md:text-base">
            <p>
              {brand.name} builds converting websites, commerce platforms, apps, PWAs, AI
              agents, and business systems—as one partner. We focus on outcomes: pipeline,
              orders, and operations that stay connected after launch.
            </p>
            <p>
              We partner with teams during onboarding to understand catalog rules, integrations,
              and policy requirements. Launch plans are phased and realistic—because a beautiful
              storefront without operational depth does not survive first holiday season.
            </p>
          </div>
        </FadeIn>
      </Section>

      <Section className="bg-white/60">
        <FadeIn>
          <SectionEyebrow>Values</SectionEyebrow>
          <SectionHeading>How we build and how we work with you</SectionHeading>
        </FadeIn>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {values.map((value, i) => (
            <FadeIn key={value.title} delay={0.05 * i}>
              <div className="h-full rounded-2xl border border-border/80 bg-white p-6">
                <h3 className="font-semibold text-midnight">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{value.body}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      <Section>
        <FadeIn>
          <SectionEyebrow>Join us</SectionEyebrow>
          <SectionHeading>Ready to talk through your catalog?</SectionHeading>
          <SectionLead>
            We would love to hear what you are building—whether you are launching your first
            storefront or replacing a patchwork stack.
          </SectionLead>
          <p className="mt-6">
            <Link href="/contact" className="text-sm font-medium text-primary hover:underline">
              Contact our team →
            </Link>
          </p>
        </FadeIn>
      </Section>

      <FinalCtaSection />
    </>
  );
}
