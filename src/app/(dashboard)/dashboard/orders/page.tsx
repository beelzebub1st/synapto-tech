import { OrdersTable } from "@/components/dashboard/orders-table";
import { getLiveOrders } from "@/lib/dashboard-data";

export default async function OrdersPage() {
  const data = await getLiveOrders();
  return <OrdersTable orders={data.orders} mode={data.mode} />;
}
