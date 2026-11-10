import { FadeIn } from "@/components/marketing/fade-in";
import {
  Section,
  SectionEyebrow,
  SectionHeading,
  SectionLead,
} from "@/components/marketing/section";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const features = [
  {
    title: "Beautiful Online Storefronts",
    description:
      "Launch polished, on-brand storefronts with layouts tuned for healthcare products and services.",
    visual: "storefront",
  },
  {
    title: "Product Management",
    description:
      "Organize variants, collections, and merchandising from a single catalog built for clarity.",
    visual: "products",
  },
  {
    title: "Order Management",
    description:
      "Track status, fulfillment, and customer details without jumping between systems.",
    visual: "orders",
  },
  {
    title: "Customer Management",
    description:
      "See purchase history and contact context so your team can respond with confidence.",
    visual: "customers",
  },
  {
    title: "Analytics and Reporting",
    description:
      "Understand revenue, conversion, and product performance with dashboards you can act on.",
    visual: "analytics",
  },
  {
    title: "Content Management",
    description:
      "Update pages, policies, and educational content without developer bottlenecks.",
    visual: "cms",
  },
] as const;

function FeatureVisual({ type }: { type: (typeof features)[number]["visual"] }) {
  if (type === "storefront") {
    return (
      <div className="overflow-hidden rounded-xl border border-border bg-[#fbfcfb]">
        <div className="h-16 bg-gradient-to-br from-sage/30 to-primary/10" />
        <div className="space-y-2 p-3">
          <div className="h-2 w-2/3 rounded bg-midnight/10" />
          <div className="h-2 w-full rounded bg-midnight/[0.06]" />
          <div className="mt-3 grid grid-cols-3 gap-1.5">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="aspect-[4/5] rounded-md bg-white shadow-sm ring-1 ring-border/60"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
  if (type === "products") {
    return (
      <div className="space-y-2 rounded-xl border border-border bg-white p-3">
        {[1, 2, 3].map((n) => (
          <div key={n} className="flex items-center gap-2 rounded-lg bg-[#fbfcfb] p-2">
            <div className="h-8 w-8 rounded-md bg-sage/25" />
            <div className="flex-1 space-y-1">
              <div className="h-1.5 w-3/4 rounded bg-midnight/15" />
              <div className="h-1.5 w-1/2 rounded bg-midnight/[0.06]" />
            </div>
            <div className="h-5 w-10 rounded-full bg-primary/10 text-[8px] font-medium text-primary flex items-center justify-center">
              Live
            </div>
          </div>
        ))}
      </div>
    );
  }
  if (type === "orders") {
    return (
      <div className="rounded-xl border border-border bg-white p-3 text-[10px]">
        <div className="mb-2 flex gap-2 border-b border-border pb-2 font-medium text-muted-foreground">
          <span className="flex-1">Order</span>
          <span className="w-14">Status</span>
        </div>
        {["ORD-10482", "ORD-10479", "ORD-10471"].map((id, i) => (
          <div key={id} className="flex items-center gap-2 py-1.5">
            <span className="flex-1 font-medium text-midnight">{id}</span>
            <span
              className={cn(
                "w-14 rounded-full px-1.5 py-0.5 text-center",
                i === 0 ? "bg-emerald-50 text-emerald-700" : "bg-secondary text-muted-foreground"
              )}
            >
              {i === 0 ? "Shipped" : "Paid"}
            </span>
          </div>
        ))}
      </div>
    );
  }
  if (type === "customers") {
    return (
      <div className="grid grid-cols-2 gap-2">
        {["EM", "JK", "AL"].map((initials) => (
          <div
            key={initials}
            className="rounded-xl border border-border bg-[#fbfcfb] p-2.5"
          >
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-midnight text-[9px] font-medium text-white">
                {initials}
              </div>
              <div className="h-1.5 flex-1 rounded bg-midnight/10" />
            </div>
            <div className="mt-2 h-1.5 w-full rounded bg-midnight/[0.06]" />
          </div>
        ))}
      </div>
    );
  }
  if (type === "analytics") {
    return (
      <div className="rounded-xl border border-border bg-white p-3">
        <div className="mb-2 flex items-end gap-1 h-14">
          {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-t bg-gradient-to-t from-primary/70 to-primary/30"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
        <div className="h-1.5 w-1/3 rounded bg-midnight/10" />
      </div>
    );
  }
  return (
    <div className="rounded-xl border border-border bg-white p-3">
      <div className="mb-2 h-2 w-1/2 rounded bg-midnight/10" />
      <div className="space-y-1.5 rounded-lg border border-dashed border-border p-2">
        <div className="h-1.5 w-full rounded bg-midnight/[0.06]" />
        <div className="h-1.5 w-5/6 rounded bg-midnight/[0.06]" />
        <div className="h-1.5 w-4/6 rounded bg-midnight/[0.06]" />
      </div>
      <div className="mt-2 inline-block rounded-md bg-primary/10 px-2 py-0.5 text-[9px] font-medium text-primary">
        Publish
      </div>
    </div>
  );
}

export function SolutionSection() {
  return (
    <Section className="bg-white/50">
      <FadeIn>
        <SectionEyebrow>The platform</SectionEyebrow>
        <SectionHeading>
          Everything you need to run healthcare commerce.
        </SectionHeading>
        <SectionLead>
          One connected system for your storefront, catalog, customers, and
          operations—without stitching together a dozen apps.
        </SectionLead>
      </FadeIn>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, i) => (
          <FadeIn key={feature.title} delay={0.05 * i}>
            <Card className="h-full overflow-hidden border-border/80 bg-white/90">
              <CardContent className="p-6">
                <div className="mb-5 max-h-[140px] overflow-hidden">
                  <FeatureVisual type={feature.visual} />
                </div>
                <h3 className="text-lg font-semibold tracking-tight text-midnight">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}
