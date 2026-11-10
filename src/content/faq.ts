export type FaqItem = {
  id: string;
  question: string;
  answer: string;
  category: "Platform" | "Onboarding" | "Compliance" | "Billing";
};

export const faqItems: FaqItem[] = [
  {
    id: "what-is-synapto",
    category: "Platform",
    question: "What is Synapto Tech?",
    answer:
      "Synapto Tech is commerce infrastructure for licensed healthcare businesses—combining storefronts, catalog management, orders, and operational tools in one connected platform. We focus on premium digital experiences, not generic retail templates.",
  },
  {
    id: "who-is-it-for",
    category: "Platform",
    question: "Who is the platform designed for?",
    answer:
      "Clinics, wellness brands, aesthetic practices, longevity programs, telehealth businesses, and licensed healthcare product companies that sell online. Onboarding includes a review of your business type and catalog to confirm fit.",
  },
  {
    id: "hipaa",
    category: "Compliance",
    question: "Is Synapto Tech a HIPAA-compliant platform?",
    answer:
      "Synapto Tech provides commerce and operations tooling. We do not represent that our standard platform offering satisfies HIPAA or other regulatory frameworks on its own. Your obligations depend on what you sell, how you collect data, and your workflows. We encourage you to work with qualified legal and compliance advisors.",
  },
  {
    id: "payments",
    category: "Onboarding",
    question: "How do payments work?",
    answer:
      "You connect approved payment processors during onboarding. Eligibility depends on your products, business model, and processor requirements. We help you configure checkout flows—we do not process card payments directly.",
  },
  {
    id: "launch-time",
    category: "Onboarding",
    question: "How long does launch typically take?",
    answer:
      "Timelines vary with catalog size, brand design, integrations, and content readiness. Many teams plan a phased launch: core storefront first, then expanded merchandising and integrations. We outline milestones during your strategy call.",
  },
  {
    id: "integrations",
    category: "Platform",
    question: "What integrations are supported?",
    answer:
      "Common connections include payment processors, email and marketing tools, analytics, and domain/DNS setup. Specific integrations are confirmed during onboarding based on your stack and approval requirements.",
  },
  {
    id: "pricing-model",
    category: "Billing",
    question: "How is pricing structured?",
    answer:
      "We use consultation-led packaging—Essentials, Growth, and Enterprise—scoped to your catalog, locations, and operational needs. We do not publish one-size-fits-all monthly rates; we align scope and investment in a conversation.",
  },
  {
    id: "data-ownership",
    category: "Platform",
    question: "Who owns customer and order data?",
    answer:
      "You retain ownership of your business data subject to our agreements and applicable law. Export and portability options are discussed during onboarding for your operational requirements.",
  },
  {
    id: "support",
    category: "Onboarding",
    question: "What support is included?",
    answer:
      "Support levels depend on your package and launch phase. All customers receive access to documented workflows and a designated channel for platform questions during implementation.",
  },
  {
    id: "restricted-products",
    category: "Compliance",
    question: "Are there product or category restrictions?",
    answer:
      "Yes. We configure catalogs and checkout rules to reflect your legal obligations and our acceptable use standards. Prohibited or restricted items are evaluated during onboarding; we may decline businesses that fall outside our scope.",
  },
];

export const faqCategories = ["Platform", "Onboarding", "Compliance", "Billing"] as const;
