"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Bell,
  Search,
  TrendingUp,
  Package,
  Users,
  ShoppingCart,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { sampleKpis, sampleOrders, sampleRevenue } from "@/content/sample-data";
import { cn } from "@/lib/utils";

function MiniChart() {
  const max = Math.max(...sampleRevenue.map((d) => d.revenue));
  return (
    <div className="flex h-20 items-end gap-1 sm:h-28 sm:gap-1.5">
      {sampleRevenue.map((d, i) => (
        <motion.div
          key={d.month}
          className="flex-1 rounded-t-md bg-gradient-to-t from-primary/80 to-primary/40"
          initial={{ height: 8 }}
          animate={{ height: `${Math.max(12, (d.revenue / max) * 100)}%` }}
          transition={{ duration: 0.6, delay: 0.2 + i * 0.05, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

export function DashboardPreview({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  const reduce = useReducedMotion();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <motion.div
      className={cn("relative", className)}
      initial={reduce ? false : { opacity: 0, y: 24, scale: 0.98 }}
      animate={
        reduce || ready
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 24, scale: 0.98 }
      }
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {!compact && (
        <>
          <motion.div
            className="absolute -left-4 top-14 z-10 hidden w-40 rounded-2xl border border-border bg-white p-3 shadow-xl md:block lg:-left-6 lg:w-44"
            animate={reduce ? undefined : { y: [0, -6, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <TrendingUp className="h-3.5 w-3.5 text-primary" />
              Revenue today
            </div>
            <p className="mt-1 text-lg font-semibold tracking-tight">$2,840</p>
            <Badge variant="sample" className="mt-2">
              Sample data
            </Badge>
          </motion.div>
          <motion.div
            className="absolute -right-3 bottom-20 z-10 hidden w-44 rounded-2xl border border-border bg-white p-3 shadow-xl lg:-right-4 lg:bottom-24 lg:block lg:w-48"
            animate={reduce ? undefined : { y: [0, 8, 0] }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          >
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <ShoppingCart className="h-3.5 w-3.5 text-sage" />
              New order
            </div>
            <p className="mt-1 text-sm font-medium">ORD-10482 · $186</p>
            <p className="text-xs text-muted-foreground">Elena M. · just now</p>
          </motion.div>
        </>
      )}

      <div className="overflow-hidden rounded-xl border border-border/80 bg-white shadow-[0_16px_40px_rgba(16,24,32,0.10)] sm:rounded-2xl sm:shadow-[0_20px_60px_rgba(16,24,32,0.12)]">
        <div className="flex items-center gap-2 border-b border-border bg-[#f3f4f2] px-3 py-2.5 sm:px-4 sm:py-3">
          <div className="flex gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[#ff5f57] sm:h-2.5 sm:w-2.5" />
            <span className="h-2 w-2 rounded-full bg-[#febc2e] sm:h-2.5 sm:w-2.5" />
            <span className="h-2 w-2 rounded-full bg-[#28c840] sm:h-2.5 sm:w-2.5" />
          </div>
          <div className="mx-auto flex h-6 w-full max-w-sm items-center justify-center truncate rounded-md bg-white/80 px-2 text-[10px] text-muted-foreground sm:h-7 sm:text-[11px]">
            app.synaptotech.com/dashboard
          </div>
        </div>

        <div className="grid md:grid-cols-[180px_1fr] lg:grid-cols-[200px_1fr]">
          <aside className="hidden border-r border-border bg-[#fbfcfb] p-4 md:block">
            <p className="mb-4 text-xs font-semibold tracking-wide text-midnight">
              Synapto
            </p>
            <ul className="space-y-1 text-sm">
              {[
                "Overview",
                "Orders",
                "Products",
                "Customers",
                "Collections",
                "Website",
                "Analytics",
                "Settings",
              ].map((item, i) => (
                <li
                  key={item}
                  className={cn(
                    "rounded-lg px-2.5 py-1.5",
                    i === 0
                      ? "bg-primary/10 font-medium text-primary"
                      : "text-muted-foreground"
                  )}
                >
                  {item}
                </li>
              ))}
            </ul>
          </aside>

          <div className="p-3 sm:p-4 md:p-5">
            <div className="mb-3 flex items-center justify-between gap-2 sm:mb-4">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-midnight">
                  Welcome back
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  Northside Wellness · Sample
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
                <div className="hidden h-8 w-28 items-center gap-2 rounded-lg border border-border bg-white px-2 text-xs text-muted-foreground sm:flex md:w-36">
                  <Search className="h-3.5 w-3.5" />
                  Search
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-border">
                  <Bell className="h-3.5 w-3.5 text-muted-foreground" />
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-midnight text-[10px] font-medium text-white">
                  CA
                </div>
              </div>
            </div>

            <div className="mb-2.5 sm:mb-3">
              <Badge variant="sample" className="text-[10px] sm:text-xs">
                Sample data
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
              {sampleKpis.map((kpi) => (
                <div
                  key={kpi.label}
                  className="rounded-xl border border-border bg-[#fbfcfb] p-2.5 sm:p-3"
                >
                  <p className="truncate text-[10px] text-muted-foreground sm:text-[11px]">
                    {kpi.label}
                  </p>
                  <p className="mt-0.5 text-base font-semibold tracking-tight sm:mt-1 sm:text-lg">
                    {kpi.value}
                  </p>
                  <p className="text-[10px] text-emerald-600 sm:text-[11px]">
                    {kpi.change}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-2.5 grid gap-2.5 sm:mt-3 sm:gap-3 lg:grid-cols-[1.4fr_1fr]">
              <div className="rounded-xl border border-border p-2.5 sm:p-3">
                <div className="mb-2 flex items-center justify-between sm:mb-3">
                  <p className="text-xs font-medium sm:text-sm">Revenue</p>
                  <Package className="h-3.5 w-3.5 text-muted-foreground sm:h-4 sm:w-4" />
                </div>
                <MiniChart />
              </div>
              <div className="rounded-xl border border-border p-2.5 sm:p-3">
                <div className="mb-2 flex items-center justify-between sm:mb-3">
                  <p className="text-xs font-medium sm:text-sm">Recent orders</p>
                  <Users className="h-3.5 w-3.5 text-muted-foreground sm:h-4 sm:w-4" />
                </div>
                <ul className="space-y-2">
                  {sampleOrders.slice(0, 3).map((order) => (
                    <li
                      key={order.id}
                      className="flex items-center justify-between gap-2 text-xs"
                    >
                      <div className="min-w-0">
                        <p className="font-medium text-midnight">{order.id}</p>
                        <p className="truncate text-muted-foreground">
                          {order.customer}
                        </p>
                      </div>
                      <p className="shrink-0 font-medium">${order.amount}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
