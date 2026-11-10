"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { FadeIn } from "@/components/marketing/fade-in";
import {
  Section,
  SectionHeading,
  SectionLead,
} from "@/components/marketing/section";
import { conversionFaq } from "@/content/conversion";
import { cn } from "@/lib/utils";

export function FaqConversionSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section id="faq" className="bg-off-white">
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <FadeIn>
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-primary">
            Objections, answered
          </p>
          <SectionHeading>Everything buyers ask before they book.</SectionHeading>
          <SectionLead>
            Clear answers reduce friction. If you need a custom answer for your
            business model, bring it to the strategy call.
          </SectionLead>
        </FadeIn>

        <FadeIn delay={0.06}>
          <div className="divide-y divide-border/90 border-y border-border/90">
            {conversionFaq.map((item, index) => {
              const isOpen = open === index;
              return (
                <div key={item.q}>
                  <button
                    type="button"
                    className="flex w-full items-start justify-between gap-4 py-5 text-left touch-manipulation"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : index)}
                  >
                    <span className="font-display text-lg font-semibold tracking-tight text-midnight">
                      {item.q}
                    </span>
                    <span className="mt-1 text-primary">
                      {isOpen ? (
                        <Minus className="h-5 w-5" />
                      ) : (
                        <Plus className="h-5 w-5" />
                      )}
                    </span>
                  </button>
                  <div
                    className={cn(
                      "overflow-hidden transition-all duration-300",
                      isOpen ? "max-h-72 pb-5 opacity-100" : "max-h-0 opacity-0"
                    )}
                  >
                    <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {item.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </FadeIn>
      </div>
    </Section>
  );
}
