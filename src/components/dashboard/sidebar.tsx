"use client";

import { Suspense } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/brand/logo";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  Bot,
  CalendarDays,
  Globe,
  HelpCircle,
  LayoutDashboard,
  LayoutTemplate,
  Package,
  Phone,
  Plug,
  Settings,
  ShoppingCart,
  Store,
  Users,
  Workflow,
  X,
} from "lucide-react";

type NavItem = {
  href: string;
  label: string;
  icon: typeof LayoutDashboard;
  exact?: boolean;
};

const navItems: NavItem[] = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard, exact: true },
  { href: "/dashboard/sales", label: "Sales pipeline", icon: CalendarDays },
  { href: "/dashboard/agents", label: "Clinic Agents", icon: Bot },
  { href: "/dashboard/automation", label: "Automation", icon: Workflow },
  { href: "/dashboard/calls", label: "Call Agent", icon: Phone },
  { href: "/dashboard/store", label: "My Store", icon: Store },
  { href: "/dashboard/orders", label: "Orders", icon: ShoppingCart },
  { href: "/dashboard/products", label: "Products", icon: Package },
  { href: "/dashboard/customers", label: "Customers", icon: Users },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/dashboard/website", label: "Website Editor", icon: Globe },
  { href: "/dashboard/content", label: "Content", icon: LayoutTemplate },
  { href: "/dashboard/integrations", label: "Integrations", icon: Plug },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
  { href: "/dashboard/help", label: "Help Center", icon: HelpCircle },
];

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-1 flex-col gap-0.5 px-3 py-4">
      {navItems.map(({ href, label, icon: Icon, exact }) => {
        const active = exact
          ? pathname === href
          : pathname === href || pathname.startsWith(`${href}/`);
        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
              active
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
            )}
          >
            <Icon className="h-4 w-4 shrink-0" aria-hidden />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

export function DashboardSidebar({
  mobileOpen,
  onMobileClose,
}: {
  mobileOpen: boolean;
  onMobileClose: () => void;
}) {
  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-40 bg-midnight/40 backdrop-blur-sm lg:hidden",
          mobileOpen ? "block" : "hidden"
        )}
        onClick={onMobileClose}
        aria-hidden
      />
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-[min(100%,17.5rem)] flex-col border-r border-border/80 bg-off-white lg:static lg:z-auto lg:w-64 lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          "transition-transform duration-200 ease-out"
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-border/80 px-4">
          <Logo href="/dashboard" />
          <button
            type="button"
            className="rounded-lg p-2 text-muted-foreground hover:bg-secondary lg:hidden"
            onClick={onMobileClose}
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <Suspense fallback={<div className="flex-1 px-3 py-4" />}>
          <NavLinks onNavigate={onMobileClose} />
        </Suspense>
        <div className="mt-auto border-t border-border/80 p-4">
          <p className="text-xs text-muted-foreground">
            Synapto Tech · Clinic OS
          </p>
        </div>
      </aside>
    </>
  );
}

export function DashboardSidebarTrigger({
  onOpen,
}: {
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      className="inline-flex items-center justify-center rounded-xl border border-border bg-white p-2 text-midnight shadow-sm lg:hidden"
      onClick={onOpen}
      aria-label="Open menu"
    >
      <LayoutDashboard className="h-5 w-5" />
    </button>
  );
}
