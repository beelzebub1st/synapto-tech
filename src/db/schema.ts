import {
  boolean,
  integer,
  jsonb,
  numeric,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const leadSourceEnum = pgEnum("lead_source", [
  "book_demo",
  "contact",
  "pricing",
]);

export const memberRoleEnum = pgEnum("member_role", [
  "owner",
  "admin",
  "staff",
]);

export const orderStatusEnum = pgEnum("order_status", [
  "pending",
  "paid",
  "fulfilled",
  "cancelled",
  "refunded",
]);

export const fulfillmentStatusEnum = pgEnum("fulfillment_status", [
  "unfulfilled",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
]);

export const integrationProviderEnum = pgEnum("integration_provider", [
  "stripe",
]);

export const integrationStatusEnum = pgEnum("integration_status", [
  "disconnected",
  "pending",
  "connected",
  "error",
]);

export const productStatusEnum = pgEnum("product_status", [
  "draft",
  "published",
  "archived",
]);

/* Better Auth core tables */
export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull().default(false),
  image: text("image"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  activeOrganizationId: text("active_organization_id"),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

/* Better Auth organization plugin */
export const organization = pgTable("organization", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  logo: text("logo"),
  metadata: text("metadata"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const member = pgTable("member", {
  id: text("id").primaryKey(),
  organizationId: text("organization_id")
    .notNull()
    .references(() => organization.id, { onDelete: "cascade" }),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  role: text("role").notNull().default("member"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const invitation = pgTable("invitation", {
  id: text("id").primaryKey(),
  organizationId: text("organization_id")
    .notNull()
    .references(() => organization.id, { onDelete: "cascade" }),
  email: text("email").notNull(),
  role: text("role"),
  status: text("status").notNull().default("pending"),
  expiresAt: timestamp("expires_at").notNull(),
  inviterId: text("inviter_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

/* Platform tables */
export const leads = pgTable("leads", {
  id: uuid("id").defaultRandom().primaryKey(),
  fullName: text("full_name").notNull(),
  businessName: text("business_name").notNull(),
  email: text("email").notNull(),
  website: text("website"),
  businessType: text("business_type").notNull(),
  estimatedProducts: text("estimated_products"),
  message: text("message"),
  source: leadSourceEnum("source").notNull().default("book_demo"),
  consent: boolean("consent").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const stores = pgTable("stores", {
  id: uuid("id").defaultRandom().primaryKey(),
  organizationId: text("organization_id")
    .notNull()
    .references(() => organization.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  slug: text("slug").notNull(),
  logoUrl: text("logo_url"),
  primaryColor: text("primary_color").default("#526BFF"),
  secondaryColor: text("secondary_color").default("#101820"),
  domain: text("domain"),
  isDemo: boolean("is_demo").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const storefrontContent = pgTable("storefront_content", {
  id: uuid("id").defaultRandom().primaryKey(),
  storeId: uuid("store_id")
    .notNull()
    .references(() => stores.id, { onDelete: "cascade" }),
  heroHeadline: text("hero_headline"),
  heroSubheadline: text("hero_subheadline"),
  heroImageUrl: text("hero_image_url"),
  aboutText: text("about_text"),
  contactEmail: text("contact_email"),
  contactPhone: text("contact_phone"),
  bannerText: text("banner_text"),
  sections: jsonb("sections").$type<Record<string, unknown>[]>(),
  seoTitle: text("seo_title"),
  seoDescription: text("seo_description"),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const products = pgTable("products", {
  id: uuid("id").defaultRandom().primaryKey(),
  storeId: uuid("store_id")
    .notNull()
    .references(() => stores.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  description: text("description"),
  category: text("category"),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  imageUrl: text("image_url"),
  availability: boolean("availability").notNull().default(true),
  status: productStatusEnum("status").notNull().default("draft"),
  inventory: integer("inventory").default(0),
  isSample: boolean("is_sample").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const customers = pgTable("customers", {
  id: uuid("id").defaultRandom().primaryKey(),
  storeId: uuid("store_id")
    .notNull()
    .references(() => stores.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  status: text("status").notNull().default("active"),
  isSample: boolean("is_sample").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const orders = pgTable("orders", {
  id: uuid("id").defaultRandom().primaryKey(),
  storeId: uuid("store_id")
    .notNull()
    .references(() => stores.id, { onDelete: "cascade" }),
  orderNumber: text("order_number").notNull(),
  customerId: uuid("customer_id").references(() => customers.id),
  customerName: text("customer_name").notNull(),
  customerEmail: text("customer_email").notNull(),
  total: numeric("total", { precision: 10, scale: 2 }).notNull(),
  paymentStatus: orderStatusEnum("payment_status").notNull().default("pending"),
  fulfillmentStatus: fulfillmentStatusEnum("fulfillment_status")
    .notNull()
    .default("unfulfilled"),
  isSample: boolean("is_sample").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const orderItems = pgTable("order_items", {
  id: uuid("id").defaultRandom().primaryKey(),
  orderId: uuid("order_id")
    .notNull()
    .references(() => orders.id, { onDelete: "cascade" }),
  productId: uuid("product_id").references(() => products.id),
  productTitle: text("product_title").notNull(),
  quantity: integer("quantity").notNull().default(1),
  unitPrice: numeric("unit_price", { precision: 10, scale: 2 }).notNull(),
});

export const integrations = pgTable("integrations", {
  id: uuid("id").defaultRandom().primaryKey(),
  organizationId: text("organization_id")
    .notNull()
    .references(() => organization.id, { onDelete: "cascade" }),
  provider: integrationProviderEnum("provider").notNull(),
  status: integrationStatusEnum("status").notNull().default("disconnected"),
  externalAccountRef: text("external_account_ref"),
  metadata: jsonb("metadata").$type<Record<string, unknown>>(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const auditEvents = pgTable("audit_events", {
  id: uuid("id").defaultRandom().primaryKey(),
  organizationId: text("organization_id").references(() => organization.id),
  userId: text("user_id").references(() => user.id),
  action: text("action").notNull(),
  entityType: text("entity_type"),
  entityId: text("entity_id"),
  metadata: jsonb("metadata").$type<Record<string, unknown>>(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const submissionTypeEnum = pgEnum("submission_type", [
  "intake",
  "application",
  "front_desk",
  "follow_up",
  "ops_exception",
  "team_handoff",
  "call",
]);

export const submissionStatusEnum = pgEnum("submission_status", [
  "new",
  "in_review",
  "needs_info",
  "resolved",
  "messaged",
]);

export const clinicSubmissions = pgTable("clinic_submissions", {
  id: uuid("id").defaultRandom().primaryKey(),
  organizationId: text("organization_id")
    .notNull()
    .references(() => organization.id, { onDelete: "cascade" }),
  storeId: uuid("store_id").references(() => stores.id, { onDelete: "set null" }),
  type: submissionTypeEnum("type").notNull(),
  status: submissionStatusEnum("status").notNull().default("new"),
  subject: text("subject").notNull(),
  patientLabel: text("patient_label"),
  contactEmail: text("contact_email"),
  contactPhone: text("contact_phone"),
  body: text("body").notNull(),
  suggestedAgentId: text("suggested_agent_id"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const agentRuns = pgTable("agent_runs", {
  id: uuid("id").defaultRandom().primaryKey(),
  organizationId: text("organization_id")
    .notNull()
    .references(() => organization.id, { onDelete: "cascade" }),
  submissionId: uuid("submission_id").references(() => clinicSubmissions.id, {
    onDelete: "set null",
  }),
  agentId: text("agent_id").notNull(),
  mode: text("mode").notNull(),
  input: text("input").notNull(),
  result: jsonb("result").$type<Record<string, unknown>>().notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const messageStatusEnum = pgEnum("message_status", [
  "queued",
  "sent",
  "sent_local",
  "failed",
  "cancelled",
]);

export const clinicSettings = pgTable("clinic_settings", {
  organizationId: text("organization_id")
    .primaryKey()
    .references(() => organization.id, { onDelete: "cascade" }),
  autoProcessIntakes: boolean("auto_process_intakes").notNull().default(true),
  autoSendClientMessages: boolean("auto_send_client_messages")
    .notNull()
    .default(true),
  callAgentEnabled: boolean("call_agent_enabled").notNull().default(true),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const clientMessages = pgTable("client_messages", {
  id: uuid("id").defaultRandom().primaryKey(),
  organizationId: text("organization_id")
    .notNull()
    .references(() => organization.id, { onDelete: "cascade" }),
  submissionId: uuid("submission_id").references(() => clinicSubmissions.id, {
    onDelete: "set null",
  }),
  agentRunId: uuid("agent_run_id").references(() => agentRuns.id, {
    onDelete: "set null",
  }),
  channel: text("channel").notNull().default("email"),
  toAddress: text("to_address").notNull(),
  subject: text("subject").notNull(),
  body: text("body").notNull(),
  status: messageStatusEnum("status").notNull().default("queued"),
  error: text("error"),
  sentAt: timestamp("sent_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const callSessions = pgTable("call_sessions", {
  id: uuid("id").defaultRandom().primaryKey(),
  organizationId: text("organization_id")
    .notNull()
    .references(() => organization.id, { onDelete: "cascade" }),
  callerName: text("caller_name"),
  callerPhone: text("caller_phone"),
  status: text("status").notNull().default("active"),
  transcript: jsonb("transcript")
    .$type<Array<{ role: "agent" | "customer" | "system"; text: string; at: string }>>()
    .notNull()
    .default([]),
  summary: text("summary"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const bookingStatusEnum = pgEnum("booking_status", [
  "confirmed",
  "cancelled",
  "completed",
  "no_show",
]);

export const strategyBookings = pgTable("strategy_bookings", {
  id: uuid("id").defaultRandom().primaryKey(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  clinicName: text("clinic_name").notNull(),
  phone: text("phone"),
  packageInterest: text("package_interest"),
  demoInterest: text("demo_interest"),
  slotStart: timestamp("slot_start").notNull(),
  slotEnd: timestamp("slot_end").notNull(),
  timezone: text("timezone").notNull().default("Europe/Berlin"),
  notes: text("notes"),
  quizResultId: uuid("quiz_result_id"),
  status: bookingStatusEnum("status").notNull().default("confirmed"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const quizResults = pgTable("quiz_results", {
  id: uuid("id").defaultRandom().primaryKey(),
  answers: jsonb("answers").$type<Record<string, string>>().notNull(),
  recommendedPackage: text("recommended_package").notNull(),
  scoreBreakdown: jsonb("score_breakdown").$type<Record<string, number>>(),
  email: text("email"),
  fullName: text("full_name"),
  clinicName: text("clinic_name"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const depositStatusEnum = pgEnum("deposit_status", [
  "reserved_local",
  "pending_payment",
  "paid",
  "cancelled",
  "refunded",
]);

export const projectDeposits = pgTable("project_deposits", {
  id: uuid("id").defaultRandom().primaryKey(),
  packageKey: text("package_key").notNull(),
  amountCents: integer("amount_cents").notNull(),
  currency: text("currency").notNull().default("eur"),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  clinicName: text("clinic_name").notNull(),
  phone: text("phone"),
  notes: text("notes"),
  status: depositStatusEnum("status").notNull().default("reserved_local"),
  stripeSessionId: text("stripe_session_id"),
  quizResultId: uuid("quiz_result_id"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const proposalRequests = pgTable("proposal_requests", {
  id: uuid("id").defaultRandom().primaryKey(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  clinicName: text("clinic_name").notNull(),
  packageKey: text("package_key").notNull(),
  summary: text("summary").notNull(),
  answers: jsonb("answers").$type<Record<string, string>>(),
  status: text("status").notNull().default("new"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
