import { KpiCard } from "@/components/dashboard/kpi-card";
import { RevenueChart } from "@/components/dashboard/revenue-chart";
import {
  DataTable,
  DataTableBody,
  DataTableCell,
  DataTableHead,
  DataTableHeader,
  DataTableRow,
} from "@/components/dashboard/data-table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getDashboardOverview } from "@/lib/dashboard-data";

function statusBadge(status: string): "default" | "success" | "warning" | "outline" {
  const map: Record<string, "success" | "warning" | "outline" | "default"> = {
    paid: "success",
    pending: "warning",
    processing: "warning",
    shipped: "default",
    delivered: "success",
  };
  return map[status] ?? "outline";
}

export default async function DashboardOverviewPage() {
  const data = await getDashboardOverview();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-midnight">
            Overview
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Performance snapshot for {data.storeName}.
          </p>
        </div>
        <Badge variant={data.mode === "live" ? "success" : "sample"}>
          {data.mode === "live" ? "Live database" : "Sample data"}
        </Badge>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {data.kpis.map((kpi) => (
          <KpiCard key={kpi.label} {...kpi} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Revenue trend</CardTitle>
            <CardDescription>
              Last 7 months · {data.mode === "live" ? "reference chart" : "sample data"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RevenueChart />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent activity</CardTitle>
            <CardDescription>
              {data.mode === "live" ? "Agent runs + queue" : "Sample activity feed"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.activity.map((item) => (
              <div key={item.id} className="flex gap-3 text-sm">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <div>
                  <p className="text-foreground">{item.text}</p>
                  <p className="text-xs text-muted-foreground">{item.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-midnight">Recent orders</h2>
          <Badge variant={data.mode === "live" ? "success" : "sample"}>
            {data.mode === "live" ? "Live" : "Sample"}
          </Badge>
        </div>
        <DataTable>
          <table className="w-full min-w-[640px]">
            <DataTableHeader>
              <DataTableHead>Order</DataTableHead>
              <DataTableHead>Customer</DataTableHead>
              <DataTableHead>Date</DataTableHead>
              <DataTableHead>Payment</DataTableHead>
              <DataTableHead className="text-right">Total</DataTableHead>
            </DataTableHeader>
            <DataTableBody>
              {data.orders.slice(0, 5).map((order) => (
                <DataTableRow key={order.id}>
                  <DataTableCell className="font-medium text-midnight">
                    {order.id}
                  </DataTableCell>
                  <DataTableCell>
                    <div>{order.customer}</div>
                    <div className="text-xs text-muted-foreground">{order.email}</div>
                  </DataTableCell>
                  <DataTableCell>{order.date}</DataTableCell>
                  <DataTableCell>
                    <Badge variant={statusBadge(order.payment)}>{order.payment}</Badge>
                  </DataTableCell>
                  <DataTableCell className="text-right font-medium">
                    ${order.amount.toFixed(2)}
                  </DataTableCell>
                </DataTableRow>
              ))}
            </DataTableBody>
          </table>
        </DataTable>
      </div>
    </div>
  );
}
