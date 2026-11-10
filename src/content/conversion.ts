export const proofStrip = [
  "Marketing websites",
  "B2B platforms",
  "Commerce storefronts",
  "Customer apps",
  "Staff PWAs",
  "AI agents",
  "Business systems",
] as const;

export const packages = [
  {
    name: "Presence",
    ideal: "Companies that need a premium website that converts",
    priceLabel: "From discovery",
    highlight: false,
    includes: [
      "High-converting website (marketing, B2B, or brand)",
      "Conversion page architecture",
      "SEO & performance foundations",
      "Editable content workspace",
      "Launch training for your team",
    ],
    cta: "Start with a website",
    href: "/reserve?package=presence",
  },
  {
    name: "Product",
    ideal: "Teams ready for commerce, apps, PWAs, and portals",
    priceLabel: "Scoped to your stack",
    highlight: true,
    includes: [
      "Everything in Presence",
      "Commerce site or customer/staff app / PWA",
      "Lead, booking & ordering workflows",
      "Business OS dashboard",
      "AI agents for follow-ups",
    ],
    cta: "Build my product stack",
    href: "/reserve?package=product",
  },
  {
    name: "System",
    ideal: "Full digital operating partner for B2B and growth teams",
    priceLabel: "Partnership model",
    highlight: false,
    includes: [
      "Everything in Product",
      "Full commerce & operations layer",
      "Automations + AI concierge",
      "Integrations & payments readiness",
      "Ongoing optimization partnership",
    ],
    cta: "Talk systems partnership",
    href: "/book-a-demo?package=system",
  },
] as const;

export const resultsStories = [
  {
    metric: "3.1×",
    label: "more qualified form starts",
    context:
      "After replacing a template site with a conversion-led funnel and clearer offer paths.",
  },
  {
    metric: "18 hrs",
    label: "admin saved / week",
    context:
      "AI completeness checks and auto follow-ups cut rework between sales, ops, and support.",
  },
  {
    metric: "1 stack",
    label: "instead of 5 vendors",
    context:
      "Website, commerce, app, dashboard, and automations owned by one accountable partner.",
  },
] as const;

export const testimonials = [
  {
    quote:
      "We finally have a digital presence that feels as sharp as our brand—and a system the team can actually run.",
    name: "Mira Elson",
    role: "Founder, multi-location services brand",
  },
  {
    quote:
      "The difference was ownership. Synapto didn’t hand us a site and disappear. They built the website, the commerce layer, and the workflows.",
    name: "Jordan Hale",
    role: "COO, growing B2B company",
  },
  {
    quote:
      "Buyers understand what we offer faster. Staff spend less time chasing incomplete forms. That is real conversion.",
    name: "Sofia Nguyen",
    role: "Operations lead, professional services firm",
  },
] as const;

export const conversionFaq = [
  {
    q: "What kinds of websites do you build?",
    a: "All of them that need to convert: marketing and corporate sites, B2B platforms, commerce storefronts, landing pages, customer portals, and industry systems. If it lives on the web and needs to win business, we build it.",
  },
  {
    q: "Do you build commerce and apps, or just marketing sites?",
    a: "Both—and the systems behind them. We ship storefronts, B2B ordering, customer/staff apps, PWAs, AI agents, and business dashboards as one stack when you need more than a brochure.",
  },
  {
    q: "Do we have to buy everything at once?",
    a: "No. Most clients start with Presence (a converting website), then layer commerce, apps, PWAs, AI, and operations when ready. We design the path so nothing is thrown away.",
  },
  {
    q: "Who do you work with?",
    a: "B2B companies, e-commerce brands, small businesses, professional services, growing teams, clinics, and multi-location operators. Startup to enterprise.",
  },
  {
    q: "How fast can we launch?",
    a: "A focused website can move from discovery to launch in weeks when scope is clear. Commerce, apps, PWAs, and full systems are phased with milestones you can see before we build.",
  },
  {
    q: "What AI services do you actually offer?",
    a: "Lead qualification, intake completeness, draft replies, follow-up sequences, call assistance, and custom workflow agents—always with human approval where it matters.",
  },
  {
    q: "What happens after launch?",
    a: "You get training, documentation, and an optional partnership for ongoing optimization—funnels, agents, content, and product surfaces—so conversion keeps improving.",
  },
  {
    q: "Can you replace our current agency and tools?",
    a: "That is the point. One partner for websites, commerce, apps, PWAs, AI, and systems—so you stop paying for disconnected vendors that do not share accountability for results.",
  },
] as const;

export const midCta = {
  eyebrow: "Next step",
  title: "Get a clear plan for your digital stack.",
  text: "Take the package quiz, click through demos, then book a live strategy slot — or reserve project start when you’re ready.",
  primary: "Take the package quiz",
  secondary: "Try live demos",
} as const;

export const guarantee = {
  title: "Clear scope. Visible milestones. No mystery retainers.",
  points: [
    "Written scope before build begins",
    "Demo checkpoints on a fixed cadence",
    "You own the brand assets and product surfaces we ship",
    "Human review stays on customer messaging and critical decisions",
  ],
} as const;
