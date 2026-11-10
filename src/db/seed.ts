/**
 * Seed local/Docker Postgres with a clinic org, catalog, submissions, and login user.
 * Run: npm run db:seed
 *
 * Login: clinic@northside.test / clinic123
 */
import "dotenv/config";
import { eq } from "drizzle-orm";
import { hashPassword } from "better-auth/crypto";
import { closeDb, getDb } from "./client";
import {
  account,
  agentRuns,
  clinicSettings,
  clinicSubmissions,
  customers,
  leads,
  member,
  organization,
  orders,
  products,
  projectDeposits,
  quizResults,
  stores,
  storefrontContent,
  strategyBookings,
  user,
} from "./schema";
import { addDays, setHours, startOfDay } from "date-fns";
import {
  extractEmail,
  extractPhone,
} from "../lib/agents/extract";

const ORG_ID = "org_northside_wellness";
const USER_ID = "user_clinic_admin";
const ACCOUNT_ID = "acc_clinic_admin";
const MEMBER_ID = "member_clinic_admin";

const submissions: Array<{
  type:
    | "intake"
    | "application"
    | "front_desk"
    | "follow_up"
    | "ops_exception"
    | "team_handoff";
  subject: string;
  patientLabel?: string;
  suggestedAgentId: string;
  body: string;
}> = [
  {
    type: "intake",
    subject: "Incomplete longevity intake — Sarah M.",
    patientLabel: "Sarah M.",
    suggestedAgentId: "intake-completeness",
    body: `Patient: Sarah M.
DOB: 14/03/1988
Phone: 
Email: sarah@example.com
Service interest: Longevity consultation
Preferred location: Downtown
Insurance: not provided
Attachments: ID uploaded, medical history missing
Notes: Wants appointment next week, no allergies listed.`,
  },
  {
    type: "intake",
    subject: "New aesthetic intake — Noah P.",
    patientLabel: "Noah P.",
    suggestedAgentId: "intake-completeness",
    body: `Patient: Noah P.
DOB: 02/11/1994
Phone: +1 555 0142
Email: noah@example.com
Service interest: Aesthetic aftercare consult
Preferred location: Midtown
Insurance: self-pay
Attachments: ID uploaded, questionnaire incomplete (skipped medication list)
Notes: Prefers evenings after 6pm.`,
  },
  {
    type: "application",
    subject: "Application packet — James K.",
    patientLabel: "James K.",
    suggestedAgentId: "application-review",
    body: `Applicant: James K.
Checklist:
- Government ID: present, expires 2027
- Proof of address: missing
- Consent form: signed
- Questionnaire: incomplete (skipped medication list)
- Referral letter: uploaded, low quality scan
Staff note: Needs follow-up before scheduling.`,
  },
  {
    type: "front_desk",
    subject: "Saturday consult enquiry",
    patientLabel: "Anonymous lead",
    suggestedAgentId: "front-desk-concierge",
    body: `From: weekend.guest@example.com
Hi, do you offer Saturday consultations for aesthetic aftercare?
Also, how long are appointments usually?
I can come downtown next weekend.
Thanks!`,
  },
  {
    type: "front_desk",
    subject: "Pricing + prep question",
    patientLabel: "Priya S.",
    suggestedAgentId: "front-desk-concierge",
    body: `From: priya@example.com
Hello — I'm interested in a regenerative consult.
Can you share typical appointment length and what I should bring?
Urgent: I'd like something this week if possible.`,
  },
  {
    type: "follow_up",
    subject: "Stalled bookings queue",
    suggestedAgentId: "follow-up-scheduling",
    body: `Leads needing follow-up:
1) Priya S. — requested longevity consult, no booking confirmed (3 days ago)
2) Marcus T. — no-show on Tuesday aesthetic consult, asked to reschedule
3) Elena M. — cart started for aftercare kit, unpaid
Clinic hours: Mon–Fri 9–5, Sat by request.`,
  },
  {
    type: "ops_exception",
    subject: "Ops exceptions — payments & inventory",
    suggestedAgentId: "ops-exception",
    body: `ORD-10479 — payment pending 48h, customer Marcus T.
ORD-10470 — fulfilled but tracking missing
Content task — homepage banner draft waiting approval 5 days
Inventory — Recovery Complex low (17 units)
Integration — Stripe connect still disconnected`,
  },
  {
    type: "team_handoff",
    subject: "Huddle handoff — regenerative enquiry",
    patientLabel: "New enquiry",
    suggestedAgentId: "team-copilot",
    body: `Thread:
Front desk: New enquiry for regenerative consult, asked about pricing and prep.
Coordinator: Sent intake form yesterday, still waiting on completed questionnaire and ID.
Clinician: Can see them Thursday afternoon if packet is complete by Wednesday noon.
Need a clean handoff summary for tomorrow's huddle.`,
  },
];

