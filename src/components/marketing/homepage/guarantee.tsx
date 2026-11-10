import { FadeIn } from "@/components/marketing/fade-in";
import { Section } from "@/components/marketing/section";
import { guarantee } from "@/content/conversion";
import { ShieldCheck } from "lucide-react";

export function GuaranteeSection() {
  return (
    <Section className="bg-white !py-12 md:!py-14">
      <FadeIn>
        <div className="grid gap-8 border border-border/90 bg-off-white/50 px-6 py-8 md:grid-cols-[1.1fr_1fr] md:items-center md:gap-12 md:px-10 md:py-10">
          <div>
            <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-midnight text-primary">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-midnight md:text-[2.1rem]">
              {guarantee.title}
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">
              High-converting partners reduce risk. You always know what we are
              building, when you will see it, and what you own.
            </p>
          </div>
          <ul className="space-y-4">
            {guarantee.points.map((point) => (
              <li
                key={point}
                className="flex items-start gap-3 border-t border-border/80 pt-4 text-sm font-medium text-midnight first:border-t-0 first:pt-0"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </FadeIn>
    </Section>
  );
}
