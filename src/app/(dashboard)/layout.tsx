import { Suspense } from "react";
import { connection } from "next/server";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { hasAuthConfigured, hasDatabase } from "@/lib/env";

export const instant = false;

async function DashboardLayoutInner({
  children,
}: {
  children: React.ReactNode;
}) {
  await connection();

  return (
    <DashboardShell
      authConfigured={hasAuthConfigured()}
      databaseConnected={hasDatabase()}
    >
      {children}
    </DashboardShell>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-background text-sm text-muted-foreground">
          Loading clinic dashboard…
        </div>
      }
    >
      <DashboardLayoutInner>{children}</DashboardLayoutInner>
    </Suspense>
  );
}
