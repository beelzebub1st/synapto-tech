"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { demos } from "@/content/demos";

export default function DemosGalleryPage() {
  const reduce = useReducedMotion();

  return (
    <div className="relative min-h-[100dvh] overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 10% -10%, rgba(15,118,110,0.35), transparent 55%), radial-gradient(ellipse 60% 40% at 90% 10%, rgba(12,74,110,0.3), transparent 50%), linear-gradient(180deg, #071216 0%, #0c1a1f 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.28) 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />

      <header className="relative z-10 flex items-center justify-between px-4 py-4 sm:px-8">
        <Logo variant="dark" />
        <div className="flex items-center gap-2">
          <Button
            asChild
            variant="outline"
            size="sm"
            className="hidden border-white/20 bg-transparent text-white hover:bg-white/10 sm:inline-flex"
          >
            <Link href="/">Back to site</Link>
          </Button>
          <Button asChild size="sm">
            <Link href="/book-a-demo">Book a call</Link>
          </Button>
        </div>
      </header>

      <main className="relative z-10 px-4 pb-16 pt-8 sm:px-8 sm:pt-12">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-4xl text-center"
        >
          <p className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            Full-screen product demos
          </p>
          <h1 className="mt-4 font-display text-[clamp(2.5rem,7vw,4.75rem)] font-semibold leading-[0.95] tracking-tight text-white">
            Click the product. Don’t imagine it.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg">
            Immersive demos of the clinic website, installable PWA, mobile app,
            system dashboard, automations, and AI agents — built the way Synapto
            ships.
          </p>
        </motion.div>

        <div className="mx-auto mt-12 grid max-w-6xl gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {demos.map((demo, index) => (
            <motion.div
              key={demo.id}
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.45,
                delay: 0.05 * index,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Link
                href={demo.href}
                className="group relative flex h-full min-h-[280px] flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6 transition hover:border-primary/40 hover:bg-white/[0.07] sm:p-7"
              >
                <div
                  className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-60 blur-3xl transition group-hover:opacity-90"
                  style={{ background: demo.glow }}
                />
                <div className="relative flex items-start justify-between gap-3">
                  <span className="rounded-full border border-white/15 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-white/55">
                    {demo.category}
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-white/40 transition group-hover:text-primary" />
                </div>
                <div className="relative mt-auto pt-10">
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-primary">
                    {demo.device === "phone" ? "Phone experience" : "Desktop experience"}
                  </p>
                  <h2 className="mt-2 font-display text-3xl font-semibold text-white">
                    {demo.name}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">
                    {demo.tagline}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-x-3 gap-y-1">
                    {demo.highlights.map((item) => (
                      <span key={item} className="text-xs text-white/45">
                        {item}
                      </span>
                    ))}
                  </div>
                  <p className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                    Enter fullscreen
                    <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
