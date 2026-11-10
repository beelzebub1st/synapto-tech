export type DemoId =
  | "website"
  | "pwa"
  | "mobile"
  | "clinic-os"
  | "automations"
  | "ai";

export const demos = [
  {
    id: "website" as const,
    name: "Converting websites",
    shortName: "Website",
    tagline: "Four full-page templates — not one layout with swapped copy.",
    description:
      "Switch between distinct website designs: B2B RFQ platforms, e-commerce storefronts with products and cart, services packages, and local booking sites.",
    accent: "#0f766e",
    glow: "rgba(15,118,110,0.45)",
    href: "/demos/website",
    category: "Websites",
    device: "desktop" as const,
    highlights: ["4 unique designs", "Products & services", "Live flows"],
    useCases: [
      "B2B RFQ site",
      "E-commerce store",
      "Services firm",
      "Local booking",
    ],
  },
  {
    id: "pwa" as const,
    name: "Customer PWAs",
    shortName: "PWA",
    tagline: "Installable apps for portals, memberships, ordering, and field work.",
    description:
      "Walk progressive web apps by use case: account portals, memberships, reordering, and field checklists—add to home screen, no app store wait.",
    accent: "#0d9488",
    glow: "rgba(13,148,136,0.4)",
    href: "/demos/pwa",
    category: "Apps & PWAs",
    device: "phone" as const,
    highlights: ["4 use cases", "Install prompt", "Status tracking"],
    useCases: ["Account portal", "Membership", "Reorder", "Field ops"],
  },
  {
    id: "mobile" as const,
    name: "Mobile apps",
    shortName: "App",
    tagline: "Native-feel apps for clients, commerce, sales, and staff.",
    description:
      "Tap through mobile products by category: client hubs, shopping apps, sales companions, and staff tools with booking, messages, and accounts.",
    accent: "#115e59",
    glow: "rgba(17,94,89,0.45)",
    href: "/demos/mobile",
    category: "Apps & PWAs",
    device: "phone" as const,
    highlights: ["4 use cases", "Booking", "Secure chat"],
    useCases: ["Client hub", "Commerce", "Sales", "Staff"],
  },
  {
    id: "clinic-os" as const,
    name: "Business OS",
    shortName: "Business OS",
    tagline: "One dashboard for leads, customers, orders, and agents.",
    description:
      "Operate the business OS across B2B, commerce, and services—pipelines, customers, orders, and AI assists in one staff workspace.",
    accent: "#134e4a",
    glow: "rgba(19,78,74,0.5)",
    href: "/demos/clinic-os",
    category: "Systems",
    device: "desktop" as const,
    highlights: ["3 industries", "Ops queue", "Live metrics"],
    useCases: ["B2B ops", "Commerce ops", "Services ops"],
  },
  {
    id: "automations" as const,
    name: "Automations",
    shortName: "Flows",
    tagline: "Workflows by category: sales, commerce, onboarding, support.",
    description:
      "Click automation recipes by use case—lead chase, abandoned cart, onboarding, and support triage—with human approval gates.",
    accent: "#0f766e",
    glow: "rgba(15,118,110,0.35)",
    href: "/demos/automations",
    category: "Systems",
    device: "desktop" as const,
    highlights: ["4 categories", "Triggers", "Human gates"],
    useCases: ["Sales", "Commerce", "Onboarding", "Support"],
  },
  {
    id: "ai" as const,
    name: "AI agents",
    shortName: "AI Agents",
    tagline: "Agents for leads, replies, and calls—humans keep control.",
    description:
      "See AI agents by use case: lead qualification, reply drafting, and call concierge across B2B, commerce, and services with approval queues.",
    accent: "#0c4a6e",
    glow: "rgba(12,74,110,0.4)",
    href: "/demos/ai",
    category: "Intelligence",
    device: "desktop" as const,
    highlights: ["3 agents", "Multi-industry", "Approval queue"],
    useCases: ["Lead agent", "Reply agent", "Call agent"],
  },
] as const;

export function getDemo(id: string) {
  return demos.find((demo) => demo.id === id);
}

export function getAdjacentDemos(id: string) {
  const index = demos.findIndex((demo) => demo.id === id);
  if (index < 0) return { prev: null, next: null };
  return {
    prev: demos[(index - 1 + demos.length) % demos.length],
    next: demos[(index + 1) % demos.length],
  };
}
