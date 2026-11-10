import { FadeIn } from "@/components/marketing/fade-in";
import { Section } from "@/components/marketing/section";
import { outcomes } from "@/content/brand";

export function OutcomesSection() {
  return (
    <Section className="!py-12 md:!py-16">
      <FadeIn>
        <div className="grid gap-8 border-y border-border/80 py-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6 lg:py-12">
          {outcomes.map((item, index) => (
            <div key={item.title}>
              <p className="font-mono text-[11px] font-medium tracking-[0.14em] text-primary">
                0{index + 1}
              </p>
              <h3 className="mt-3 font-display text-xl font-semibold tracking-tight text-midnight">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </FadeIn>
    </Section>
  );
}
