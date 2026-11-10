import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FinalCtaSection } from "@/components/marketing/homepage/final-cta";
import { PageHero } from "@/components/marketing/page-hero";
import { FadeIn } from "@/components/marketing/fade-in";
import {
  Section,
  SectionEyebrow,
  SectionHeading,
  SectionLead,
} from "@/components/marketing/section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { pageMetadata } from "@/lib/page-metadata";
import {
  Cloud,
  Database,
  GitBranch,
  Layers,
  Lock,
  Plug,
  Server,
  Shield,
} from "lucide-react";

export const metadata = pageMetadata(
  "Platform",
  "Explore Synapto Tech commerce infrastructure—storefronts, operations, integrations, and controls for healthcare-oriented businesses.",
  { path: "/platform" }
);

const pillars = [
  {
    icon: Layers,
    title: "Unified commerce layer",
    description:
      "Storefront, catalog, customers, and orders share one data model—no brittle syncs between a website builder and back-office tools.",
  },
  {
    icon: Server,
    title: "Operational dashboard",
    description:
      "Fulfillment statuses, notes, and merchandising updates from a single workspace designed for clinic and brand teams.",
  },
  {
    icon: Cloud,
    title: "Managed infrastructure",
    description:
      "Performance-minded hosting, SSL, and deployment patterns so your team focuses on catalog and brand—not server chores.",
  },
  {
    icon: Shield,
    title: "Configurable controls",
    description:
      "Restrictions, review steps, and policy surfaces you configure with counsel—not a substitute for legal compliance.",
  },
];

const integrations = [
  {
    name: "Payment processors",
    detail: "Connect approved processors during onboarding based on your products and business type.",
  },
  {
    name: "Email & marketing",
    detail: "Integrate tools for campaigns, automations, and transactional messages.",
  },
  {
    name: "Analytics",
    detail: "Hook up measurement you trust for traffic, conversion, and product performance.",
  },
  {
    name: "Domains & DNS",
    detail: "Launch on your domain with guided DNS and certificate setup.",
  },
  {
    name: "Webhooks & exports",
    detail: "Plan data flows to adjacent systems as your stack matures.",
  },
  {
    name: "Custom workflows",
    detail: "Discuss bespoke integration needs during Growth or Enterprise scoping.",
  },
];

export default function PlatformPage() {
  return (
    <>
      <PageHero
        eyebrow="Platform"
        title="Commerce infrastructure that stays connected end to end"
        lead="Synapto Tech combines premium storefronts with the operational depth healthcare businesses need—catalog, checkout, orders, and integrations in one platform."
      >
        <Button asChild size="lg">
          <Link href="/book-a-demo">
            Book a demo
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </PageHero>

      <Section>
        <FadeIn>
          <SectionEyebrow>Architecture</SectionEyebrow>
          <SectionHeading>One platform, three layers you can rely on</SectionHeading>
          <SectionLead>
            Presentation, operations, and connectivity—designed together so launches do not
            break when you add SKUs, locations, or integrations.
          </SectionLead>
        </FadeIn>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {pillars.map((item, i) => (
            <FadeIn key={item.title} delay={0.05 * i}>
              <Card className="h-full border-border/80">
                <CardContent className="p-6 md:p-7">
                  <item.icon className="mb-4 h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold text-midnight">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
      </Section>

      <Section className="bg-white/60" dark={false}>
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <FadeIn>
            <SectionEyebrow>Deep dive</SectionEyebrow>
            <SectionHeading>Built for catalogs that are not “simple retail”</SectionHeading>
            <SectionLead>
              Healthcare-oriented businesses sell kits, professional-use items, subscriptions, and
              seasonally regulated SKUs. The platform supports structured metadata, collection
              rules, and checkout configurations aligned to what you actually merchandise.
            </SectionLead>
            <ul className="mt-8 space-y-3 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <Database className="mt-0.5 h-4 w-4 shrink-0 text-sage" />
                Relational catalog model for variants, bundles, and collections
              </li>
              <li className="flex gap-2">
                <Lock className="mt-0.5 h-4 w-4 shrink-0 text-sage" />
                Checkout integrations subject to processor approval
              </li>
              <li className="flex gap-2">
                <GitBranch className="mt-0.5 h-4 w-4 shrink-0 text-sage" />
                Review workflows before sensitive changes go live
              </li>
            </ul>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="rounded-2xl border border-border bg-midnight p-8 text-white shadow-lg">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-white/50">
                Implementation note
              </p>
              <p className="mt-4 text-lg font-medium leading-relaxed">
                We scope infrastructure during onboarding—locations, integrations, and control
                requirements—so your launch plan matches operational reality.
              </p>
              <Button asChild className="mt-6 bg-white text-midnight hover:bg-white/90">
                <Link href="/contact">Talk to our team</Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </Section>

      <Section id="integrations">
        <FadeIn>
          <SectionEyebrow>Integrations</SectionEyebrow>
          <SectionHeading>Connect the tools your team already uses</SectionHeading>
          <SectionLead>
            Integration availability depends on your business type, products, and partner
            approvals. We map connections during onboarding—not with a one-click marketplace of
            unvetted plugins.
          </SectionLead>
        </FadeIn>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {integrations.map((item, i) => (
            <FadeIn key={item.name} delay={0.04 * i}>
              <div className="h-full rounded-2xl border border-border/80 bg-white p-6">
                <Plug className="mb-3 h-4 w-4 text-primary" />
                <p className="font-semibold text-midnight">{item.name}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.detail}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn className="mt-10">
          <Badge variant="secondary" className="rounded-full px-4 py-1.5 text-xs font-normal">
            Integration list evolves with partner approvals and your package scope
          </Badge>
        </FadeIn>
      </Section>

      <FinalCtaSection />
    </>
  );
}
