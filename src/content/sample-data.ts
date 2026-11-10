export const sampleKpis = [
  { label: "Total revenue", value: "$48,290", change: "+12.4%", positive: true },
  { label: "Total orders", value: "312", change: "+8.1%", positive: true },
  { label: "Average order", value: "$154", change: "+3.2%", positive: true },
  { label: "Active customers", value: "1,248", change: "+5.6%", positive: true },
] as const;

export const sampleRevenue = [
  { month: "Jan", revenue: 28000, orders: 180 },
  { month: "Feb", revenue: 31200, orders: 198 },
  { month: "Mar", revenue: 29800, orders: 190 },
  { month: "Apr", revenue: 35400, orders: 220 },
  { month: "May", revenue: 40100, orders: 255 },
  { month: "Jun", revenue: 42800, orders: 278 },
  { month: "Jul", revenue: 48290, orders: 312 },
] as const;

export const sampleOrders = [
  {
    id: "ORD-10482",
    customer: "Elena M.",
    email: "elena@example.com",
    date: "2026-03-12",
    products: "Recovery Complex, Daily Support",
    amount: 186,
    payment: "paid" as const,
    fulfillment: "processing" as const,
  },
  {
    id: "ORD-10481",
    customer: "James K.",
    email: "james@example.com",
    date: "2026-03-12",
    products: "Clinic Essentials Kit",
    amount: 240,
    payment: "paid" as const,
    fulfillment: "shipped" as const,
  },
  {
    id: "ORD-10480",
    customer: "Priya S.",
    email: "priya@example.com",
    date: "2026-03-11",
    products: "Wellness Bundle",
    amount: 129,
    payment: "paid" as const,
    fulfillment: "delivered" as const,
  },
  {
    id: "ORD-10479",
    customer: "Marcus T.",
    email: "marcus@example.com",
    date: "2026-03-11",
    products: "Longevity Protocol Pack",
    amount: 312,
    payment: "pending" as const,
    fulfillment: "unfulfilled" as const,
  },
  {
    id: "ORD-10478",
    customer: "Sofia R.",
    email: "sofia@example.com",
    date: "2026-03-10",
    products: "Aesthetic Aftercare Set",
    amount: 98,
    payment: "paid" as const,
    fulfillment: "delivered" as const,
  },
] as const;

export const sampleProducts = [
  {
    id: "PRD-01",
    title: "Daily Support Formula",
    category: "Wellness",
    price: 68,
    inventory: 142,
    status: "published" as const,
    availability: true,
  },
  {
    id: "PRD-02",
    title: "Recovery Complex",
    category: "Performance",
    price: 118,
    inventory: 64,
    status: "published" as const,
    availability: true,
  },
  {
    id: "PRD-03",
    title: "Clinic Essentials Kit",
    category: "Bundles",
    price: 240,
    inventory: 28,
    status: "published" as const,
    availability: true,
  },
  {
    id: "PRD-04",
    title: "Aesthetic Aftercare Set",
    category: "Aesthetic",
    price: 98,
    inventory: 51,
    status: "published" as const,
    availability: true,
  },
  {
    id: "PRD-05",
    title: "Longevity Protocol Pack",
    category: "Longevity",
    price: 312,
    inventory: 17,
    status: "draft" as const,
    availability: false,
  },
] as const;

export const sampleCustomers = [
  {
    id: "CUS-01",
    name: "Elena Morales",
    email: "elena@example.com",
    orders: 6,
    spent: 842,
    status: "active" as const,
  },
  {
    id: "CUS-02",
    name: "James Kim",
    email: "james@example.com",
    orders: 3,
    spent: 516,
    status: "active" as const,
  },
  {
    id: "CUS-03",
    name: "Priya Shah",
    email: "priya@example.com",
    orders: 8,
    spent: 1240,
    status: "active" as const,
  },
  {
    id: "CUS-04",
    name: "Marcus Trent",
    email: "marcus@example.com",
    orders: 1,
    spent: 312,
    status: "active" as const,
  },
] as const;

export const sampleActivity = [
  { id: 1, text: "New order ORD-10482 received", time: "2m ago" },
  { id: 2, text: "Product inventory updated: Recovery Complex", time: "28m ago" },
  { id: 3, text: "Storefront hero content published", time: "1h ago" },
  { id: 4, text: "Customer Priya S. placed repeat order", time: "3h ago" },
] as const;