async function seed() {
  const db = getDb();

  await db
    .insert(organization)
    .values({
      id: ORG_ID,
      name: "Northside Wellness",
      slug: "northside-wellness",
      createdAt: new Date(),
    })
    .onConflictDoNothing();

  const passwordHash = await hashPassword("clinic123");

  await db
    .insert(user)
    .values({
      id: USER_ID,
      name: "Clinic Admin",
      email: "clinic@northside.test",
      emailVerified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .onConflictDoNothing();

  await db
    .insert(account)
    .values({
      id: ACCOUNT_ID,
      accountId: USER_ID,
      providerId: "credential",
      userId: USER_ID,
      password: passwordHash,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .onConflictDoNothing();

  await db
    .insert(member)
    .values({
      id: MEMBER_ID,
      organizationId: ORG_ID,
      userId: USER_ID,
      role: "owner",
      createdAt: new Date(),
    })
    .onConflictDoNothing();

  await db
    .insert(clinicSettings)
    .values({
      organizationId: ORG_ID,
      autoProcessIntakes: true,
      autoSendClientMessages: true,
      callAgentEnabled: true,
    })
    .onConflictDoNothing();

  const existingStores = await db
    .select()
    .from(stores)
    .where(eq(stores.organizationId, ORG_ID))
    .limit(1);

  let storeId = existingStores[0]?.id;

  if (!storeId) {
    const [store] = await db
      .insert(stores)
      .values({
        organizationId: ORG_ID,
        name: "Northside Wellness",
        slug: "northside-wellness",
        primaryColor: "#526BFF",
        secondaryColor: "#101820",
        isDemo: false,
      })
      .returning();
    storeId = store!.id;

    await db.insert(storefrontContent).values({
      storeId,
      heroHeadline: "Care that continues beyond the clinic",
      heroSubheadline:
        "Premium wellness products and digital intake for modern practices.",
      aboutText: "Live clinic storefront powered by Synapto Tech.",
      contactEmail: "hello@northside.test",
      contactPhone: "+1 555 0100",
      seoTitle: "Northside Wellness",
      seoDescription: "Clinic storefront and operations on Synapto Tech.",
    });

    await db.insert(products).values([
      {
        storeId,
        title: "Daily Support Formula",
        description: "Daily wellness support formula.",
        category: "Wellness",
        price: "68.00",
        inventory: 142,
        status: "published",
        isSample: false,
      },
      {
        storeId,
        title: "Recovery Complex",
        description: "Recovery support complex.",
        category: "Performance",
        price: "118.00",
        inventory: 17,
        status: "published",
        isSample: false,
      },
      {
        storeId,
        title: "Clinic Essentials Kit",
        description: "Bundle for clinic aftercare.",
        category: "Bundles",
        price: "240.00",
        inventory: 28,
        status: "published",
        isSample: false,
      },
      {
        storeId,
        title: "Aesthetic Aftercare Set",
        description: "Aftercare set for aesthetic visits.",
        category: "Aesthetic",
        price: "98.00",
        inventory: 51,
        status: "published",
        isSample: false,
      },
      {
        storeId,
        title: "Longevity Protocol Pack",
        description: "Draft longevity protocol pack.",
        category: "Longevity",
        price: "312.00",
        inventory: 17,
        status: "draft",
        availability: false,
        isSample: false,
      },
    ]);

    const insertedCustomers = await db
      .insert(customers)
      .values([
        {
          storeId,
          name: "Elena Morales",
          email: "elena@example.com",
          phone: "+1 555 0111",
          status: "active",
          isSample: false,
        },
        {
          storeId,
          name: "James Kim",
          email: "james@example.com",
          phone: "+1 555 0112",
          status: "active",
          isSample: false,
        },
        {
          storeId,
          name: "Priya Shah",
          email: "priya@example.com",
          status: "active",
          isSample: false,
        },
        {
          storeId,
          name: "Marcus Trent",
          email: "marcus@example.com",
          status: "active",
          isSample: false,
        },
      ])
      .returning();

    await db.insert(orders).values([
      {
        storeId,
        orderNumber: "ORD-10482",
        customerId: insertedCustomers[0]?.id,
        customerName: "Elena Morales",
        customerEmail: "elena@example.com",
        total: "186.00",
        paymentStatus: "paid",
        fulfillmentStatus: "processing",
        isSample: false,
      },
      {
        storeId,
        orderNumber: "ORD-10481",
        customerId: insertedCustomers[1]?.id,
        customerName: "James Kim",
        customerEmail: "james@example.com",
        total: "240.00",
        paymentStatus: "paid",
        fulfillmentStatus: "shipped",
        isSample: false,
      },
      {
        storeId,
        orderNumber: "ORD-10480",
        customerId: insertedCustomers[2]?.id,
        customerName: "Priya Shah",
        customerEmail: "priya@example.com",
        total: "129.00",
        paymentStatus: "paid",
        fulfillmentStatus: "delivered",
        isSample: false,
      },
      {
        storeId,
        orderNumber: "ORD-10479",
        customerId: insertedCustomers[3]?.id,
        customerName: "Marcus Trent",
        customerEmail: "marcus@example.com",
        total: "312.00",
        paymentStatus: "pending",
        fulfillmentStatus: "unfulfilled",
        isSample: false,
      },
      {
        storeId,
        orderNumber: "ORD-10478",
        customerName: "Sofia Reyes",
        customerEmail: "sofia@example.com",
        total: "98.00",
        paymentStatus: "paid",
        fulfillmentStatus: "delivered",
        isSample: false,
      },
    ]);
  }

  const existingSubs = await db
    .select({ id: clinicSubmissions.id })
    .from(clinicSubmissions)
    .where(eq(clinicSubmissions.organizationId, ORG_ID))
    .limit(1);

  if (!existingSubs.length) {
    await db.insert(clinicSubmissions).values(
      submissions.map((item) => ({
        organizationId: ORG_ID,
        storeId,
        type: item.type,
        status: "new" as const,
        subject: item.subject,
        patientLabel: item.patientLabel,
        contactEmail: extractEmail(item.body),
        contactPhone: extractPhone(item.body),
        body: item.body,
        suggestedAgentId: item.suggestedAgentId,
      }))
    );
  }

  const existingLeads = await db.select({ id: leads.id }).from(leads).limit(1);
  if (!existingLeads.length) {
    await db.insert(leads).values([
      {
        fullName: "Ava Chen",
        businessName: "Harbor Glow Clinic",
        email: "ava@harborglow.test",
        businessType: "Aesthetic clinic",
        estimatedProducts: "25-50",
        message: "Interest: Website + branding package\nTimeline: 30 days",
        source: "book_demo",
        consent: true,
      },
      {
        fullName: "Daniel Ortiz",
        businessName: "Summit Longevity",
        email: "daniel@summit.test",
        businessType: "Longevity clinic",
        message: "Interest: AI agents + intake\nTimeline: This quarter",
        source: "contact",
        consent: true,
      },
    ]);
  }

  const existingBookings = await db
    .select({ id: strategyBookings.id })
    .from(strategyBookings)
    .limit(1);
  if (!existingBookings.length) {
    const slot = setHours(addDays(startOfDay(new Date()), 3), 10);
    await db.insert(strategyBookings).values({
      fullName: "Elena Voss",
      email: "elena@northridge.test",
      clinicName: "Northridge Wellness",
      phone: "+1 555 0199",
      packageInterest: "product",
      demoInterest: "website",
      slotStart: slot,
      slotEnd: new Date(slot.getTime() + 30 * 60 * 1000),
      timezone: "Europe/Berlin",
      notes: "Wants website + patient PWA path",
      status: "confirmed",
    });
  }

  const existingQuizzes = await db
    .select({ id: quizResults.id })
    .from(quizResults)
    .limit(1);
  if (!existingQuizzes.length) {
    await db.insert(quizResults).values({
      answers: {
        industry: "services",
        size: "smb",
        priority: "app",
        stage: "redesign",
        goal: "leads",
        commerce: "later",
        productSurface: "pwa",
        automation: "agents",
        team: "small",
        pain: "followup",
        budget: "standard",
        urgency: "month",
      },
      recommendedPackage: "product",
      scoreBreakdown: { presence: 4, product: 14, system: 6 },
      email: "elena@northline.test",
      fullName: "Elena Voss",
      clinicName: "Northline Advisory",
    });
  }

  const existingDeposits = await db
    .select({ id: projectDeposits.id })
    .from(projectDeposits)
    .limit(1);
  if (!existingDeposits.length) {
    await db.insert(projectDeposits).values({
      packageKey: "presence",
      amountCents: 150000,
      currency: "eur",
      fullName: "Marcus Hale",
      email: "marcus@harbor.test",
      clinicName: "Harbor Aesthetic",
      status: "reserved_local",
      notes: "Website-first launch, branding included",
    });
  }

  // Clear stale empty agent runs table on first seed only (no-op if already used)
  await db.select({ id: agentRuns.id }).from(agentRuns).limit(1);

  console.log("Seed complete.");
  console.log("Login: clinic@northside.test / clinic123");
  console.log(`Organization: ${ORG_ID}`);
  console.log(`Submissions ready for agents: ${submissions.length}`);
  await closeDb();
}

seed()
  .then(() => process.exit(0))
  .catch(async (error) => {
    console.error(error);
    await closeDb().catch(() => undefined);
    process.exit(1);
  });
