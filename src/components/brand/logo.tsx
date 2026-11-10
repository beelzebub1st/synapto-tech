import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  href = "/",
  variant = "light",
}: {
  className?: string;
  href?: string;
  variant?: "light" | "dark";
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-2.5 font-semibold tracking-tight",
        variant === "dark" ? "text-white" : "text-midnight",
        className
      )}
      aria-label="Synapto Tech home"
    >
      <span
        className={cn(
          "relative flex h-8 w-8 items-center justify-center rounded-xl",
          variant === "dark" ? "bg-white/10" : "bg-midnight"
        )}
      >
        <span className="absolute inset-[7px] rounded-md border border-primary/80" />
        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
      </span>
      <span className="text-[15px]">
        Synapto <span className="font-medium opacity-70">Tech</span>
      </span>
    </Link>
  );
}
