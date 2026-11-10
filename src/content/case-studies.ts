export const caseStudies = [
  {
    slug: "atlas-b2b",
    clinic: "Atlas Industrial",
    type: "B2B manufacturer",
    package: "Product",
    headline: "From brochure site to a B2B platform that qualifies buyers",
    summary:
      "Rebuilt the public website, launched an account portal PWA for quotes and orders, and connected lead agents so incomplete RFQs stopped stalling sales.",
    metrics: [
      { label: "Qualified form starts", value: "3.1×" },
      { label: "Admin hours saved / week", value: "14" },
      { label: "Time to first launch", value: "5 weeks" },
    ],
    delivered: [
      "Conversion-led B2B website with proof and RFQ paths",
      "Installable buyer portal PWA",
      "Business OS for pipeline and accounts",
      "Lead completeness + follow-up agents",
    ],
  },
  {
    slug: "harbor-commerce",
    clinic: "Harbor Goods",
    type: "E-commerce brand",
    package: "Presence",
    headline: "A brand-first storefront that made offers feel premium, not generic",
    summary:
      "Replaced a template shop with clearer merchandising, trust-first product journeys, and checkout paths designed for high-intent buyers.",
    metrics: [
      { label: "Checkout completion", value: "+62%" },
      { label: "Bounce on PDPs", value: "-28%" },
      { label: "Launch window", value: "3 weeks" },
    ],
    delivered: [
      "Commerce website + branding system",
      "Collection and PDP architecture",
      "Editable content workspace",
      "Launch training for the store team",
    ],
  },
  {
    slug: "summit-multi-site",
    clinic: "Summit Group",
    type: "Multi-brand services",
    package: "System",
    headline: "One operating layer across brands, offers, and staff",
    summary:
      "Unified websites, commerce, AI follow-ups, and operations so each brand stopped running on separate tools and spreadsheets.",
    metrics: [
      { label: "Tools consolidated", value: "5 → 1" },
      { label: "Follow-up response time", value: "-40%" },
      { label: "Brands live", value: "4" },
    ],
    delivered: [
      "Multi-brand website architecture",
      "Commerce + catalog operations",
      "AI agents + call concierge workflows",
      "Ongoing optimization partnership",
    ],
  },
] as const;

export function getCaseStudy(slug: string) {
  return caseStudies.find((item) => item.slug === slug);
}
