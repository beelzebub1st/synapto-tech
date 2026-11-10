import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),
  NEXT_PUBLIC_APP_NAME: z.string().default("Synapto Tech"),
  DATABASE_URL: z.string().optional(),
  BETTER_AUTH_SECRET: z.string().optional(),
  BETTER_AUTH_URL: z.string().url().optional(),
  RESEND_API_KEY: z.string().optional(),
  RESEND_FROM_EMAIL: z.string().email().optional(),
  LEADS_TO_EMAIL: z.string().email().optional(),
  STRIPE_SECRET_KEY: z.string().optional(),
  STRIPE_WEBHOOK_SECRET: z.string().optional(),
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().optional(),
});

export type Env = z.infer<typeof envSchema>;

/** Bracket access keeps Docker runtime env from being inlined as empty at build. */
function readEnv(name: string) {
  return process.env[name];
}

function getEnv(): Env {
  const parsed = envSchema.safeParse({
    NODE_ENV: readEnv("NODE_ENV"),
    NEXT_PUBLIC_APP_URL: readEnv("NEXT_PUBLIC_APP_URL"),
    NEXT_PUBLIC_APP_NAME: readEnv("NEXT_PUBLIC_APP_NAME"),
    DATABASE_URL: readEnv("DATABASE_URL"),
    BETTER_AUTH_SECRET: readEnv("BETTER_AUTH_SECRET"),
    BETTER_AUTH_URL: readEnv("BETTER_AUTH_URL"),
    RESEND_API_KEY: readEnv("RESEND_API_KEY"),
    RESEND_FROM_EMAIL: readEnv("RESEND_FROM_EMAIL"),
    LEADS_TO_EMAIL: readEnv("LEADS_TO_EMAIL"),
    STRIPE_SECRET_KEY: readEnv("STRIPE_SECRET_KEY"),
    STRIPE_WEBHOOK_SECRET: readEnv("STRIPE_WEBHOOK_SECRET"),
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: readEnv(
      "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY"
    ),
  });

  if (!parsed.success) {
    console.warn("Environment validation warnings:", parsed.error.flatten());
    return envSchema.parse({});
  }

  return parsed.data;
}

export const env = getEnv();

export function hasDatabase() {
  return Boolean(readEnv("DATABASE_URL"));
}

export function hasResend() {
  return Boolean(readEnv("RESEND_API_KEY"));
}

export function hasStripe() {
  return Boolean(readEnv("STRIPE_SECRET_KEY"));
}

export function hasAuthConfigured() {
  return Boolean(readEnv("BETTER_AUTH_SECRET") && readEnv("DATABASE_URL"));
}
