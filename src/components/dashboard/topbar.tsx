"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { ChevronDown, LogOut, User } from "lucide-react";
import { DashboardSidebarTrigger } from "./sidebar";

export function DashboardTopbar({
  onMenuOpen,
  authConfigured,
}: {
  onMenuOpen: () => void;
  authConfigured: boolean;
}) {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const displayName =
    session?.user?.name ?? (authConfigured ? "Account" : "Demo user");
  const displayEmail =
    session?.user?.email ?? (authConfigured ? "" : "demo@synapto.tech");

  async function signOut() {
    if (authConfigured && session) {
      await authClient.signOut();
    }
    await fetch("/api/auth/demo", { method: "DELETE" }).catch(() => undefined);
    document.cookie = "synapto_demo_session=; path=/; max-age=0";
    router.push("/login");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-3 border-b border-border/80 bg-off-white/90 px-4 backdrop-blur-md lg:px-6">
      <DashboardSidebarTrigger onOpen={onMenuOpen} />
      <div className="flex flex-1 items-center gap-3">
        <Badge variant="sample" className="hidden sm:inline-flex">
          Sample data
        </Badge>
        <span className="hidden text-sm text-muted-foreground md:inline">
          Meridian Wellness · Demo storefront
        </span>
      </div>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <Button variant="outline" size="sm" className="gap-2 rounded-xl">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <User className="h-4 w-4" />
            </span>
            <span className="hidden max-w-[8rem] truncate sm:inline">{displayName}</span>
            <ChevronDown className="h-4 w-4 opacity-60" />
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className="z-50 min-w-[12rem] rounded-xl border border-border bg-card p-1 shadow-lg"
            align="end"
            sideOffset={8}
          >
            <div className="border-b border-border px-3 py-2">
              <p className="text-sm font-medium text-midnight">{displayName}</p>
              {displayEmail ? (
                <p className="truncate text-xs text-muted-foreground">{displayEmail}</p>
              ) : null}
            </div>
            <DropdownMenu.Item asChild>
              <Link
                href="/dashboard/settings"
                className="flex cursor-pointer select-none items-center rounded-lg px-3 py-2 text-sm outline-none hover:bg-secondary"
              >
                Settings
              </Link>
            </DropdownMenu.Item>
            <DropdownMenu.Item
              className="flex cursor-pointer select-none items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 outline-none hover:bg-red-50"
              onSelect={() => void signOut()}
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </header>
  );
}
