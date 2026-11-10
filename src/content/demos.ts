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
    name: "Converting website",
    shortName: "Website",
    tagline: "A high-converting site — not a brochure template.",
    description:
      "Explore a complete brand website: hero, services, proof, offer paths, and a live enquiry flow built to convert.",
    accent: "#0f766e",
    glow: "rgba(15,118,110,0.45)",
    href: "/demos/website",
    category: "Customer-facing",
    device: "desktop" as const,
    highlights: ["Multi-page site", "Trust architecture", "Enquiry conversion"],
  },
  {
    id: "pwa" as const,
    name: "Customer PWA",
    shortName: "PWA",
    tagline: "Installable on the home screen — no app store wait.",
    description:
      "Walk an installable progressive web app: guided intake, completeness checks, status tracking, and offline-ready feel.",
    accent: "#0d9488",
    glow: "rgba(13,148,136,0.4)",
    href: "/demos/pwa",
    category: "Customer-facing",
    device: "phone" as const,
    highlights: ["Add to home screen", "Guided intake", "Status tracking"],
  },
  {
    id: "mobile" as const,
    name: "Mobile app",
    shortName: "App",
    tagline: "Native-feel app for booking, messages, and account.",
    description:
      "Tap through a mobile product: home, appointments, secure messages, and plans with polished app chrome.",
    accent: "#115e59",
    glow: "rgba(17,94,89,0.45)",
    href: "/demos/mobile",
    category: "Customer-facing",
    device: "phone" as const,
    highlights: ["Appointments", "Secure chat", "Account hub"],
  },
  {
    id: "clinic-os" as const,
    name: "Business OS",
    shortName: "Business OS",
    tagline: "The operating layer staff actually run every day.",
    description:
      "Full business OS: intake queue, customers, orders, analytics, and agent assists in one staff dashboard.",
    accent: "#134e4a",
    glow: "rgba(19,78,74,0.5)",
    href: "/demos/clinic-os",
    category: "Operations",
    device: "desktop" as const,
    highlights: ["Ops overview", "Intake queue", "Live metrics"],
  },
  {
    id: "automations" as const,
    name: "Automations",
    shortName: "Flows",
    tagline: "Workflows that chase incomplete work so humans don’t.",
    description:
      "Click through automation recipes: form completeness, follow-up sequences, and escalation rules with human approval gates.",
    accent: "#0f766e",
    glow: "rgba(15,118,110,0.35)",
    href: "/demos/automations",
    category: "Operations",
    device: "desktop" as const,
    highlights: ["Visual flows", "Triggers", "Human gates"],
  },
  {
    id: "ai" as const,
    name: "AI agents",
    shortName: "AI Agents",
    tagline: "Agents that draft, screen, and coach — humans stay in control.",
    description:
      "See lead review, message drafting, and call concierge assists with approval queues and brand-safe guardrails.",
    accent: "#0c4a6e",
    glow: "rgba(12,74,110,0.4)",
    href: "/demos/ai",
    category: "Intelligence",
    device: "desktop" as const,
    highlights: ["Lead review", "Draft replies", "Call assist"],
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
