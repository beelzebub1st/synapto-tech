"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { B2bSiteDemo } from "./website-templates/b2b-site";
import { CommerceSiteDemo } from "./website-templates/commerce-site";
import { LocalSiteDemo } from "./website-templates/local-site";
import { ServicesSiteDemo } from "./website-templates/services-site";

type UseCaseId = "b2b" | "commerce" | "services" | "local";

const useCases: { id: UseCaseId; label: string; hint: string }[] = [
  { id: "b2b", label: "B2B / SaaS", hint: "RFQ · specs · dense proof" },
  { id: "commerce", label: "E-commerce", hint: "Products · cart · PDP" },
  { id: "services", label: "Services", hint: "Packages · case work" },
  { id: "local", label: "Local business", hint: "Offers · booking · hours" },
];

export function WebsiteDemo() {
  const reduce = useReducedMotion();
  const [useCase, setUseCase] = useState<UseCaseId>("commerce");

  return (
    <div className="flex h-[calc(100dvh-3.5rem)] flex-col bg-[#071216]">
      <div className="shrink-0 border-b border-white/10 bg-[#0c1a1f] px-3 py-2.5 sm:px-4">
        <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.16em] text-white/45">
          Full-page template
        </p>
        <div className="flex gap-2 overflow-x-auto pb-0.5">
          {useCases.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setUseCase(item.id)}
              className={cn(
                "shrink-0 rounded-full px-3 py-1.5 text-left transition",
                useCase === item.id
                  ? "bg-primary text-white"
                  : "bg-white/10 text-white/70 hover:bg-white/15"
              )}
            >
              <span className="block text-xs font-medium">{item.label}</span>
              <span
                className={cn(
                  "mt-0.5 block text-[10px]",
                  useCase === item.id ? "text-white/80" : "text-white/40"
                )}
              >
                {item.hint}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-[1400px] flex-1 flex-col overflow-hidden border-x border-white/5">
        <AnimatePresence mode="wait">
          <motion.div
            key={useCase}
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="h-full min-h-0"
          >
            {useCase === "b2b" ? <B2bSiteDemo /> : null}
            {useCase === "commerce" ? <CommerceSiteDemo /> : null}
            {useCase === "services" ? <ServicesSiteDemo /> : null}
            {useCase === "local" ? <LocalSiteDemo /> : null}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
