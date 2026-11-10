import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/marketing/fade-in";
import { Button } from "@/components/ui/button";
import { midCta } from "@/content/conversion";

export function MidCtaSection() {
  return (
    <section className="relative overflow-hidden py-14 md:py-16">
      <div className="absolute inset-0 bg-midnight" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(ellipse 70% 80% at 85% 20%, rgba(15,118,110,0.35), transparent 55%)",
        }}
        aria-hidden
      />
      <div className="container-page relative">
        <FadeIn>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
                {midCta.eyebrow}
              </p>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-white md:text-4xl">
                {midCta.title}
              </h2>
              <p className="mt-3 max-w-xl text-base leading-relaxed text-white/65">
                {midCta.text}
              </p>
            </div>
            <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
              <Button asChild size="lg" className="w-full touch-manipulation sm:w-auto">
                <Link href="/start">
                  {midCta.primary}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-full border-white/20 bg-transparent text-white touch-manipulation hover:bg-white/10 sm:w-auto"
              >
                <Link href="/demos">{midCta.secondary}</Link>
              </Button>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
