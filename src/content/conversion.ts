export const proofStrip = [
  "Medical clinics",
  "Wellness providers",
  "Longevity practices",
  "Aesthetic clinics",
  "Telehealth brands",
  "Healthcare product companies",
] as const;

export const packages = [
  {
    name: "Presence",
    ideal: "Clinics that need a premium website that converts",
    priceLabel: "From discovery",
    highlight: false,
    includes: [
      "Brand-aligned clinic website",
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
    ideal: "Teams ready for apps, PWAs, and patient portals",
    priceLabel: "Scoped to your stack",
    highlight: true,
    includes: [
      "Everything in Presence",
      "Patient or staff app / PWA",
      "Intake & booking workflows",
      "Clinic OS dashboard",
      "AI agents for follow-ups",
    ],
    cta: "Build my product stack",
    href: "/reserve?package=product",
  },
  {
    name: "System",
    ideal: "Full digital operating partner for growth",
    priceLabel: "Partnership model",
    highlight: false,
    includes: [
      "Everything in Product",
      "Commerce & operations layer",
      "Automations + call concierge",
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
      "After replacing a template site with a trust-first clinic funnel and clearer service paths.",
  },
  {
    metric: "18 hrs",
    label: "admin saved / week",
    context:
      "Intake completeness agents and auto follow-ups cut rework between front desk and coordinators.",
  },
  {
    metric: "1 stack",
    label: "instead of 5 vendors",
    context:
      "Website, PWA, dashboard, and automations owned by one accountable partner.",
  },
] as const;

export const testimonials = [
  {
    quote:
      "We finally have a digital presence that feels as clinical as our care—and a system the team can actually run.",
    name: "Dr. Mira Elson",
    role: "Medical Director, longevity practice",
  },
  {
    quote:
      "The difference was ownership. Synapto didn’t hand us a site and disappear. They built the website, the app layer, and the workflows.",
    name: "Jordan Hale",
    role: "COO, multi-location wellness clinic",
  },
  {
    quote:
      "Patients understand what we offer faster. Staff spend less time chasing incomplete intakes. That is real conversion.",
    name: "Sofia Nguyen",
    role: "Practice Manager, aesthetic clinic",
  },
] as const;

export const conversionFaq = [
  {
    q: "Do we have to buy everything at once?",
    a: "No. Most clinics start with Presence (website + conversion architecture), then layer apps, PWAs, AI agents, and operations when ready. We design the path so nothing is thrown away.",
  },
  {
    q: "How fast can we launch?",
    a: "A focused clinic website can move from discovery to launch in weeks when scope is clear. Apps, PWAs, and full systems are phased with milestones you can see before we build.",
  },
  {
    q: "Will this work for regulated healthcare offers?",
    a: "Yes. We design for clinical trust, clear claims boundaries, and operational control. We do not replace your compliance counsel—we build experiences that support responsible marketing and intake.",
  },
  {
    q: "What happens after launch?",
    a: "You get training, documentation, and an optional partnership for ongoing optimization—funnels, agents, content, and product surfaces—so conversion keeps improving.",
  },
  {
    q: "Can you replace our current agency and tools?",
    a: "That is the point. One partner for websites, apps, PWAs, and systems—so you stop paying for disconnected vendors that do not share accountability for results.",
  },
  {
    q: "Do you use Cal.com or another booking embed?",
    a: "No. Strategy calls are booked on our own calendar system with live availability. You can also take a recommendation quiz, explore clickable demos, or reserve a project start with a deposit.",
  },
  {
    q: "How do deposits work?",
    a: "Choose Presence, Product, or System and reserve your place in the build queue. We confirm payment details by email within one business day, then schedule kickoff.",
  },
] as const;

export const midCta = {
  eyebrow: "Next step",
  title: "Get a clear plan for your clinic’s digital stack.",
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
    "Human review always stays on clinical decisions and patient messaging",
  ],
} as const;
