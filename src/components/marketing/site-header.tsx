"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { navLinks } from "@/content/brand";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isHome = pathname === "/";
  const darkHero = isHome && !scrolled && !open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-all duration-300",
        darkHero
          ? "border-transparent bg-transparent"
          : scrolled || open
            ? "border-border/80 bg-off-white/95 backdrop-blur-xl shadow-[0_1px_0_rgba(16,24,32,0.04)]"
            : "border-transparent bg-off-white/80 backdrop-blur-md"
      )}
    >
      <div className="container-page flex h-14 items-center justify-between gap-3 sm:h-16 md:h-[4.25rem]">
        <Logo
          className="min-w-0 shrink"
          variant={darkHero ? "dark" : "light"}
        />

        <nav
          className="hidden items-center gap-0.5 lg:flex"
          aria-label="Primary"
        >
          {navLinks.map((link) =>
            "children" in link && link.children ? (
              <div key={link.label} className="group relative">
                <Link
                  href={link.href}
                  className={cn(
                    "inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                    darkHero
                      ? "text-white/70 hover:text-white"
                      : "text-muted-foreground hover:text-midnight"
                  )}
                >
                  {link.label}
                  <ChevronDown className="h-3.5 w-3.5 opacity-60" />
                </Link>
                <div className="invisible absolute left-0 top-full z-50 pt-2 opacity-0 transition-all group-hover:visible group-hover:opacity-100">
                  <div className="min-w-[180px] rounded-2xl border border-border bg-white p-2 shadow-lg">
                    {link.children.map((child) => (
                      <Link
                        key={child.href + child.label}
                        href={child.href}
                        className="block rounded-xl px-3 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-midnight"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                  darkHero
                    ? "text-white/70 hover:text-white"
                    : "text-muted-foreground hover:text-midnight"
                )}
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className={darkHero ? "text-white hover:bg-white/10 hover:text-white" : undefined}
          >
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild size="sm">
            <Link href="/book-a-demo">Book a strategy call</Link>
          </Button>
        </div>

        <button
          type="button"
          className={cn(
            "inline-flex h-11 w-11 items-center justify-center rounded-full border touch-manipulation lg:hidden",
            darkHero
              ? "border-white/20 bg-white/10 text-white"
              : "border-border bg-white text-midnight"
          )}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div
        className={cn(
          "fixed inset-x-0 bottom-0 z-40 overflow-y-auto overscroll-contain bg-off-white lg:hidden",
          "top-14 sm:top-16",
          open ? "block" : "hidden"
        )}
      >
        <div className="container-page flex min-h-full flex-col gap-2 pb-[max(2rem,env(safe-area-inset-bottom))] pt-4">
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {navLinks.map((link) => (
              <div key={link.href + link.label}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-2xl px-4 py-3.5 text-base font-medium text-midnight active:bg-secondary"
                >
                  {link.label}
                </Link>
                {"children" in link && link.children ? (
                  <div className="mb-2 ml-3 space-y-1 border-l border-border pl-3">
                    {link.children.map((child) => (
                      <Link
                        key={child.href + child.label}
                        href={child.href}
                        onClick={() => setOpen(false)}
                        className="block rounded-xl px-3 py-2.5 text-sm text-muted-foreground active:bg-secondary"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </nav>
          <div className="mt-auto flex flex-col gap-3 border-t border-border pt-6">
            <Button asChild variant="outline" size="lg" className="w-full">
              <Link href="/login" onClick={() => setOpen(false)}>
                Login
              </Link>
            </Button>
            <Button asChild size="lg" className="w-full">
              <Link href="/book-a-demo" onClick={() => setOpen(false)}>
                Book a strategy call
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
