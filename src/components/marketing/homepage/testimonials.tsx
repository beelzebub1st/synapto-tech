import { FadeIn } from "@/components/marketing/fade-in";
import {
  Section,
  SectionHeading,
  SectionLead,
} from "@/components/marketing/section";
import { testimonials } from "@/content/conversion";

export function TestimonialsSection() {
  return (
    <Section className="bg-white">
      <div className="mx-auto max-w-3xl text-center">
        <FadeIn>
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-primary">
            Client signal
          </p>
          <SectionHeading className="mx-auto">
            What clinics say when the stack finally works.
          </SectionHeading>
          <SectionLead className="mx-auto">
            Trust is earned in operations—not slogans. These are the outcomes
            teams care about after launch.
          </SectionLead>
        </FadeIn>
      </div>

      <div className="mt-12 grid gap-8 md:grid-cols-3">
        {testimonials.map((item, index) => (
          <FadeIn key={item.name} delay={0.05 * index}>
            <figure className="flex h-full flex-col border-t border-border/90 pt-6">
              <blockquote className="font-display text-xl font-medium leading-snug tracking-tight text-midnight">
                “{item.quote}”
              </blockquote>
              <figcaption className="mt-6 pt-4">
                <p className="text-sm font-semibold text-midnight">{item.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">{item.role}</p>
              </figcaption>
            </figure>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}
