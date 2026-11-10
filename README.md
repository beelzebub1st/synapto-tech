# Synapto Tech

Premium healthcare commerce infrastructure — marketing site and platform dashboard.

## Stack

- **Next.js** (App Router) + TypeScript + Tailwind CSS
- **Vercel** hosting
- **Neon** Postgres + Drizzle ORM
- **Better Auth** (organizations / roles)
- **Resend** (lead + transactional email)
- Payment-ready **Stripe** abstraction (not live checkout in MVP)

## Getting started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The marketing site and `/dashboard` work without external services using labeled sample data.

### Optional integrations

| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | Neon connection — persists leads, enables auth tables |
| `BETTER_AUTH_SECRET` | Enables real email/password auth |
| `RESEND_API_KEY` | Sends demo/contact notification emails |
| `STRIPE_*` | Reserved for future payment provider connection |

```bash
npm run db:push   # push schema to Neon
```

## Scripts

- `npm run dev` — local development
- `npm run build` — production build
- `npm run db:generate` / `db:push` / `db:studio` — Drizzle

## Notes

- Do not claim HIPAA compliance or product legality without verified evidence.
- Dashboard analytics show **sample data** until live commerce is connected.
- Each future clinic merchant should use isolated payment credentials — never mix tenants.
