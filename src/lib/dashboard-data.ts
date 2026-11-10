import { connection } from "next/server";
import { desc, eq, sql } from "drizzle-orm";
import { hasDatabase } from "@/lib/env";
import {
  sampleActivity,
  sampleCustomers,
  sampleKpis,
  sampleOrders,
  sampleProducts,
  sampleRevenue,
} from "@/content/sample-data";

export type DashboardMode = "live" | "sample";

async function ensureRequest() {
  await connection();
}

export async function getDashboardOverview() {
  await ensureRequest();
  if (!hasDatabase()) {
    return {
      mode: "sample" as const,
      storeName: "Northside Wellness (sample)",
      kpis: [...sampleKpis],
      orders: sampleOrders.slice(0, 5).map((order) => ({
        id: order.id,
        customer: order.customer,
        email: order.email,
        date: order.date,
        payment: order.payment,
        amount: order.amount,
      })),
      activity: [...sampleActivity],
      revenue: [...sampleRevenue],
    };
  }

  const { getDb } = await import("@/db/client");
  const { orders, products, customers, stores, clinicSubmissions, agentRuns } =
    await import("@/db/schema");
  const db = getDb();

  const [store] = await db.select().from(stores).limit(1);
  const orderRows = await db
    .select()
    .from(orders)
    .orderBy(desc(orders.createdAt))
    .limit(8);
  const productCount = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(products);
  const customerCount = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(customers);
  const submissionCount = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(clinicSubmissions);
  const runCount = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(agentRuns);

  const paidOrders = orderRows.filter((o) => o.paymentStatus === "paid");
  const revenueTotal = paidOrders.reduce(
    (sum, order) => sum + Number(order.total),
    0
  );
  const avgOrder =
    paidOrders.length > 0 ? revenueTotal / paidOrders.length : 0;

  const recentRuns = await db
    .select()
    .from(agentRuns)
    .orderBy(desc(agentRuns.createdAt))
    .limit(4);

  const activity = [
    ...recentRuns.map((run, index) => ({
      id: index + 1,
      text: `Agent ${run.agentId} completed (${run.mode})`,
      time: formatRelative(run.createdAt),
    })),
    {
      id: 100,
      text: `${submissionCount[0]?.count ?? 0} clinic submissions in queue`,
      time: "live",
    },
  ];

  return {
    mode: "live" as const,
    storeName: store?.name ?? "Clinic store",
    kpis: [
      {
        label: "Paid revenue (seeded)",
        value: `$${revenueTotal.toFixed(0)}`,
        change: "Live DB",
        positive: true,
      },
      {
        label: "Orders",
        value: String(orderRows.length),
        change: "Live DB",
        positive: true,
      },
      {
        label: "Avg paid order",
        value: `$${avgOrder.toFixed(0)}`,
        change: "Live DB",
        positive: true,
      },
      {
        label: "Customers",
        value: String(customerCount[0]?.count ?? 0),
        change: `${productCount[0]?.count ?? 0} products`,
        positive: true,
      },
    ],
    orders: orderRows.map((order) => ({
      id: order.orderNumber,
      customer: order.customerName,
      email: order.customerEmail,
      date: order.createdAt.toISOString().slice(0, 10),
      payment: order.paymentStatus,
      amount: Number(order.total),
    })),
    activity,
    revenue: [...sampleRevenue],
  };
}

export async function getLiveOrders() {
  await ensureRequest();
  if (!hasDatabase()) {
    return {
      mode: "sample" as const,
      orders: sampleOrders.map((order) => ({ ...order })),
    };
  }

  const { getDb } = await import("@/db/client");
  const { orders } = await import("@/db/schema");
  const db = getDb();
  const rows = await db.select().from(orders).orderBy(desc(orders.createdAt));

  return {
    mode: "live" as const,
    orders: rows.map((order) => ({
      id: order.orderNumber,
      customer: order.customerName,
      email: order.customerEmail,
      date: order.createdAt.toISOString().slice(0, 10),
      products: "Catalog items",
      amount: Number(order.total),
      payment: order.paymentStatus as
        | "paid"
        | "pending"
        | "fulfilled"
        | "cancelled"
        | "refunded",
      fulfillment: order.fulfillmentStatus as
        | "unfulfilled"
        | "processing"
        | "shipped"
        | "delivered"
        | "cancelled",
    })),
  };
}

export async function getLiveProducts() {
  await ensureRequest();
  if (!hasDatabase()) {
    return {
      mode: "sample" as const,
      products: sampleProducts.map((p) => ({ ...p })),
    };
  }

  const { getDb } = await import("@/db/client");
  const { products } = await import("@/db/schema");
  const db = getDb();
  const rows = await db.select().from(products).orderBy(desc(products.createdAt));

  return {
    mode: "live" as const,
    products: rows.map((product, index) => ({
      id: `PRD-${String(index + 1).padStart(2, "0")}`,
      title: product.title,
      category: product.category ?? "General",
      price: Number(product.price),
      inventory: product.inventory ?? 0,
      status: product.status as "draft" | "published" | "archived",
      availability: product.availability,
      dbId: product.id,
    })),
  };
}

export async function getLiveCustomers() {
  await ensureRequest();
  if (!hasDatabase()) {
    return {
      mode: "sample" as const,
      customers: sampleCustomers.map((c) => ({ ...c })),
    };
  }

  const { getDb } = await import("@/db/client");
  const { customers } = await import("@/db/schema");
  const db = getDb();
  const rows = await db
    .select()
    .from(customers)
    .orderBy(desc(customers.createdAt));

  return {
    mode: "live" as const,
    customers: rows.map((customer, index) => ({
      id: `CUS-${String(index + 1).padStart(2, "0")}`,
      name: customer.name,
      email: customer.email,
      orders: 0,
      spent: 0,
      status: customer.status as "active" | "inactive",
    })),
  };
}

export async function listSubmissions(agentId?: string) {
  await ensureRequest();
  if (!hasDatabase()) return [];

  const { getDb } = await import("@/db/client");
  const { clinicSubmissions } = await import("@/db/schema");
  const db = getDb();

  const rows = await db
    .select()
    .from(clinicSubmissions)
    .orderBy(desc(clinicSubmissions.createdAt));

  if (!agentId) return rows;
  return rows.filter(
    (row) => !row.suggestedAgentId || row.suggestedAgentId === agentId
  );
}

export async function getSubmission(id: string) {
  await ensureRequest();
  if (!hasDatabase()) return null;
  const { getDb } = await import("@/db/client");
  const { clinicSubmissions } = await import("@/db/schema");
  const db = getDb();
  const [row] = await db
    .select()
    .from(clinicSubmissions)
    .where(eq(clinicSubmissions.id, id))
    .limit(1);
  return row ?? null;
}

function formatRelative(date: Date) {
  const minutes = Math.max(
    0,
    Math.round((Date.now() - date.getTime()) / 60000)
  );
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.round(hours / 24)}d ago`;
}
