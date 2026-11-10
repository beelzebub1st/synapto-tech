import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/marketing/fade-in";
import {
  Section,
  SectionHeading,
  SectionLead,
} from "@/components/marketing/section";
import { Button } from "@/components/ui/button";
import { capabilities } from "@/content/brand";

export function CapabilitiesSection() {
  return (
    <Section id="capabilities" className="bg-white">
      <div className="mx-auto max-w-3xl text-center">
        <FadeIn>
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-primary">
            What we build
          </p>
          <SectionHeading className="mx-auto">
            Websites. Apps. PWAs. Systems.
          </SectionHeading>
          <SectionLead className="mx-auto">
            One team ships the patient-facing product and the operating layer
            behind it—so your clinic is not stuck stitching vendors together.
          </SectionLead>
        </FadeIn>
      </div>

      <div className="mt-12 grid gap-x-10 gap-y-12 md:grid-cols-2">
        {capabilities.map((item, index) => (
          <FadeIn key={item.title} delay={0.05 * index}>
            <article className="border-t border-border/90 pt-6">
              <p className="font-mono text-[11px] font-medium tracking-[0.16em] text-primary">
                0{index + 1}
              </p>
              <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-midnight sm:text-[1.75rem]">
                {item.title}
              </h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
                {item.description}
              </p>
              <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
                {item.points.map((point) => (
                  <li
                    key={point}
                    className="text-sm font-medium text-midnight/80"
                  >
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          </FadeIn>
        ))}
      </div>

      <FadeIn delay={0.12}>
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border/80 pt-8 sm:flex-row sm:items-center">
          <p className="max-w-xl text-base font-medium text-midnight">
            Not sure where to start? We will recommend the highest-converting
            first release for your clinic model.
          </p>
          <Button asChild size="lg" className="touch-manipulation shrink-0">
            <Link href="/book-a-demo">
              Get my recommended path
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </FadeIn>
    </Section>
  );
}
