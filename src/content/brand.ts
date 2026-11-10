export const brand = {
  name: "Synapto Tech",
  shortName: "Synapto",
  tagline:
    "High-converting websites, commerce platforms, apps, PWAs, AI agents, and business systems for B2B, B2C, and every company that needs digital done right.",
  domain: "synaptotech.com",
  email: "hello@synaptotech.com",
} as const;

export const heroCopy = {
  brandSignal: "Synapto Tech",
  headline: "Websites, commerce, and apps that convert—and systems that run the business.",
  support:
    "We build marketing sites, B2B platforms, storefronts, customer apps, PWAs, AI agents, and full operating systems. One partner for every digital surface your company needs.",
  primaryCta: "Book a strategy call",
  secondaryCta: "Try live demos",
} as const;

export const websiteTypes = [
  "Marketing websites",
  "B2B platforms",
  "Commerce storefronts",
  "Corporate sites",
  "Landing & campaign pages",
  "Customer portals",
  "Staff apps & PWAs",
  "Industry systems",
] as const;

export const outcomes = [
  {
    title: "Sites that convert",
    text: "Brand-first websites engineered for enquiries, demos, bookings, and sales—not templates that stall buyers.",
  },
  {
    title: "Commerce that sells",
    text: "B2C storefronts and B2B catalogs with orders, accounts, and payments wired for how you actually sell.",
  },
  {
    title: "Apps people use",
    text: "Customer and staff apps plus installable PWAs that feel native and keep work moving.",
  },
  {
    title: "Systems that scale",
    text: "Dashboards, AI agents, automations, and integrations—one stack instead of five disconnected vendors.",
  },
] as const;

export const capabilities = [
  {
    title: "Websites",
    description:
      "Every kind of high-converting site: marketing, corporate, B2B, campaign, and brand experiences built to win trust and drive action.",
    points: ["Conversion architecture", "SEO & performance", "CMS your team can edit"],
  },
  {
    title: "Commerce",
    description:
      "Storefronts and B2B ordering platforms—catalogs, carts, accounts, and checkout paths that match how your buyers buy.",
    points: ["B2C storefronts", "B2B catalogs & ordering", "Orders & payments"],
  },
  {
    title: "Apps & PWAs",
    description:
      "Customer portals, staff tools, and installable progressive web apps—native feel without app-store friction.",
    points: ["Customer apps", "Staff tools", "Home-screen PWAs"],
  },
  {
    title: "Systems & AI",
    description:
      "Business OS dashboards, workflow automations, and AI agents that qualify leads, draft replies, and keep ops moving.",
    points: ["Business OS", "AI agents", "Integrations"],
  },
] as const;

export const offerings = [
  {
    title: "High-converting websites",
    description:
      "Marketing, corporate, B2B, and campaign sites designed to turn attention into pipeline and revenue.",
    points: ["Brand systems", "Conversion pages", "Mobile-first UX"],
  },
  {
    title: "Commerce sites & platforms",
    description:
      "Sell products and services online—B2C retail or B2B wholesale—with catalogs, orders, and customer accounts.",
    points: ["Storefronts", "B2B ordering", "Catalog & inventory UX"],
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
    points: ["Lead agents", "Auto messaging", "Workflow automation"],
  },
  {
    title: "Business systems",
    description:
      "Dashboards for content, orders, customers, and ops—connected as one operating layer.",
    points: ["Business OS", "Staff workspace", "Analytics"],
  },
  {
    title: "Launch & partnership",
    description:
      "Discovery, build, training, and ongoing optimization—so you are never left alone after go-live.",
    points: ["Guided onboarding", "Team training", "Continuous improvement"],
  },
] as const;

export const industries = [
  {
    name: "B2B Companies",
    slug: "b2b-companies",
    description: "Platforms, portals, and sales sites built for complex buyers and longer deals.",
  },
  {
    name: "E-commerce Brands",
    slug: "ecommerce-brands",
    description: "Storefronts, product systems, and apps that turn browsers into buyers.",
  },
  {
    name: "Small Businesses",
    slug: "small-businesses",
    description: "Websites, booking, commerce, and AI follow-ups that make a lean team look bigger.",
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
    description: "End-to-end digital systems for licensed clinics and healthcare brands.",
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
    { label: "B2B Companies", href: "/solutions/b2b-companies" },
    { label: "E-commerce Brands", href: "/solutions/ecommerce-brands" },
    { label: "Small Businesses", href: "/solutions/small-businesses" },
    { label: "Growing Companies", href: "/solutions/growing-companies" },
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
  "B2B / Enterprise",
  "E-commerce / Product Brand",
  "Small Business / Local Brand",
  "Professional Services / Agency",
  "SaaS / Tech Company",
  "Medical / Wellness",
  "Other",
] as const;

export const productCountOptions = [
  "1–10",
  "11–50",
  "51–200",
  "200+",
  "Not sure yet",
] as const;
