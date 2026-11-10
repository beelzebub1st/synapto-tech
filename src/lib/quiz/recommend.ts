export type QuizAnswers = {
  priority: "website" | "app" | "system" | "unsure";
  stage: "idea" | "redesign" | "scaling";
  team: "solo" | "small" | "multi";
  urgency: "asap" | "month" | "quarter";
  commerce: "yes" | "later" | "no";
};

export type PackageKey = "presence" | "product" | "system";

export function recommendPackage(answers: QuizAnswers) {
  const scores: Record<PackageKey, number> = {
    presence: 0,
    product: 0,
    system: 0,
  };

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

  if (answers.team === "solo") scores.presence += 1;
  if (answers.team === "small") scores.product += 2;
  if (answers.team === "multi") scores.system += 2;

  if (answers.urgency === "asap") scores.presence += 1;
  if (answers.urgency === "month") scores.product += 1;
  if (answers.urgency === "quarter") scores.system += 1;

  if (answers.commerce === "yes") scores.system += 2;
  if (answers.commerce === "later") scores.product += 1;

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
  const bits: string[] = [];

  if (answers.priority === "website") {
    bits.push("You need conversion on the public site first");
  } else if (answers.priority === "app") {
    bits.push("Patients/staff need a product surface beyond a brochure site");
  } else if (answers.priority === "system") {
    bits.push("You’re ready for a connected operating layer");
  } else {
    bits.push("You’re still mapping the stack — we scored the safest strong start");
  }

  if (answers.stage === "idea") {
    bits.push("starting from a weak or new digital presence");
  } else if (answers.stage === "redesign") {
    bits.push("with an existing site that isn’t earning its keep");
  } else {
    bits.push("while scaling locations, offers, or ops");
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
        ? "Product pairs the website with an app/PWA and operating tools."
        : "System is the full partner path — commerce, agents, and ops included.";

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
    tagline: "A high-converting clinic website and brand foundation.",
    depositCents: 150000,
    depositLabel: "€1,500",
    vibe: "Trust-first · Convert-ready",
    firstWin: "A clinic site that turns visitors into booked patients.",
    bullets: [
      "Conversion-led clinic website",
      "Brand-aligned design system",
      "Editable content workspace",
      "Launch training",
    ],
  },
  product: {
    name: "Product",
    tagline: "Website plus app/PWA and clinic operating tools.",
    depositCents: 350000,
    depositLabel: "€3,500",
    vibe: "Website + product layer",
    firstWin: "Patients use a real product — intake, status, follow-up.",
    bullets: [
      "Everything in Presence",
      "Patient or staff PWA/app",
      "Intake + booking workflows",
      "AI follow-up agents",
    ],
  },
  system: {
    name: "System",
    tagline: "Full digital operating partner for growth clinics.",
    depositCents: 750000,
    depositLabel: "€7,500",
    vibe: "Full operating partner",
    firstWin: "One stack for conversion, ops, agents, and growth.",
    bullets: [
      "Everything in Product",
      "Commerce & operations layer",
      "Automations + call concierge",
      "Ongoing optimization partnership",
    ],
  },
};

export const QUIZ_STEPS = [
  {
    id: "priority",
    hook: "Start here",
    question: "What do you need most right now?",
    support: "Be honest — this steers the whole recommendation.",
    options: [
      {
        value: "website",
        label: "A website that converts",
        detail: "Trust-first pages that turn visits into booked patients",
        icon: "globe",
      },
      {
        value: "app",
        label: "An app or PWA",
        detail: "Installable patient/staff product beyond a brochure site",
        icon: "smartphone",
      },
      {
        value: "system",
        label: "A full operating system",
        detail: "Website, product, ops, agents — one accountable stack",
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
    question: "Where is your clinic digitally today?",
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
    id: "team",
    hook: "Who runs it",
    question: "Who will use this day to day?",
    support: "The right product depends on who touches it.",
    options: [
      {
        value: "solo",
        label: "Founder / leadership",
        detail: "A tight leadership circle owns decisions and edits",
        icon: "user",
      },
      {
        value: "small",
        label: "Front desk + coordinators",
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
  {
    id: "commerce",
    hook: "Revenue layer",
    question: "Will you sell products or packages online?",
    support: "Commerce changes whether you need a full system.",
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
        detail: "Focus on trust, booking, and clinical operations",
        icon: "ban",
      },
    ],
  },
] as const;
