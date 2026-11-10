import { FadeIn } from "@/components/marketing/fade-in";
import {
  Section,
  SectionEyebrow,
  SectionHeading,
  SectionLead,
} from "@/components/marketing/section";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const storefronts = [
  {
    name: "Modern Medical Clinic",
    tag: "Clinical clarity",
    theme: "light",
    accent: "from-[#e8ecef] to-white",
    nav: ["Shop", "Services", "About"],
  },
  {
    name: "Premium Wellness Brand",
    tag: "Warm & refined",
    theme: "sage",
    accent: "from-sage/40 to-[#f5f7f4]",
    nav: ["Collections", "Rituals", "Journal"],
  },
  {
    name: "Longevity and Performance Clinic",
    tag: "Performance-led",
    theme: "dark",
    accent: "from-charcoal to-midnight",
    nav: ["Programs", "Labs", "Book"],
  },
] as const;

function StorefrontFrame({
  name,
  tag,
  theme,
  accent,
  nav,
}: (typeof storefronts)[number]) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border/80 bg-white shadow-[0_12px_40px_rgba(16,24,32,0.08)]">
      <div className="flex items-center gap-2 border-b border-border bg-[#f3f4f2] px-3 py-2">
        <div className="flex gap-1">
          <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
          <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
          <span className="h-2 w-2 rounded-full bg-[#28c840]" />
        </div>
        <div className="mx-auto truncate text-[10px] text-muted-foreground">
          {name.toLowerCase().replace(/\s+/g, "")}.com
        </div>
      </div>

      <div
        className={cn(
          "bg-gradient-to-b p-4",
          accent,
          theme === "dark" && "text-white"
        )}
      >
        <div className="mb-4 flex items-center justify-between gap-2">
          <div
            className={cn(
              "h-2 w-16 rounded-full",
              theme === "dark" ? "bg-white/30" : "bg-midnight/15"
            )}
          />
          <div className="hidden gap-3 sm:flex">
            {nav.map((item) => (
              <span
                key={item}
                className={cn(
                  "text-[9px] font-medium",
                  theme === "dark" ? "text-white/70" : "text-muted-foreground"
                )}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
        <div
          className={cn(
            "rounded-xl p-4",
            theme === "dark"
              ? "bg-white/5 ring-1 ring-white/10"
              : "bg-white/80 ring-1 ring-border/50"
          )}
        >
          <div
            className={cn(
              "h-2 w-2/3 max-w-[140px] rounded",
              theme === "dark" ? "bg-white/40" : "bg-midnight/20"
            )}
          />
          <div
            className={cn(
              "mt-2 h-1.5 w-full rounded",
              theme === "dark" ? "bg-white/15" : "bg-midnight/[0.06]"
            )}
          />
          <div className="mt-4 grid grid-cols-2 gap-2">
            {[1, 2].map((n) => (
              <div
                key={n}
                className={cn(
                  "aspect-[4/3] rounded-lg",
                  theme === "dark"
                    ? "bg-white/10"
                    : theme === "sage"
                      ? "bg-sage/20"
                      : "bg-secondary"
                )}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-border px-4 py-3">
        <p className="text-sm font-semibold text-midnight">{name}</p>
        <p className="text-xs text-muted-foreground">{tag}</p>
        <Badge variant="outline" className="mt-2 text-[10px]">
          Example layout
        </Badge>
      </div>
    </div>
  );
}

export function StorefrontsSection() {
  return (
    <Section className="bg-white/40">
      <FadeIn>
        <SectionEyebrow>Storefront design</SectionEyebrow>
        <SectionHeading>
          Your brand deserves its own digital storefront.
        </SectionHeading>
        <SectionLead>
          Flexible layouts and brand controls so each practice can look
          distinct—without custom code for every change.
        </SectionLead>
      </FadeIn>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {storefronts.map((store, i) => (
          <FadeIn key={store.name} delay={0.08 * i}>
            <StorefrontFrame {...store} />
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}
