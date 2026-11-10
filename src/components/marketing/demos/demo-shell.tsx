"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { demos, getAdjacentDemos, type DemoId } from "@/content/demos";
import { cn } from "@/lib/utils";

export function DemoShell({
  demoId,
  children,
  className,
}: {
  demoId: DemoId;
  children: React.ReactNode;
  className?: string;
}) {
  const demo = demos.find((item) => item.id === demoId)!;
  const { prev, next } = getAdjacentDemos(demoId);

  return (
    <div className={cn("relative flex min-h-[100dvh] flex-col bg-ink", className)}>
      <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/90 backdrop-blur-xl">
        <div className="flex h-14 items-center gap-3 px-3 sm:px-5">
          <Link
            href="/demos"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/80 transition hover:bg-white/10 hover:text-white"
            aria-label="Close demo"
          >
            <X className="h-4 w-4" />
          </Link>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[11px] font-medium uppercase tracking-[0.16em] text-primary">
              Live demo · {demo.category}
            </p>
            <p className="truncate text-sm font-semibold text-white">
              {demo.name}
            </p>
          </div>
          <div className="hidden items-center gap-1 sm:flex">
            {prev ? (
              <Link
                href={prev.href}
                className="inline-flex h-10 items-center gap-1.5 rounded-full px-3 text-sm text-white/65 transition hover:bg-white/10 hover:text-white"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                {prev.shortName}
              </Link>
            ) : null}
            {next ? (
              <Link
                href={next.href}
                className="inline-flex h-10 items-center gap-1.5 rounded-full px-3 text-sm text-white/65 transition hover:bg-white/10 hover:text-white"
              >
                {next.shortName}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            ) : null}
          </div>
          <Button asChild size="sm" className="shrink-0 touch-manipulation">
            <Link href={`/book-a-demo?demo=${demo.id}`}>Book this</Link>
          </Button>
        </div>
      </header>
      <div className="relative flex-1">{children}</div>
      <nav className="sticky bottom-0 z-50 border-t border-white/10 bg-ink/95 backdrop-blur-xl sm:hidden">
        <div className="flex h-14 items-center justify-between px-3">
          {prev ? (
            <Link
              href={prev.href}
              className="inline-flex items-center gap-1 text-sm text-white/70"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              {prev.shortName}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={next.href}
              className="inline-flex items-center gap-1 text-sm text-white/70"
            >
              {next.shortName}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          ) : (
            <span />
          )}
        </div>
      </nav>
    </div>
  );
}
