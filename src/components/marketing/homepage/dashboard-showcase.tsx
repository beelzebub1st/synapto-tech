import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DashboardPreview } from "@/components/marketing/dashboard-preview";
import { FadeIn } from "@/components/marketing/fade-in";
import {
  Section,
  SectionEyebrow,
  SectionHeading,
  SectionLead,
} from "@/components/marketing/section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const highlights = [
  "Orders, products, and customers in one workspace",
  "Website content you can update without a developer",
  "Analytics that stay honest—sample data labeled until you go live",
  "Payment integrations ready when your provider is approved",
] as const;

export function DashboardShowcase() {
  return (
    <Section className="overflow-hidden bg-white">
      <div className="grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
        <FadeIn>
          <SectionEyebrow>Platform</SectionEyebrow>
          <SectionHeading>One operating system for the clinic.</SectionHeading>
          <SectionLead>
            Manage website content, catalog, orders, agents, and performance from
            a single workspace—so the product and the business stay connected.
          </SectionLead>
          <ul className="mt-5 space-y-2.5">
            {highlights.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2.5 text-sm text-midnight/85"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Button asChild className="w-full touch-manipulation sm:w-auto">
              <Link href="/login">
                Open demo dashboard
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Badge variant="sample" className="w-fit">
              Sample data
            </Badge>
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <DashboardPreview compact className="w-full" />
        </FadeIn>
      </div>
    </Section>
  );
}
