export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  category: string;
  readingMinutes: number;
  blocks: BlogBlock[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "healthcare-commerce-beyond-generic-storefronts",
    title: "Healthcare commerce is not generic e-commerce",
    excerpt:
      "Why licensed providers need storefronts that respect catalog nuance, clear policies, and operational reality—not off-the-shelf retail playbooks.",
    publishedAt: "2026-03-12",
    category: "Strategy",
    readingMinutes: 7,
    blocks: [
      {
        type: "p",
        text: "Patients and clients expect the same polish they see from leading consumer brands—but healthcare-oriented businesses operate under different constraints. Catalog rules, disclosure expectations, and fulfillment workflows rarely map cleanly to generic shopping cart templates.",
      },
      {
        type: "h2",
        text: "Trust starts with clarity",
      },
      {
        type: "p",
        text: "A premium storefront for a clinic or wellness brand should make product information, policies, and purchase steps easy to understand. That does not mean overpromising outcomes or blending medical claims with merchandising language. It means intentional copy, structured product data, and checkout flows that match what you are actually selling.",
      },
      {
        type: "ul",
        items: [
          "Separate educational content from product listings where appropriate.",
          "Surface shipping, returns, and professional-use disclaimers in consistent locations.",
          "Design mobile-first—most discovery happens on phones.",
        ],
      },
      {
        type: "h2",
        text: "Operations behind the glass",
      },
      {
        type: "p",
        text: "The visible storefront is only half the story. Orders, customer records, and catalog updates should live in one operational layer so your team is not reconciling spreadsheets across tools. Synapto Tech is built around that connected model—storefront plus dashboard—not a detached website builder.",
      },
      {
        type: "p",
        text: "This article is general information, not legal advice. Requirements vary by jurisdiction, product type, and business model. Consult qualified advisors for your situation.",
      },
    ],
  },
  {
    slug: "designing-storefronts-for-clinical-brands",
    title: "Designing storefronts that feel clinical-grade and consumer-clear",
    excerpt:
      "Visual hierarchy, policy placement, and catalog structure for practices that sell supplements, devices, or care-adjacent products online.",
    publishedAt: "2026-02-28",
    category: "Storefronts",
    readingMinutes: 6,
    blocks: [
      {
        type: "p",
        text: "Aesthetic clinics, longevity programs, and wellness brands often sell high-consideration products. The storefront should feel premium without implying regulated outcomes the business cannot support.",
      },
      {
        type: "h2",
        text: "Merchandising with restraint",
      },
      {
        type: "p",
        text: "Lead with what the customer receives: ingredients, materials, usage context, and fulfillment expectations. Avoid urgency tactics that undermine trust. Use photography and layout that reflect your in-person brand standards.",
      },
      {
        type: "h2",
        text: "Policy pages are part of the product",
      },
      {
        type: "p",
        text: "Returns, shipping, privacy, and healthcare commerce disclaimers should be written in plain language and linked consistently from footer, checkout, and product detail templates. Templates can enforce those links so nothing launches without baseline coverage.",
      },
      {
        type: "ul",
        items: [
          "Use reusable content blocks for disclaimers that counsel approves.",
          "Version policy updates and note effective dates.",
          "Keep checkout acknowledgments aligned with your counsel’s guidance.",
        ],
      },
      {
        type: "p",
        text: "Synapto Tech provides configurable content and checkout controls—not legal templates. Work with your advisors to finalize language.",
      },
    ],
  },
  {
    slug: "compliance-considerations-for-online-healthcare-sales",
    title: "Compliance considerations when selling healthcare-oriented products online",
    excerpt:
      "A practical checklist of questions—not shortcuts—for teams launching or expanding digital product sales.",
    publishedAt: "2026-01-15",
    category: "Compliance",
    readingMinutes: 8,
    blocks: [
      {
        type: "p",
        text: "Selling online as a licensed provider or healthcare brand introduces questions about product claims, interstate commerce, payment processor rules, and data handling. No software platform replaces professional compliance review.",
      },
      {
        type: "h2",
        text: "Questions to resolve before launch",
      },
      {
        type: "ul",
        items: [
          "Which products may be sold direct-to-consumer in your jurisdictions?",
          "What disclaimers and labeling are required for your catalog?",
          "Does your checkout collect information that triggers additional obligations?",
          "Are your payment and fulfillment partners approved for your categories?",
          "How will you handle restricted SKUs, age gates, or professional-only items?",
        ],
      },
      {
        type: "h2",
        text: "How platform controls help",
      },
      {
        type: "p",
        text: "Synapto Tech supports configurable catalog restrictions, review workflows, and policy surfaces aligned to requirements you define with counsel. We do not certify your business as compliant with HIPAA, FDA, state medical board rules, or other frameworks.",
      },
      {
        type: "h2",
        text: "When to pause and get advice",
      },
      {
        type: "p",
        text: "If you are unsure whether a product, bundle, or subscription belongs online, pause merchandising until advisors sign off. Launching fast without clarity creates risk for your brand and your customers.",
      },
      {
        type: "p",
        text: "For platform-specific questions about controls and onboarding, book a demo or contact our team. For legal interpretation, engage qualified counsel.",
      },
    ],
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getAllPostSlugs(): string[] {
  return blogPosts.map((p) => p.slug);
}
