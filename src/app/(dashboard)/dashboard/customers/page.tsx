import { Badge } from "@/components/ui/badge";
import {
  DataTable,
  DataTableBody,
  DataTableCell,
  DataTableHead,
  DataTableHeader,
  DataTableRow,
} from "@/components/dashboard/data-table";
import { getLiveCustomers } from "@/lib/dashboard-data";

export default async function CustomersPage() {
  const data = await getLiveCustomers();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-midnight">
            Customers
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {data.mode === "live"
              ? "Customers from your clinic database."
              : "Sample customer records for your storefront."}
          </p>
        </div>
        <Badge variant={data.mode === "live" ? "success" : "sample"}>
          {data.mode === "live" ? "Live database" : "Sample"}
        </Badge>
      </div>
      <DataTable>
        <table className="w-full min-w-[640px]">
          <DataTableHeader>
            <DataTableHead>Customer</DataTableHead>
            <DataTableHead>Email</DataTableHead>
            <DataTableHead>Orders</DataTableHead>
            <DataTableHead>Total spent</DataTableHead>
            <DataTableHead>Status</DataTableHead>
          </DataTableHeader>
          <DataTableBody>
            {data.customers.map((customer) => (
              <DataTableRow key={customer.id}>
                <DataTableCell className="font-medium">{customer.name}</DataTableCell>
                <DataTableCell>{customer.email}</DataTableCell>
                <DataTableCell>{customer.orders}</DataTableCell>
                <DataTableCell>${customer.spent.toLocaleString()}</DataTableCell>
                <DataTableCell>
                  <Badge variant="success">{customer.status}</Badge>
                </DataTableCell>
              </DataTableRow>
            ))}
          </DataTableBody>
        </table>
      </DataTable>
    </div>
  );
}
