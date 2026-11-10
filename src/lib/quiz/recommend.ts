export type QuizAnswers = {
  industry:
    | "b2b"
    | "ecommerce"
    | "services"
    | "saas"
    | "local"
    | "other";
  size: "solo" | "smb" | "mid" | "enterprise";
  priority: "website" | "app" | "system" | "unsure";
  stage: "idea" | "redesign" | "scaling";
  goal: "leads" | "sales" | "bookings" | "portal" | "brand";
  commerce: "yes" | "later" | "no";
  productSurface: "none" | "pwa" | "native" | "both";
  automation: "none" | "basic" | "agents" | "full";
  team: "solo" | "small" | "multi";
  pain: "conversion" | "tools" | "followup" | "ops" | "brand";
  budget: "lean" | "standard" | "growth" | "enterprise";
  urgency: "asap" | "month" | "quarter";
};

export type PackageKey = "presence" | "product" | "system";

export function recommendPackage(answers: QuizAnswers) {
  const scores: Record<PackageKey, number> = {
    presence: 0,
    product: 0,
    system: 0,
  };

  if (answers.industry === "b2b" || answers.industry === "saas") {
    scores.product += 1;
    scores.system += 1;
  }
  if (answers.industry === "ecommerce") {
    scores.product += 2;
    scores.system += 1;
  }
  if (answers.industry === "services" || answers.industry === "local") {
    scores.presence += 1;
    scores.product += 1;
  }

  if (answers.size === "solo" || answers.size === "smb") scores.presence += 1;
  if (answers.size === "mid") {
    scores.product += 2;
    scores.system += 1;
  }
  if (answers.size === "enterprise") scores.system += 3;

  if (answers.priority === "website") scores.presence += 3;
  if (answers.priority === "app") scores.product += 3;
  if (answers.priority === "system") scores.system += 3;
  if (answers.priority === "unsure") {
    scores.presence += 1;
    scores.product += 1;
  }

  if (answers.stage === "idea") scores.presence += 2;
  if (answers.stage === "redesign") {
    scores.presence += 1;
    scores.product += 2;
  }
  if (answers.stage === "scaling") scores.system += 3;

  if (answers.goal === "brand" || answers.goal === "leads") scores.presence += 2;
  if (answers.goal === "bookings" || answers.goal === "portal") {
    scores.product += 2;
  }
  if (answers.goal === "sales") {
    scores.product += 1;
    scores.system += 2;
  }

  if (answers.commerce === "yes") {
    scores.product += 1;
    scores.system += 2;
  }
  if (answers.commerce === "later") scores.product += 1;

  if (answers.productSurface === "pwa" || answers.productSurface === "native") {
    scores.product += 3;
  }
  if (answers.productSurface === "both") {
    scores.product += 2;
    scores.system += 2;
  }

  if (answers.automation === "basic") scores.product += 1;
  if (answers.automation === "agents") {
    scores.product += 2;
    scores.system += 1;
  }
  if (answers.automation === "full") scores.system += 3;

  if (answers.team === "solo") scores.presence += 1;
  if (answers.team === "small") scores.product += 2;
  if (answers.team === "multi") scores.system += 2;

  if (answers.pain === "conversion" || answers.pain === "brand") {
    scores.presence += 2;
  }
  if (answers.pain === "followup") scores.product += 2;
  if (answers.pain === "tools" || answers.pain === "ops") scores.system += 2;

  if (answers.budget === "lean") scores.presence += 2;
  if (answers.budget === "standard") scores.product += 2;
  if (answers.budget === "growth") {
    scores.product += 1;
    scores.system += 2;
  }
  if (answers.budget === "enterprise") scores.system += 3;

  if (answers.urgency === "asap") scores.presence += 1;
  if (answers.urgency === "month") scores.product += 1;
  if (answers.urgency === "quarter") scores.system += 1;

  const ordered = (Object.keys(scores) as PackageKey[]).sort(
    (a, b) => scores[b] - scores[a]
  );
  const recommended = ordered[0];
  const total = Object.values(scores).reduce((a, b) => a + b, 0) || 1;
  const matchPercent = Math.round((scores[recommended] / total) * 100);

  return {
    recommended,
    scores,
    matchPercent,
    insight: buildInsight(answers, recommended),
    summary: PACKAGE_COPY[recommended],
  };
}

