"use client";

import { useState } from "react";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardTopbar } from "@/components/dashboard/topbar";
import { SampleBanner } from "@/components/dashboard/sample-banner";

export function DashboardShell({
  authConfigured,
  databaseConnected,
  children,
}: {
  authConfigured: boolean;
  databaseConnected: boolean;
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />
      <div className="flex min-w-0 flex-1 flex-col lg:pl-0">
        <DashboardTopbar
          authConfigured={authConfigured}
          onMenuOpen={() => setMobileOpen(true)}
        />
        <main className="flex-1 space-y-6 p-4 lg:p-6">
          {databaseConnected ? null : <SampleBanner />}
          {children}
        </main>
      </div>
    </div>
  );
}
