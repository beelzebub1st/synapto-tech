import type { Metadata } from "next";
import { AiAgentsSection } from "@/components/marketing/homepage/ai-agents";
import { CapabilitiesSection } from "@/components/marketing/homepage/capabilities";
import { CaseStudiesTeaserSection } from "@/components/marketing/homepage/case-studies-teaser";
import { ComparisonSection } from "@/components/marketing/homepage/comparison";
import { ConversionPathSection } from "@/components/marketing/homepage/conversion-path";
import { DashboardShowcase } from "@/components/marketing/homepage/dashboard-showcase";
import { DemosTeaserSection } from "@/components/marketing/homepage/demos-teaser";
import { FaqConversionSection } from "@/components/marketing/homepage/faq-conversion";
import { FinalCtaSection } from "@/components/marketing/homepage/final-cta";
import { GuaranteeSection } from "@/components/marketing/homepage/guarantee";
import { HeroSection } from "@/components/marketing/homepage/hero";
import { HowItWorksSection } from "@/components/marketing/homepage/how-it-works";
import { MidCtaSection } from "@/components/marketing/homepage/mid-cta";
import { OfferingsSection } from "@/components/marketing/homepage/offerings";
import { OutcomesSection } from "@/components/marketing/homepage/outcomes";
import { PackagesSection } from "@/components/marketing/homepage/packages";
import { ProblemSection } from "@/components/marketing/homepage/problem";
import { ProofStrip } from "@/components/marketing/homepage/proof-strip";
import { ResultsSection } from "@/components/marketing/homepage/results";
import { TestimonialsSection } from "@/components/marketing/homepage/testimonials";
import { TrustSection } from "@/components/marketing/homepage/trust";
import { StickyCtaBar } from "@/components/marketing/sticky-cta";
import { brand } from "@/content/brand";

export const metadata: Metadata = {
  title: `${brand.name} — Websites, Apps, PWAs & Systems that Convert`,
  description: brand.tagline,
  openGraph: {
    title: `${brand.name} — Websites, Apps, PWAs & Systems that Convert`,
    description: brand.tagline,
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProofStrip />
      <OutcomesSection />
      <CapabilitiesSection />
      <ResultsSection />
      <DemosTeaserSection />
      <ProblemSection />
      <ComparisonSection />
      <PackagesSection />
      <ConversionPathSection />
      <MidCtaSection />
      <CaseStudiesTeaserSection />
      <OfferingsSection />
      <AiAgentsSection />
      <DashboardShowcase />
      <HowItWorksSection />
      <TestimonialsSection />
      <TrustSection />
      <GuaranteeSection />
      <FaqConversionSection />
      <FinalCtaSection />
      <StickyCtaBar />
    </>
  );
}
