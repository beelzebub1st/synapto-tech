import { cn } from "@/lib/utils";
import { TrendingDown, TrendingUp } from "lucide-react";

export function KpiCard({
  label,
  value,
  change,
  positive = true,
  className,
}: {
  label: string;
  value: string;
  change?: string;
  positive?: boolean;
  className?: string;
}) {
  const Icon = positive ? TrendingUp : TrendingDown;

  return (
    <div
      className={cn(
        "rounded-2xl border border-border/80 bg-card p-5 shadow-[0_1px_2px_rgba(16,24,32,0.04)]",
        className
      )}
    >
      <p className="text-sm font-medium text-muted-foreground">{label}</p>
      <p className="mt-2 text-2xl font-semibold tracking-tight text-midnight">{value}</p>
      {change ? (
        <p
          className={cn(
            "mt-2 inline-flex items-center gap-1 text-xs font-medium",
            positive ? "text-emerald-700" : "text-red-600"
          )}
        >
          <Icon className="h-3.5 w-3.5" aria-hidden />
          {change}
          <span className="font-normal text-muted-foreground"> vs last period</span>
        </p>
      ) : null}
    </div>
  );
}