function buildInsight(answers: QuizAnswers, recommended: PackageKey) {
  const industryLabel: Record<QuizAnswers["industry"], string> = {
    b2b: "B2B",
    ecommerce: "e-commerce",
    services: "professional services",
    saas: "SaaS / tech",
    local: "local business",
    other: "growing business",
  };

  const bits: string[] = [
    `For a ${industryLabel[answers.industry]} team`,
  ];

  if (answers.priority === "website") {
    bits.push("conversion on the public site comes first");
  } else if (answers.priority === "app") {
    bits.push("commerce, a portal, or an app is the next surface");
  } else if (answers.priority === "system") {
    bits.push("you’re ready for a connected operating layer");
  } else {
    bits.push("we scored the safest strong start while you map the stack");
  }

  if (answers.pain === "conversion") {
    bits.push("with traffic that isn’t turning into pipeline");
  } else if (answers.pain === "tools") {
    bits.push("while too many tools create handoff chaos");
  } else if (answers.pain === "followup") {
    bits.push("because follow-ups and incomplete work keep slipping");
  } else if (answers.pain === "ops") {
    bits.push("with ops that need one dashboard instead of spreadsheets");
  } else {
    bits.push("and brand presence that needs to feel premium");
  }

  if (answers.automation === "agents" || answers.automation === "full") {
    bits.push("AI agents belong in the plan");
  }

  if (answers.urgency === "asap") {
    bits.push("and you want a first win fast");
  } else if (answers.urgency === "month") {
    bits.push("on about a month’s timeline");
  } else {
    bits.push("with a planned quarter rollout");
  }

  const packageLine =
    recommended === "presence"
      ? "Presence locks brand + website conversion before you overbuild."
      : recommended === "product"
        ? "Product pairs the website with commerce, an app/PWA, AI agents, and operating tools."
        : "System is the full partner path — websites, commerce, apps, agents, and ops included.";

  return `${bits.join(", ")}. ${packageLine}`;
}

export const PACKAGE_COPY: Record<
  PackageKey,
  {
    name: string;
    tagline: string;
    depositCents: number;
    depositLabel: string;
    bullets: string[];
    vibe: string;
    firstWin: string;
  }
> = {
  presence: {
    name: "Presence",
    tagline: "A high-converting website and brand foundation.",
    depositCents: 150000,
    depositLabel: "€1,500",
    vibe: "Trust-first · Convert-ready",
    firstWin: "A website that turns visitors into enquiries and sales.",
    bullets: [
      "Marketing, B2B, or brand website",
      "Conversion architecture",
      "Editable content workspace",
      "Launch training",
    ],
  },
  product: {
    name: "Product",
    tagline: "Website plus commerce, app/PWA, and AI tools.",
    depositCents: 350000,
    depositLabel: "€3,500",
    vibe: "Website + commerce/product layer",
    firstWin: "Buyers use a real product — shop, portal, app, or PWA.",
    bullets: [
      "Everything in Presence",
      "Commerce site or customer/staff app",
      "Lead, booking & ordering workflows",
      "AI follow-up agents",
    ],
  },
  system: {
    name: "System",
    tagline: "Full digital partner for B2B and growth companies.",
    depositCents: 750000,
    depositLabel: "€7,500",
    vibe: "Full operating partner",
    firstWin: "One stack for websites, commerce, apps, agents, and ops.",
    bullets: [
      "Everything in Product",
      "Full commerce & operations layer",
      "Automations + call concierge",
      "Ongoing optimization partnership",
    ],
  },
};

