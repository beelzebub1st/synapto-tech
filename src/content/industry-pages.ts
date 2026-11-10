export type IndustryPageContent = {
  headline: string;
  subhead: string;
  challenges: string[];
  outcomes: string[];
  highlights: { title: string; description: string }[];
};

export const industryPageContent: Record<string, IndustryPageContent> = {
  "medical-clinics": {
    headline: "Commerce built for modern medical clinics",
    subhead:
      "Present care-adjacent products and services with the same professionalism as your in-office experience—connected to orders and operations in one place.",
    challenges: [
      "Generic website builders that ignore catalog and policy nuance",
      "Disconnected payment, inventory, and patient communication tools",
      "Storefronts that feel consumer-retail instead of clinical-grade",
    ],
    outcomes: [
      "Brand-aligned storefronts with structured product data",
      "Order visibility for front desk and operations teams",
      "Configurable checkout and content controls for your advisors",
    ],
    highlights: [
      {
        title: "Catalog clarity",
        description: "Variants, bundles, and collections organized for supplements, devices, and retail SKUs.",
      },
      {
        title: "Policy-ready templates",
        description: "Footers, checkout links, and content blocks for disclaimers your counsel approves.",
      },
      {
        title: "Multi-location ready",
        description: "Support for practices selling across sites or regions with consistent branding.",
      },
    ],
  },
  "wellness-providers": {
    headline: "Elegant commerce for wellness brands",
    subhead:
      "Launch digital experiences that match the calm, premium feel of your studio—without sacrificing operational control.",
    challenges: [
      "Fragmented tools for classes, retail, and subscriptions",
      "Difficulty maintaining brand consistency on mobile",
      "Limited merchandising for seasonal programs and kits",
    ],
    outcomes: [
      "Mobile-first storefronts with thoughtful typography and layout",
      "Promotions and collections for programs and product lines",
      "Integrated order management for your team",
    ],
    highlights: [
      {
        title: "Program merchandising",
        description: "Highlight kits, bundles, and seasonal collections with flexible layouts.",
      },
      {
        title: "Customer accounts",
        description: "Repeat buyers see order history and profile details in one place.",
      },
      {
        title: "Email-ready integrations",
        description: "Connect tools you already use for campaigns and transactional messages.",
      },
    ],
  },
  "longevity-practices": {
    headline: "Digital infrastructure for longevity practices",
    subhead:
      "Support high-consideration catalogs and education-heavy journeys with storefronts designed for trust.",
    challenges: [
      "Complex product lines that need clear differentiation",
      "Education content mixed with commerce without confusing buyers",
      "Payment approval for specialized product categories",
    ],
    outcomes: [
      "Structured PDPs and content pages that separate education from purchase paths",
      "Analytics to understand conversion by collection",
      "Onboarding support for processor and catalog review",
    ],
    highlights: [
      {
        title: "High-consideration UX",
        description: "Layouts that give buyers room to read before they commit.",
      },
      {
        title: "Collection analytics",
        description: "See which programs and SKUs drive revenue and engagement.",
      },
      {
        title: "Review workflows",
        description: "Configure approvals for sensitive catalog changes before they go live.",
      },
    ],
  },
  "aesthetic-clinics": {
    headline: "Premium storefronts for aesthetic and medspa practices",
    subhead:
      "Showcase retail and take-home care products with photography-forward layouts and operational depth behind the scenes.",
    challenges: [
      "Competing on experience while staying within marketing guardrails",
      "Managing retail alongside in-clinic treatments",
      "Need for fast mobile checkout during promotions",
    ],
    outcomes: [
      "Visual-first templates with brand controls",
      "Cart and checkout tuned for promotional periods",
      "Dashboard visibility for orders and fulfillment",
    ],
    highlights: [
      {
        title: "Visual merchandising",
        description: "Hero modules, lookbooks, and featured collections for campaigns.",
      },
      {
        title: "Promotions with guardrails",
        description: "Discount rules with limits appropriate to your policies.",
      },
      {
        title: "Secure checkout paths",
        description: "Connect approved processors during onboarding.",
      },
    ],
  },
  "healthcare-brands": {
    headline: "Connected commerce for healthcare product brands",
    subhead:
      "Scale DTC and provider channels with infrastructure that respects licensing, fulfillment, and brand standards.",
    challenges: [
      "Channel complexity across DTC and professional buyers",
      "Processor and category approval for regulated-adjacent SKUs",
      "Need for consistent brand experience across regions",
    ],
    outcomes: [
      "Unified catalog and order layer for digital sales",
      "Domain and SEO foundations for discoverability",
      "Integration planning with your existing stack",
    ],
    highlights: [
      {
        title: "Catalog at scale",
        description: "Manage larger SKU counts with collections and structured metadata.",
      },
      {
        title: "SEO foundations",
        description: "Performance-minded defaults for metadata and structure.",
      },
      {
        title: "Integration planning",
        description: "Work through payment, email, and analytics connections during onboarding.",
      },
    ],
  },
  telehealth: {
    headline: "Commerce for telehealth businesses expanding online",
    subhead:
      "Add retail and subscription products to digital care offerings with storefronts built for remote-first brands.",
    challenges: [
      "Launching retail without distracting from care delivery",
      "Coordinating fulfillment across states",
      "Clear separation of clinical services and product sales",
    ],
    outcomes: [
      "Storefronts that keep product journeys distinct from care workflows",
      "Configurable policies and checkout acknowledgments",
      "Operational dashboard for orders as volume grows",
    ],
    highlights: [
      {
        title: "Remote-first design",
        description: "Fast, accessible experiences for patients on any device.",
      },
      {
        title: "Fulfillment visibility",
        description: "Track orders and statuses without a patchwork of tools.",
      },
      {
        title: "Scalable onboarding",
        description: "Phased launches as catalogs and regions expand.",
      },
    ],
  },
};

export function getIndustryContent(slug: string): IndustryPageContent | undefined {
  return industryPageContent[slug];
}
