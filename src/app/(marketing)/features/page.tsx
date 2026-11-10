import Link from "next/link";
import { FinalCtaSection } from "@/components/marketing/homepage/final-cta";
import { OfferingsSection } from "@/components/marketing/homepage/offerings";
import { PageHero } from "@/components/marketing/page-hero";
import { Button } from "@/components/ui/button";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata(
  "Features",
  "Digital solutions, AI automations, commerce platforms, integrations, analytics, and ongoing support from Synapto Tech.",
  { path: "/features" }
);

export default function FeaturesPage() {
  return (
    <>
      <PageHero
        eyebrow="Capabilities"
        title="Solutions that make healthcare businesses viable online"
        lead="From storefronts and AI automations to operations and ongoing support—clear offerings your team can actually run."
      >
        <Button asChild variant="outline">
          <Link href="/platform">Platform overview</Link>
        </Button>
      </PageHero>
      <OfferingsSection />
      <FinalCtaSection />
    </>
  );
}
