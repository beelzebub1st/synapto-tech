import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

export function SampleBanner({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-2 rounded-xl border border-amber-200/80 bg-amber-50/90 px-4 py-2.5 text-sm text-amber-950",
        className
      )}
      role="status"
    >
      <Sparkles className="h-4 w-4 shrink-0 text-amber-600" aria-hidden />
      <span>
        You&apos;re viewing <strong>sample data</strong> — connect Neon and sign in to sync live
        store data.
      </span>
      <Badge variant="sample" className="ml-auto shrink-0">
        Demo mode
      </Badge>
    </div>
  );
}
