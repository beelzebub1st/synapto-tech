import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { organization } from "better-auth/plugins/organization";
import { nextCookies } from "better-auth/next-js";
import * as schema from "@/db/schema";
import { getDb } from "@/db/client";
import { hasAuthConfigured } from "@/lib/env";

function createAuthInstance() {
  const secret = process.env["BETTER_AUTH_SECRET"];
  if (!secret) {
    throw new Error("BETTER_AUTH_SECRET is required when auth is configured.");
  }

  const baseURL =
    process.env["BETTER_AUTH_URL"] ??
    process.env["NEXT_PUBLIC_APP_URL"] ??
    "http://localhost:3080";

  return betterAuth({
    database: drizzleAdapter(getDb(), {
      provider: "pg",
      schema: {
        user: schema.user,
        session: schema.session,
        account: schema.account,
        verification: schema.verification,
        organization: schema.organization,
        member: schema.member,
        invitation: schema.invitation,
      },
    }),
    secret,
    baseURL,
    emailAndPassword: {
      enabled: true,
    },
    plugins: [organization(), nextCookies()],
  });
}

type AuthInstance = ReturnType<typeof createAuthInstance>;

let authInstance: AuthInstance | null = null;

/**
 * Returns the Better Auth instance when DATABASE_URL and BETTER_AUTH_SECRET are set.
 * Returns null in local demo mode (no database).
 */
export function getAuth(): AuthInstance | null {
  if (!hasAuthConfigured()) {
    return null;
  }

  if (!authInstance) {
    authInstance = createAuthInstance();
  }

  return authInstance;
}
