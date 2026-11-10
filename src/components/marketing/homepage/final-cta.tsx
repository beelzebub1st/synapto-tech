import Link from "next/link";
import { ArrowRight, CalendarClock, MessageSquareText } from "lucide-react";
import { FadeIn } from "@/components/marketing/fade-in";
import { Button } from "@/components/ui/button";

export function FinalCtaSection() {
  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <div className="pointer-events-none absolute inset-0 dark-mesh" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 opacity-35"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.08) 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
        aria-hidden
      />
      <div className="container-page relative">
        <FadeIn>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
              Book the call
            </p>
            <h2 className="mt-4 font-display text-balance text-3xl font-semibold tracking-tight text-white md:text-[3.15rem] md:leading-[1.08]">
              Let’s build the websites, commerce, and systems your business has been assembling by hand.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/70">
              Tell us how you win customers today. We will map the website,
              commerce, apps, AI agents, and operations stack that converts—and
              the fastest first win.
            </p>
            <div className="mt-8 flex w-full flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
              <Button
                asChild
                size="lg"
                className="h-12 w-full px-8 shadow-[0_10px_30px_rgba(15,118,110,0.4)] touch-manipulation sm:w-auto"
              >
                <Link href="/book-a-demo">
                  Book a strategy call
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 w-full border-white/20 bg-transparent text-white touch-manipulation hover:bg-white/10 sm:w-auto"
              >
                <Link href="/start">Take the package quiz</Link>
              </Button>
            </div>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 text-sm text-white/55 sm:flex-row sm:gap-8">
              <p className="inline-flex items-center gap-2">
                <CalendarClock className="h-4 w-4 text-primary" />
                30 minutes · clear next steps
              </p>
              <p className="inline-flex items-center gap-2">
                <MessageSquareText className="h-4 w-4 text-primary" />
                No hard pitch · scoped recommendations
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
