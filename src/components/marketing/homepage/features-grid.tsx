import { FadeIn } from "@/components/marketing/fade-in";
import {
  Section,
  SectionEyebrow,
  SectionHeading,
  SectionLead,
} from "@/components/marketing/section";
import { Card, CardContent } from "@/components/ui/card";
import {
  BarChart3,
  CreditCard,
  Globe,
  Layers,
  Lock,
  Mail,
  MapPin,
  Package,
  Percent,
  Search,
  ShoppingCart,
  Smartphone,
  Store,
  Users,
  FileText,
  Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";

type FeatureItem = {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  size?: "large" | "small";
};

const features: FeatureItem[] = [
  {
    title: "Custom storefronts",
    description:
      "Brand-forward templates and layout controls tailored to how your catalog actually sells.",
    icon: Store,
    size: "large",
  },
  {
    title: "Mobile-first experiences",
    description:
      "Fast, responsive storefronts where most buyers and clients discover you.",
    icon: Smartphone,
    size: "large",
  },
  {
    title: "Product catalogs",
    description: "Collections, variants, and structured merchandising.",
    icon: Layers,
    size: "small",
  },
  {
    title: "Cart & checkout",
    description: "Streamlined purchase flows with configurable steps.",
    icon: ShoppingCart,
    size: "small",
  },
  {
    title: "Secure checkout integrations",
    description: "Connect approved payment processors during onboarding.",
    icon: Lock,
    size: "small",
  },
  {
    title: "Customer accounts",
    description: "Order history and profile management for repeat buyers.",
    icon: Users,
    size: "small",
  },
  {
    title: "Order management",
    description: "Statuses, notes, and fulfillment visibility in one place.",
    icon: Package,
    size: "small",
  },
  {
    title: "Content management",
    description: "Pages, policies, and educational content without code.",
    icon: FileText,
    size: "small",
  },
  {
    title: "Analytics",
    description: "Revenue, conversion, and product insights you can act on.",
    icon: BarChart3,
    size: "large",
  },
  {
    title: "SEO foundations",
    description: "Metadata, structure, and performance-minded defaults.",
    icon: Search,
    size: "small",
  },
  {
    title: "Email integrations",
    description: "Connect marketing and transactional tools you already use.",
    icon: Mail,
    size: "small",
  },
  {
    title: "Discounts & promotions",
    description: "Codes and campaigns with clear rules and limits.",
    icon: Percent,
    size: "small",
  },
  {
    title: "Multi-location",
    description: "Support for practices operating across sites or regions.",
    icon: MapPin,
    size: "small",
  },
  {
    title: "Custom domains",
    description: "Launch on your domain with guided DNS setup.",
    icon: Globe,
    size: "small",
  },
  {
    title: "Payment integrations",
    description: "Subject to approval based on your business type and products.",
    icon: CreditCard,
    size: "small",
  },
  {
    title: "Compliance-oriented controls",
    description:
      "Configurable restrictions and review workflows aligned to your legal requirements—not a substitute for counsel.",
    icon: Shield,
    size: "large",
  },
];

export function FeaturesGridSection() {
  const large = features.filter((f) => f.size === "large");
  const small = features.filter((f) => f.size !== "large");

  return (
    <Section className="bg-white/50">
      <FadeIn>
        <SectionEyebrow>Capabilities</SectionEyebrow>
        <SectionHeading>Built for serious healthcare commerce.</SectionHeading>
        <SectionLead>
          A thoughtful mix of storefront, operations, and growth tools—configured
          to match how your practice actually sells.
        </SectionLead>
      </FadeIn>

      <div className="mt-14 grid gap-4 md:grid-cols-2">
        {large.map((feature, i) => (
          <FadeIn key={feature.title} delay={0.04 * i}>
            <Card className="h-full border-border/80 bg-gradient-to-br from-white to-off-white/80">
              <CardContent className="flex h-full flex-col p-6 md:p-7">
                <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <feature.icon className="h-5 w-5" />
                </span>
                <h3 className="text-lg font-semibold text-midnight">
                  {feature.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          </FadeIn>
        ))}
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {small.map((feature, i) => (
          <FadeIn key={feature.title} delay={0.03 * (i % 8)}>
            <div
              className={cn(
                "h-full rounded-2xl border border-border/70 bg-white/80 p-5",
                "transition-colors hover:border-primary/20 hover:bg-white"
              )}
            >
              <feature.icon className="mb-3 h-4 w-4 text-sage" />
              <p className="text-sm font-semibold text-midnight">
                {feature.title}
              </p>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}
