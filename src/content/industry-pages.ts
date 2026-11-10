export type IndustryPageContent = {
  headline: string;
  subhead: string;
  challenges: string[];
  outcomes: string[];
  highlights: { title: string; description: string }[];
};

export const industryPageContent: Record<string, IndustryPageContent> = {
  "small-businesses": {
    headline: "Digital systems that make a lean team look bigger",
    subhead:
      "Premium websites, booking flows, and AI follow-ups so small businesses convert more without hiring a full digital department.",
    challenges: [
      "DIY sites that look cheap and stall enquiries",
      "Too many tools that never talk to each other",
      "Follow-ups that live in someone’s head or inbox",
    ],
    outcomes: [
      "A brand-first site that turns visits into leads",
      "Simple booking or enquiry flows your team can run",
      "AI reminders and drafts so nothing slips through",
    ],
    highlights: [
      {
        title: "Launch fast",
        description: "Focused website scope with a clear first win in weeks.",
      },
      {
        title: "Own your stack",
        description: "One partner for site, product surfaces, and automations.",
      },
      {
        title: "Grow into AI",
        description: "Start with Presence; add agents when volume demands it.",
      },
    ],
  },
  "professional-services": {
    headline: "Trust-first digital for firms that sell expertise",
    subhead:
      "Websites, intake, and AI-assisted follow-up for agencies, advisors, and professional practices that need credibility and clean operations.",
    challenges: [
      "Generic sites that don’t communicate expertise",
      "Intake and proposals scattered across email and docs",
      "No consistent follow-up after first contact",
    ],
    outcomes: [
      "Authority-led website architecture",
      "Structured enquiry and intake paths",
      "Draft replies and chase sequences with approval gates",
    ],
    highlights: [
      {
        title: "Proof that converts",
        description: "Case-led storytelling and clear next steps on every path.",
      },
      {
        title: "Client portals",
        description: "Optional PWAs for status, documents, and messages.",
      },
      {
        title: "Ops clarity",
        description: "Dashboards so partners see pipeline health, not noise.",
      },
    ],
  },
  "growing-companies": {
    headline: "Product surfaces and automations that scale with the team",
    subhead:
      "From marketing site to customer apps, business OS, and AI workflow agents—built for companies outgrowing duct-taped tools.",
    challenges: [
      "Marketing site disconnected from product and ops",
      "Manual workflows that break as headcount grows",
      "Multiple vendors with no shared accountability",
    ],
    outcomes: [
      "Unified website + app/PWA layer",
      "AI agents on lead, support, and ops queues",
      "One operating partner through expansion",
    ],
    highlights: [
      {
        title: "Phased delivery",
        description: "Ship Presence, then Product, then System without throwaway work.",
      },
      {
        title: "Agent workforce",
        description: "Automate repetitive handoffs while humans approve customer messages.",
      },
      {
        title: "Enterprise-ready",
        description: "Roles, audit trails, and integrations as you scale locations or teams.",
      },
    ],
  },
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
