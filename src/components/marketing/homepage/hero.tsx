"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { heroCopy } from "@/content/brand";
import { cn } from "@/lib/utils";

export function HeroSection({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <section
      className={cn(
        "relative isolate min-h-[100svh] overflow-hidden text-white",
        className
      )}
    >
      <div className="absolute inset-0 hero-plane" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.22]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.35) 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
        aria-hidden
      />

      <HeroProductPlane reduce={Boolean(reduce)} />

      <div className="container-page relative flex min-h-[100svh] flex-col justify-end pb-14 pt-28 sm:pb-16 md:justify-center md:pb-20 md:pt-24">
        <div className="max-w-3xl">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-[clamp(2.75rem,8vw,5.75rem)] font-semibold leading-[0.92] tracking-[-0.03em] text-white"
          >
            {heroCopy.brandSignal}
          </motion.p>

          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-2xl text-balance text-[clamp(1.35rem,3.2vw,2rem)] font-medium leading-snug tracking-tight text-white/90"
          >
            {heroCopy.headline}
          </motion.h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg"
          >
            {heroCopy.support}
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 space-y-4"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                asChild
                size="lg"
                className="h-12 w-full bg-primary px-8 text-[0.95rem] shadow-[0_12px_32px_rgba(15,118,110,0.45)] touch-manipulation hover:bg-[#0d5f59] sm:w-auto"
              >
                <Link href="/book-a-demo">
                  {heroCopy.primaryCta}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-12 w-full border-white/25 bg-transparent text-white touch-manipulation hover:bg-white/10 sm:w-auto"
              >
                <Link href="/demos">{heroCopy.secondaryCta}</Link>
              </Button>
            </div>
            <p className="text-sm text-white/50">
              Live booking · clickable demos · 2-min package quiz
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function HeroProductPlane({ reduce }: { reduce: boolean }) {
  return (
    <motion.div
      className="pointer-events-none absolute inset-y-0 right-[-8%] hidden w-[62%] lg:block"
      aria-hidden
      initial={reduce ? false : { opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="absolute inset-[8%_6%_12%_18%] rounded-[2rem] border border-white/10 bg-white/[0.06] shadow-[0_40px_120px_rgba(0,0,0,0.35)] backdrop-blur-[2px]"
        animate={
          reduce
            ? undefined
            : { y: [0, -10, 0], rotate: [0, 0.4, 0] }
        }
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="absolute inset-x-0 top-0 h-12 border-b border-white/10 bg-white/[0.04]" />
        <div className="absolute left-0 top-12 bottom-0 w-24 border-r border-white/10 bg-white/[0.03]" />
        <div className="absolute left-32 right-8 top-20 grid gap-4">
          <div className="h-24 rounded-2xl bg-gradient-to-br from-primary/35 to-white/5" />
          <div className="grid grid-cols-3 gap-3">
            <div className="h-28 rounded-2xl bg-white/8" />
            <div className="h-28 rounded-2xl bg-white/8" />
            <div className="h-28 rounded-2xl bg-primary/20" />
          </div>
          <div className="h-40 rounded-2xl border border-white/10 bg-ink/40 p-4">
            <div className="h-2 w-24 rounded-full bg-white/25" />
            <div className="mt-4 space-y-2">
              <div className="h-2 w-full rounded-full bg-white/10" />
              <div className="h-2 w-5/6 rounded-full bg-white/10" />
              <div className="h-2 w-2/3 rounded-full bg-white/10" />
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-[16%] left-[8%] w-[42%] rounded-[1.5rem] border border-white/15 bg-[#0f1f24]/85 p-4 shadow-[0_24px_60px_rgba(0,0,0,0.35)]"
        animate={reduce ? undefined : { y: [0, 12, 0] }}
        transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="mb-3 flex items-center justify-between">
          <div className="h-2 w-16 rounded-full bg-primary/70" />
          <div className="h-2 w-8 rounded-full bg-white/20" />
        </div>
        <div className="space-y-2">
          <div className="h-16 rounded-xl bg-gradient-to-br from-sage/30 to-primary/20" />
          <div className="h-2 w-3/4 rounded-full bg-white/15" />
          <div className="h-2 w-1/2 rounded-full bg-white/10" />
        </div>
        <p className="mt-3 text-[10px] uppercase tracking-[0.18em] text-white/45">
          PWA · App shell
        </p>
      </motion.div>
    </motion.div>
  );
}
