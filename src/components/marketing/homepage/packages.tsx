import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { FadeIn } from "@/components/marketing/fade-in";
import {
  Section,
  SectionHeading,
  SectionLead,
} from "@/components/marketing/section";
import { Button } from "@/components/ui/button";
import { packages } from "@/content/conversion";
import { cn } from "@/lib/utils";

export function PackagesSection() {
  return (
    <Section id="packages" className="bg-white">
      <div className="mx-auto max-w-3xl text-center">
        <FadeIn>
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-primary">
            Choose your starting point
          </p>
          <SectionHeading className="mx-auto">
            Clear paths. Real outcomes. No mystery scope.
          </SectionHeading>
          <SectionLead className="mx-auto">
            Start where you are. Expand when the clinic is ready. Every path is
            designed so the next layer plugs in cleanly.
          </SectionLead>
        </FadeIn>
      </div>

      <div className="mt-12 grid gap-5 lg:grid-cols-3">
        {packages.map((item, index) => (
          <FadeIn key={item.name} delay={0.05 * index}>
            <article
              className={cn(
                "flex h-full flex-col border p-6 sm:p-7",
                item.highlight
                  ? "border-primary bg-midnight text-white shadow-[0_24px_60px_rgba(12,26,31,0.18)]"
                  : "border-border/90 bg-off-white/40"
              )}
            >
              {item.highlight ? (
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-primary">
                  Most chosen
                </p>
              ) : (
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-primary">
                  Path 0{index + 1}
                </p>
              )}
              <h3
                className={cn(
                  "mt-3 font-display text-3xl font-semibold tracking-tight",
                  item.highlight ? "text-white" : "text-midnight"
                )}
              >
                {item.name}
              </h3>
              <p
                className={cn(
                  "mt-2 text-sm leading-relaxed",
                  item.highlight ? "text-white/70" : "text-muted-foreground"
                )}
              >
                {item.ideal}
              </p>
              <p
                className={cn(
                  "mt-5 text-sm font-medium",
                  item.highlight ? "text-white" : "text-midnight"
                )}
              >
                {item.priceLabel}
              </p>
              <ul className="mt-6 flex-1 space-y-3">
                {item.includes.map((line) => (
                  <li key={line} className="flex items-start gap-2.5 text-sm">
                    <Check
                      className={cn(
                        "mt-0.5 h-4 w-4 shrink-0",
                        item.highlight ? "text-primary" : "text-primary"
                      )}
                    />
                    <span
                      className={
                        item.highlight ? "text-white/85" : "text-midnight/85"
                      }
                    >
                      {line}
                    </span>
                  </li>
                ))}
              </ul>
              <Button
                asChild
                size="lg"
                className={cn(
                  "mt-8 w-full touch-manipulation",
                  item.highlight
                    ? "bg-primary text-white hover:bg-[#0d5f59]"
                    : undefined
                )}
                variant={item.highlight ? "default" : "dark"}
              >
                <Link href={item.href}>
                  {item.cta}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </article>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}