export const QUIZ_STEPS = [
  {
    id: "industry",
    hook: "Your business",
    question: "What kind of business are you?",
    support: "This shapes the examples, stack, and offer we recommend.",
    options: [
      {
        value: "b2b",
        label: "B2B / industrial",
        detail: "Complex buyers, RFQs, accounts, longer sales cycles",
        icon: "factory",
      },
      {
        value: "ecommerce",
        label: "E-commerce / product brand",
        detail: "Storefronts, catalogs, checkout, and repeat purchase",
        icon: "cart",
      },
      {
        value: "services",
        label: "Professional services",
        detail: "Agencies, advisors, firms selling expertise",
        icon: "briefcase",
      },
      {
        value: "saas",
        label: "SaaS / tech company",
        detail: "Product marketing, demos, portals, growth surfaces",
        icon: "layout",
      },
      {
        value: "local",
        label: "Local / multi-location",
        detail: "Studios, shops, venues, or regional operators",
        icon: "store",
      },
      {
        value: "other",
        label: "Something else",
        detail: "We’ll still score a strong starting path",
        icon: "compass",
      },
    ],
  },
  {
    id: "size",
    hook: "Scale",
    question: "How big is the company today?",
    support: "Size changes whether you need a site, a product, or a full system.",
    options: [
      {
        value: "solo",
        label: "Founder / very small team",
        detail: "1–5 people · lean decisions",
        icon: "user",
      },
      {
        value: "smb",
        label: "Small business",
        detail: "About 6–25 people",
        icon: "users",
      },
      {
        value: "mid",
        label: "Growing company",
        detail: "About 26–150 people or multi-team",
        icon: "building",
      },
      {
        value: "enterprise",
        label: "Enterprise / multi-brand",
        detail: "Complex stakeholders and locations",
        icon: "globe",
      },
    ],
  },
  {
    id: "priority",
    hook: "Start here",
    question: "What do you need most right now?",
    support: "Be honest — this steers the whole recommendation.",
    options: [
      {
        value: "website",
        label: "A website that converts",
        detail: "Marketing, B2B, or brand pages that turn visits into pipeline",
        icon: "globe",
      },
      {
        value: "app",
        label: "Commerce, app, or PWA",
        detail: "Storefront, portal, or installable product beyond a brochure site",
        icon: "smartphone",
      },
      {
        value: "system",
        label: "A full operating system",
        detail: "Website, commerce, apps, ops, agents — one accountable stack",
        icon: "layout",
      },
      {
        value: "unsure",
        label: "Not sure yet",
        detail: "We’ll score the strongest starting path for you",
        icon: "compass",
      },
    ],
  },
  {
    id: "stage",
    hook: "Your baseline",
    question: "Where is your business digitally today?",
    support: "This tells us whether to rebuild, upgrade, or unify.",
    options: [
      {
        value: "idea",
        label: "Starting fresh",
        detail: "Weak presence, new brand, or no real site yet",
        icon: "spark",
      },
      {
        value: "redesign",
        label: "Have a site — it underperforms",
        detail: "Looks fine, but enquiries and trust don’t convert",
        icon: "refresh",
      },
      {
        value: "scaling",
        label: "Scaling hard",
        detail: "More locations, offers, staff, or tool chaos",
        icon: "growth",
      },
    ],
  },
  {
    id: "goal",
    hook: "Outcome",
    question: "What should success look like first?",
    support: "We’ll prioritize the surface that unlocks this outcome.",
    options: [
      {
        value: "leads",
        label: "More qualified leads",
        detail: "Forms, demos, and enquiries that actually convert",
        icon: "target",
      },
      {
        value: "sales",
        label: "More online sales / orders",
        detail: "Catalog, checkout, or B2B ordering that closes",
        icon: "cart",
      },
      {
        value: "bookings",
        label: "More bookings / appointments",
        detail: "Clear paths to schedule without phone-tag",
        icon: "calendar",
      },
      {
        value: "portal",
        label: "Customer or partner portal",
        detail: "Status, docs, reorders, or account self-serve",
        icon: "smartphone",
      },
      {
        value: "brand",
        label: "Stronger brand presence",
        detail: "Look premium and credible before the first call",
        icon: "spark",
      },
    ],
  },
  {
    id: "commerce",
    hook: "Revenue layer",
    question: "Will you sell products or packages online?",
    support: "Commerce changes whether you need Product or System.",
    options: [
      {
        value: "yes",
        label: "Yes — soon or already",
        detail: "Catalogs, packages, or paid offers belong in the stack",
        icon: "cart",
      },
      {
        value: "later",
        label: "Later — site/app first",
        detail: "Conversion and product first; commerce can plug in",
        icon: "clock",
      },
      {
        value: "no",
        label: "No commerce needed",
        detail: "Focus on trust, leads, booking, and operations",
        icon: "ban",
      },
    ],
  },
  {
    id: "productSurface",
    hook: "Product layer",
    question: "Do you need an app, PWA, or customer portal?",
    support: "This is where brochure sites stop and real products begin.",
    options: [
      {
        value: "none",
        label: "Website only for now",
        detail: "Public site and conversion paths are enough",
        icon: "globe",
      },
      {
        value: "pwa",
        label: "Installable PWA / portal",
        detail: "Home-screen web app for customers or staff",
        icon: "smartphone",
      },
      {
        value: "native",
        label: "Native-feel mobile app",
        detail: "Polished app experience for booking, shop, or ops",
        icon: "device",
      },
      {
        value: "both",
        label: "Portal + app surfaces",
        detail: "Multiple product surfaces across audiences",
        icon: "layers",
      },
    ],
  },
  {
    id: "automation",
    hook: "AI & workflows",
    question: "How far do you want AI and automations?",
    support: "We only recommend agents where they’ll save real hours.",
    options: [
      {
        value: "none",
        label: "Not yet",
        detail: "Focus on the site/product first",
        icon: "ban",
      },
      {
        value: "basic",
        label: "Basic automations",
        detail: "Reminders, routing, simple follow-ups",
        icon: "zap",
      },
      {
        value: "agents",
        label: "AI agents",
        detail: "Lead screening, draft replies, call assist",
        icon: "bot",
      },
      {
        value: "full",
        label: "Full automation stack",
        detail: "Agents + workflows across sales, ops, and support",
        icon: "workflow",
      },
    ],
  },
  {
    id: "team",
    hook: "Who runs it",
    question: "Who will use this day to day?",
    support: "The right product depends on who touches it.",
    options: [
      {
        value: "solo",
        label: "Founder / leadership",
        detail: "A tight circle owns decisions and edits",
        icon: "user",
      },
      {
        value: "small",
        label: "Ops + sales team",
        detail: "Daily intake, booking, and follow-up by a small team",
        icon: "users",
      },
      {
        value: "multi",
        label: "Multi-role / multi-location",
        detail: "Different roles and sites need one operating layer",
        icon: "building",
      },
    ],
  },
  {
    id: "pain",
    hook: "Friction",
    question: "What’s the biggest digital pain right now?",
    support: "This tells us what to fix first — and what not to overbuild.",
    options: [
      {
        value: "conversion",
        label: "Site doesn’t convert",
        detail: "Traffic comes in, pipeline stays thin",
        icon: "target",
      },
      {
        value: "brand",
        label: "Brand looks weak online",
        detail: "You look smaller or cheaper than you are",
        icon: "spark",
      },
      {
        value: "followup",
        label: "Follow-ups slip",
        detail: "Leads, forms, and incomplete work get lost",
        icon: "mail",
      },
      {
        value: "tools",
        label: "Too many tools",
        detail: "Vendors and spreadsheets don’t talk to each other",
        icon: "layers",
      },
      {
        value: "ops",
        label: "Ops are manual",
        detail: "Staff retype everything across systems",
        icon: "workflow",
      },
    ],
  },
  {
    id: "budget",
    hook: "Investment",
    question: "What investment range feels realistic?",
    support: "No hard pitch — this keeps the recommendation honest.",
    options: [
      {
        value: "lean",
        label: "Lean start",
        detail: "Focused website / Presence-first path",
        icon: "clock",
      },
      {
        value: "standard",
        label: "Standard project",
        detail: "Room for website + product layer",
        icon: "target",
      },
      {
        value: "growth",
        label: "Growth build",
        detail: "Commerce, apps, and AI in scope",
        icon: "growth",
      },
      {
        value: "enterprise",
        label: "Partnership / system",
        detail: "Full stack with ongoing optimization",
        icon: "building",
      },
    ],
  },
  {
    id: "urgency",
    hook: "Timeline",
    question: "How soon do you want a first launch?",
    support: "We’ll match scope to a realistic first win.",
    options: [
      {
        value: "asap",
        label: "As soon as possible",
        detail: "Need momentum now — clear, shippable first slice",
        icon: "zap",
      },
      {
        value: "month",
        label: "Within about a month",
        detail: "Enough room for a strong website + product foundation",
        icon: "calendar",
      },
      {
        value: "quarter",
        label: "This quarter",
        detail: "Planned rollout with room for systems and ops",
        icon: "target",
      },
    ],
  },
] as const;
