export const brand = {
  name: "Synapto Tech",
  shortName: "Synapto",
  tagline:
    "Websites, apps, PWAs, AI agents, and operating systems for small businesses, growing companies, and teams that need digital done right.",
  domain: "synaptotech.com",
  email: "hello@synaptotech.com",
} as const;

export const heroCopy = {
  brandSignal: "Synapto Tech",
  headline: "Digital systems that win customers and run the business.",
  support:
    "From high-converting websites and PWAs to custom apps, AI agents, and workflow automations—one partner owns the stack for startups, SMBs, and enterprises.",
  primaryCta: "Book a strategy call",
  secondaryCta: "Try live demos",
} as const;

export const outcomes = [
  {
    title: "Convert more visits",
    text: "Sites and funnels designed for trust and clarity—not generic templates that stall buyers.",
  },
  {
    title: "Ship real products",
    text: "Websites, mobile apps, and installable PWAs your customers and staff actually use.",
  },
  {
    title: "Automate the busywork",
    text: "AI agents draft replies, qualify leads, chase incomplete work, and keep workflows moving—with humans in control.",
  },
  {
    title: "Operate in one place",
    text: "Catalog, orders, content, CRM-style ops, and staff tools connected as a living system.",
  },
] as const;

export const capabilities = [
  {
    title: "Websites",
    description:
      "Brand-first sites that load fast, rank cleanly, and turn visitors into enquiries, bookings, and sales.",
    points: ["Conversion architecture", "SEO & performance", "CMS your team can edit"],
  },
  {
    title: "Apps",
    description:
      "Customer and staff applications for portals, booking, and internal workflows—built around how you operate.",
    points: ["Customer portals", "Staff tools", "Native-feel UX"],
  },
  {
    title: "PWAs",
    description:
      "Installable progressive web apps that feel native, work offline-ready, and skip app-store friction.",
    points: ["Home-screen install", "Push-ready foundations", "One codebase, many devices"],
  },
  {
    title: "Systems",
    description:
      "Commerce, dashboards, AI agents, payments readiness, and integrations—wired as one operating layer.",
    points: ["Business OS dashboard", "AI automations", "Payments & integrations"],
  },
] as const;

export const offerings = [
  {
    title: "Brand & Digital Presence",
    description:
      "Identity, websites, and customer-facing experiences that make your offer feel premium and clear.",
    points: ["Brand systems", "High-converting pages", "Mobile-first UX"],
  },
  {
    title: "Apps & PWAs",
    description:
      "Custom applications and progressive web apps for customers and staff—fast, installable, durable.",
    points: ["Customer apps", "Staff PWAs", "Portal experiences"],
  },
  {
    title: "AI Agents & Automations",
    description:
      "Agents that qualify leads, draft replies, run follow-ups, and automate workflows with human approval gates.",
    points: ["Lead & intake agents", "Auto messaging", "Workflow automation"],
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
    name: "Small Businesses",
    slug: "small-businesses",
    description: "Websites, booking, and AI follow-ups that make a lean team look bigger.",
  },
  {
    name: "Professional Services",
    slug: "professional-services",
    description: "Trust-first sites and intake systems for agencies, advisors, and firms.",
  },
  {
    name: "Growing Companies",
    slug: "growing-companies",
    description: "Product surfaces, dashboards, and automations that scale with the team.",
  },
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
    name: "Healthcare Brands",
    slug: "healthcare-brands",
    description: "Connected systems for licensed healthcare product businesses.",
  },
] as const;

export const navLinks = [
  { label: "Capabilities", href: "/#capabilities" },
  { label: "AI", href: "/#ai-services" },
  { label: "Packages", href: "/#packages" },
  { label: "Demos", href: "/demos" },
  { label: "Work", href: "/work" },
  {
    label: "Resources",
    href: "/blog",
    children: [
      { label: "Blog", href: "/blog" },
      { label: "FAQs", href: "/faq" },
      { label: "Package quiz", href: "/start" },
      { label: "AI Agents", href: "/ai-agents" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
] as const;

export const footerLinks = {
  platform: [
    { label: "Overview", href: "/platform" },
    { label: "Live demos", href: "/demos" },
    { label: "AI Agents", href: "/ai-agents" },
    { label: "Websites", href: "/clinic-website" },
    { label: "Dashboard", href: "/login" },
  ],
  solutions: [
    { label: "Small Businesses", href: "/solutions/small-businesses" },
    { label: "Professional Services", href: "/solutions/professional-services" },
    { label: "Growing Companies", href: "/solutions/growing-companies" },
    { label: "Medical Clinics", href: "/solutions/medical-clinics" },
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
  "Small Business / Local Brand",
  "Professional Services / Agency",
  "E-commerce / Product Brand",
  "SaaS / Tech Company",
  "Medical / Wellness Clinic",
  "Enterprise / Multi-location",
  "Other",
] as const;

export const productCountOptions = [
  "1–10",
  "11–50",
  "51–200",
  "200+",
  "Not sure yet",
] as const;
