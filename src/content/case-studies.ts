export const caseStudies = [
  {
    slug: "northside-longevity",
    clinic: "Northside Longevity",
    type: "Longevity practice",
    package: "Product",
    headline: "From generic brochure site to a converting clinic system",
    summary:
      "Rebuilt the public website, launched a patient PWA for intake, and connected follow-up agents so incomplete packets stopped stalling bookings.",
    metrics: [
      { label: "Qualified form starts", value: "3.1×" },
      { label: "Admin hours saved / week", value: "14" },
      { label: "Time to first launch", value: "5 weeks" },
    ],
    delivered: [
      "Brand-aligned website with service conversion paths",
      "Installable patient PWA for intake + status",
      "Clinic OS dashboard for staff",
      "Intake completeness + follow-up agents",
    ],
  },
  {
    slug: "harbor-aesthetic",
    clinic: "Harbor Aesthetic",
    type: "Aesthetic clinic",
    package: "Presence",
    headline: "A trust-first website that made offers feel clinical, not retail",
    summary:
      "Replaced a template site with premium positioning, clearer treatment journeys, and enquiry flows designed for high-intent visitors.",
    metrics: [
      { label: "Enquiry completion", value: "+62%" },
      { label: "Bounce on services", value: "-28%" },
      { label: "Launch window", value: "3 weeks" },
    ],
    delivered: [
      "Website + branding system",
      "Service pages built for trust",
      "Editable content workspace",
      "Launch training for front desk",
    ],
  },
  {
    slug: "summit-multi-site",
    clinic: "Summit Wellness Group",
    type: "Multi-location wellness",
    package: "System",
    headline: "One operating layer across locations, offers, and staff",
    summary:
      "Unified website, commerce, AI follow-ups, and operations so each location stopped running on separate tools and spreadsheets.",
    metrics: [
      { label: "Tools consolidated", value: "5 → 1" },
      { label: "Follow-up response time", value: "-40%" },
      { label: "Locations live", value: "4" },
    ],
    delivered: [
      "Multi-location website architecture",
      "Commerce + catalog operations",
      "AI agents + call concierge workflows",
      "Ongoing optimization partnership",
    ],
  },
] as const;

export function getCaseStudy(slug: string) {
  return caseStudies.find((item) => item.slug === slug);
}
