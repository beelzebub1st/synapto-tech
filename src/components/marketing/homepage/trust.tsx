import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { FadeIn } from "@/components/marketing/fade-in";
import {
  Section,
  SectionEyebrow,
  SectionHeading,
} from "@/components/marketing/section";
import { industries } from "@/content/brand";

export function TrustSection() {
  return (
    <Section className="border-y border-border/70 bg-white/70 !py-10 md:!py-12">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <FadeIn>
          <SectionEyebrow>Built for healthcare businesses</SectionEyebrow>
          <SectionHeading className="text-2xl sm:text-3xl md:text-3xl">
            Full solutions for the providers who need them most.
          </SectionHeading>
        </FadeIn>
        <FadeIn delay={0.06}>
          <Link
            href="/solutions"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary"
          >
            View all industries
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </FadeIn>
      </div>
      <FadeIn delay={0.08}>
        <div className="-mx-4 mt-7 overflow-x-auto px-4 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:mx-0 sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden">
          <div className="flex min-w-max gap-3 sm:grid sm:min-w-0 sm:grid-cols-3 lg:grid-cols-6">
            {industries.map((industry) => (
              <Link
                key={industry.slug}
                href={`/solutions/${industry.slug}`}
                className="group w-[10.5rem] shrink-0 rounded-2xl border border-border/80 bg-white px-4 py-4 shadow-[0_1px_2px_rgba(16,24,32,0.03)] transition hover:border-primary/30 hover:shadow-[0_8px_24px_rgba(16,24,32,0.06)] sm:w-auto"
              >
                <p className="text-sm font-semibold leading-snug text-midnight group-hover:text-primary">
                  {industry.name}
                </p>
                <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                  {industry.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </FadeIn>
    </Section>
  );
}
