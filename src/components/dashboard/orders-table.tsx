"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  DataTable,
  DataTableBody,
  DataTableCell,
  DataTableHead,
  DataTableHeader,
  DataTableRow,
} from "@/components/dashboard/data-table";

type OrderRow = {
  id: string;
  customer: string;
  email: string;
  date: string;
  products: string;
  amount: number;
  payment: string;
  fulfillment: string;
};

export function OrdersTable({
  orders,
  mode,
}: {
  orders: OrderRow[];
  mode: "live" | "sample";
}) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<string>("all");

  const filtered = useMemo(() => {
    return orders.filter((order) => {
      const matchesQuery =
        !query ||
        order.id.toLowerCase().includes(query.toLowerCase()) ||
        order.customer.toLowerCase().includes(query.toLowerCase()) ||
        order.email.toLowerCase().includes(query.toLowerCase());
      const matchesStatus = status === "all" || order.payment === status;
      return matchesQuery && matchesStatus;
    });
  }, [orders, query, status]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-midnight">
            Orders
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Search and filter {mode === "live" ? "live" : "sample"} orders.
          </p>
        </div>
        <Badge variant={mode === "live" ? "success" : "sample"}>
          {mode === "live" ? "Live database" : "Sample"}
        </Badge>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Input
          placeholder="Search orders, customers…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="max-w-md"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="h-11 rounded-xl border border-input bg-white px-3 text-sm"
        >
          <option value="all">All payments</option>
          <option value="paid">Paid</option>
          <option value="pending">Pending</option>
        </select>
      </div>
      <DataTable>
        <table className="w-full min-w-[800px]">
          <DataTableHeader>
            <DataTableHead>Order</DataTableHead>
            <DataTableHead>Customer</DataTableHead>
            <DataTableHead>Products</DataTableHead>
            <DataTableHead>Payment</DataTableHead>
            <DataTableHead>Fulfillment</DataTableHead>
            <DataTableHead className="text-right">Total</DataTableHead>
          </DataTableHeader>
          <DataTableBody>
            {filtered.map((order) => (
              <DataTableRow key={order.id}>
                <DataTableCell className="font-medium">{order.id}</DataTableCell>
                <DataTableCell>
                  <div>{order.customer}</div>
                  <div className="text-xs text-muted-foreground">{order.email}</div>
                </DataTableCell>
                <DataTableCell className="max-w-[200px] truncate text-muted-foreground">
                  {order.products}
                </DataTableCell>
                <DataTableCell>
                  <Badge
                    variant={order.payment === "paid" ? "success" : "warning"}
                  >
                    {order.payment}
                  </Badge>
                </DataTableCell>
                <DataTableCell>
                  <Badge variant="outline">{order.fulfillment}</Badge>
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
  );
}
