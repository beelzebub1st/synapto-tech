"use client";

import { motion, useReducedMotion } from "framer-motion";
import { proofStrip } from "@/content/conversion";

export function ProofStrip() {
  const reduce = useReducedMotion();
  const loop = [...proofStrip, ...proofStrip];

  return (
    <section className="border-b border-border/80 bg-white py-5 overflow-hidden">
      <div className="container-page mb-3">
        <p className="text-center text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Built for every surface that needs to convert
        </p>
      </div>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent" />
        <motion.div
          className="flex w-max gap-10 px-6"
          animate={reduce ? undefined : { x: ["0%", "-50%"] }}
          transition={
            reduce
              ? undefined
              : { duration: 28, repeat: Infinity, ease: "linear" }
          }
        >
          {loop.map((item, index) => (
            <span
              key={`${item}-${index}`}
              className="whitespace-nowrap font-display text-lg font-semibold tracking-tight text-midnight/55"
            >
              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
