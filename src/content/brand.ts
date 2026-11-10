export const brand = {
  name: "Synapto Tech",
  shortName: "Synapto",
  tagline:
    "Websites, apps, PWAs, and operating systems for clinics and healthcare brands—built to convert and run the business.",
  domain: "synaptotech.com",
  email: "hello@synaptotech.com",
} as const;

export const heroCopy = {
  brandSignal: "Synapto Tech",
  headline: "Digital systems that win patients and run the clinic.",
  support:
    "From high-converting websites and PWAs to custom apps, AI agents, and operations—one partner owns the whole stack.",
  primaryCta: "Book a strategy call",
  secondaryCta: "Try live demos",
} as const;

export const outcomes = [
  {
    title: "Convert more visits",
    text: "Sites and funnels designed for clinical trust—not generic retail templates.",
  },
  {
    title: "Ship real products",
    text: "Websites, mobile apps, and installable PWAs that patients actually use.",
  },
  {
    title: "Automate the busywork",
    text: "AI agents handle intake, follow-ups, and front-desk drafts with humans in control.",
  },
  {
    title: "Operate in one place",
    text: "Catalog, orders, content, and staff tools connected as a living system.",
  },
] as const;

export const capabilities = [
  {
    title: "Websites",
    description:
      "Brand-first clinic sites that load fast, rank cleanly, and turn visitors into booked patients.",
    points: ["Conversion architecture", "SEO & performance", "CMS your team can edit"],
  },
  {
    title: "Apps",
    description:
      "Patient and staff applications for booking, portals, and internal workflows—built around how you operate.",
    points: ["Patient portals", "Staff tools", "Native-feel UX"],
  },
  {
    title: "PWAs",
    description:
      "Installable progressive web apps that work offline-ready, feel native, and skip app-store friction.",
    points: ["Home-screen install", "Push-ready foundations", "One codebase, many devices"],
  },
  {
    title: "Systems",
    description:
      "Commerce, dashboards, AI agents, payments readiness, and integrations—wired as one operating layer.",
    points: ["Clinic OS dashboard", "AI automations", "Payments & integrations"],
  },
] as const;

export const offerings = [
  {
    title: "Brand & Digital Presence",
    description:
      "Identity, websites, and patient-facing experiences that feel as precise as your care.",
    points: ["Brand systems", "High-converting pages", "Clinic-ready UX"],
  },
  {
    title: "Apps & PWAs",
    description:
      "Custom applications and progressive web apps for patients and staff—fast, installable, durable.",
    points: ["Patient apps", "Staff PWAs", "Portal experiences"],
  },
  {
    title: "AI Agents & Automations",
    description:
      "Agents that screen intakes, draft replies, coach live calls, and keep follow-ups moving.",
    points: ["Intake review", "Auto client messaging", "Call concierge"],
  },
  {
    title: "Commerce & Operations",
    description:
      "Sell products and services with catalogs, orders, customers, and content in one dashboard.",
    points: ["Storefronts", "Orders & customers", "Staff dashboard"],
  },
  {
    title: "Integrations & Payments",
    description:
      "Connect CRM, email, domains, and payment providers approved for your business.",
    points: ["Payment-ready", "Tool connections", "Custom domains"],
  },
  {
    title: "Launch & Partnership",
    description:
      "Discovery, build, training, and ongoing optimization—so you are never left alone after go-live.",
    points: ["Guided onboarding", "Team training", "Continuous improvement"],
  },
] as const;

export const industries = [
  {
    name: "Medical Clinics",
    slug: "medical-clinics",
    description: "End-to-end digital systems for licensed clinics.",
  },
  {
    name: "Wellness Providers",
    slug: "wellness-providers",
    description: "Premium experiences for wellness brands that need trust and clarity.",
  },
  {
    name: "Longevity Practices",
    slug: "longevity-practices",
    description: "Modern platforms for longevity and regenerative medicine businesses.",
  },
  {
    name: "Aesthetic Clinics",
    slug: "aesthetic-clinics",
    description: "Elevated presentation for aesthetic and medspa practices.",
  },
  {
    name: "Healthcare Brands",
    slug: "healthcare-brands",
    description: "Connected systems for licensed healthcare product businesses.",
  },
  {
    name: "Telehealth Businesses",
    slug: "telehealth",
    description: "Digital-first solutions for telehealth providers growing online.",
  },
] as const;

export const navLinks = [
  { label: "Capabilities", href: "/#capabilities" },
  { label: "Packages", href: "/#packages" },
  { label: "Demos", href: "/demos" },
  { label: "Work", href: "/work" },
  { label: "AI Agents", href: "/ai-agents" },
  {
    label: "Resources",
    href: "/blog",
    children: [
      { label: "Blog", href: "/blog" },
      { label: "FAQs", href: "/faq" },
      { label: "Package quiz", href: "/start" },
      { label: "Pricing", href: "/pricing" },
      { label: "Clinic Website", href: "/clinic-website" },
    ],
  },
] as const;

export const footerLinks = {
  platform: [
    { label: "Overview", href: "/platform" },
    { label: "Live demos", href: "/demos" },
    { label: "Clinic Website", href: "/clinic-website" },
    { label: "AI Agents", href: "/ai-agents" },
    { label: "Dashboard", href: "/login" },
  ],
  solutions: [
    { label: "Medical Clinics", href: "/solutions/medical-clinics" },
    { label: "Wellness Providers", href: "/solutions/wellness-providers" },
    { label: "Healthcare Brands", href: "/solutions/healthcare-brands" },
    { label: "Aesthetic Clinics", href: "/solutions/aesthetic-clinics" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Book a call", href: "/book-a-demo" },
    { label: "Reserve start", href: "/reserve" },
    { label: "Case studies", href: "/work" },
  ],
  resources: [
    { label: "Package quiz", href: "/start" },
    { label: "Blog", href: "/blog" },
    { label: "Pricing", href: "/pricing" },
    { label: "FAQs", href: "/faq" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
    { label: "Acceptable Use Policy", href: "/acceptable-use" },
    {
      label: "Healthcare Commerce Disclaimer",
      href: "/healthcare-commerce-disclaimer",
    },
  ],
} as const;

export const businessTypes = [
  "Medical Clinic",
  "Wellness Clinic",
  "Longevity / Regenerative Practice",
  "Aesthetic / Medspa",
  "Telehealth Business",
  "Healthcare Product Brand",
  "Other Licensed Provider",
] as const;

export const productCountOptions = [
  "1–10",
  "11–50",
  "51–200",
  "200+",
  "Not sure yet",
] as const;
