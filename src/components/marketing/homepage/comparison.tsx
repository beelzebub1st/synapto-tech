import Link from "next/link";
import { ArrowRight, Check, Minus, X } from "lucide-react";
import { FadeIn } from "@/components/marketing/fade-in";
import {
  Section,
  SectionHeading,
  SectionLead,
} from "@/components/marketing/section";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Cell = "yes" | "partial" | "no";

const rows: { label: string; agency: Cell; diy: Cell; synapto: Cell }[] = [
  {
    label: "High-converting clinic website",
    agency: "partial",
    diy: "partial",
    synapto: "yes",
  },
  {
    label: "Apps & installable PWAs",
    agency: "partial",
    diy: "no",
    synapto: "yes",
  },
  {
    label: "AI agents for intake & follow-ups",
    agency: "no",
    diy: "no",
    synapto: "yes",
  },
  {
    label: "Connected clinic operating system",
    agency: "no",
    diy: "partial",
    synapto: "yes",
  },
  {
    label: "One accountable partner after launch",
    agency: "partial",
    diy: "no",
    synapto: "yes",
  },
  {
    label: "Built for clinical trust & conversion",
    agency: "partial",
    diy: "no",
    synapto: "yes",
  },
];

function CellMark({ value, emphasize = false }: { value: Cell; emphasize?: boolean }) {
  if (value === "yes") {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1.5 text-sm font-medium",
          emphasize ? "text-primary" : "text-emerald-700"
        )}
      >
        <Check className="h-4 w-4" />
        Included
      </span>
    );
  }
  if (value === "partial") {
    return (
      <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
        <Minus className="h-4 w-4" />
        Partial
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
      <X className="h-4 w-4" />
      Missing
    </span>
  );
}

export function ComparisonSection() {
  return (
    <Section className="bg-white">
      <div className="mx-auto max-w-3xl text-center">
        <FadeIn>
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-primary">
            Why clinics switch
          </p>
          <SectionHeading className="mx-auto">
            Agencies design. Builders template. Synapto converts and operates.
          </SectionHeading>
          <SectionLead className="mx-auto">
            If you need a brochure site, hire a freelancer. If you need a system
            that wins patients and runs the clinic, you need a different partner.
          </SectionLead>
        </FadeIn>
      </div>

      <FadeIn delay={0.08}>
        <div className="mt-10 overflow-x-auto border border-border/90 bg-white">
          <table className="w-full min-w-[720px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-off-white/80">
                <th className="p-4 font-medium text-muted-foreground" scope="col">
                  Capability
                </th>
                <th className="p-4 font-semibold text-midnight" scope="col">
                  Traditional agency
                </th>
                <th className="p-4 font-semibold text-midnight" scope="col">
                  DIY builders
                </th>
                <th
                  className="bg-primary/[0.06] p-4 font-semibold text-midnight"
                  scope="col"
                >
                  Synapto Tech
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={row.label}
                  className={cn(
                    "border-b border-border/70 last:border-0",
                    i % 2 === 1 && "bg-off-white/40"
                  )}
                >
                  <td className="p-4 font-medium text-midnight">{row.label}</td>
                  <td className="p-4">
                    <CellMark value={row.agency} />
                  </td>
                  <td className="p-4">
                    <CellMark value={row.diy} />
                  </td>
                  <td className="bg-primary/[0.04] p-4">
                    <CellMark value={row.synapto} emphasize />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </FadeIn>

      <FadeIn delay={0.12}>
        <div className="mt-8 flex justify-center">
          <Button asChild size="lg" className="touch-manipulation">
            <Link href="/book-a-demo">
              Switch to one accountable partner
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </FadeIn>
    </Section>
  );
}
