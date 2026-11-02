# AUREL

Premium chauffeur booking platform. See `PROJECT_REQUIREMENTS.md` for the full
product spec and `AGENTS.md` for the contribution workflow.

This is Phase 1 (Foundation): project setup, the full relational schema,
authentication, role-based access control, and the core design system. Later
phases build the public site content, booking engine, and dashboards on top
of this.

## Stack

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · PostgreSQL · Drizzle
ORM · Auth.js (NextAuth v5, Credentials + JWT sessions)

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy the env template and fill in `AUTH_SECRET` (generate one with
   `npx auth secret`):

   ```bash
   cp .env.example .env.local
   ```

3. Start a local Postgres instance (or point `DATABASE_URL` at your own):

   ```bash
   docker compose up -d
   ```

4. Run migrations and seed demo data:

   ```bash
   npm run db:migrate
   npm run db:seed
   ```

   The seed is idempotent. It creates vehicle categories, sample vehicles,
   pricing rules, service areas, and default contact settings. If
   `ADMIN_EMAIL`/`ADMIN_PASSWORD` are not set, it generates a random
   development admin password and prints it once — never relies on a
   hard-coded default. It also prints two demo accounts:

   - `chauffeur.demo@aurel.local` / `ChauffeurDemo123!`
   - `customer.demo@aurel.local` / `CustomerDemo123!`

5. Start the dev server:

   ```bash
   npm run dev
   ```

## Integrations without credentials

Per the project requirements, integrations run in a clearly labeled
dev/mock mode when credentials are absent rather than silently pretending to
be the real thing:

- **Email.** `src/server/services/email-service.ts` logs messages to the
  server console (`[email:dev-mode]`) instead of sending them when
  `RESEND_API_KEY` is unset.
- **Google Maps and Stripe.** Not wired up yet; the booking engine that needs
  them is a later phase. `.env.example` documents the variables they'll need.

## Scripts

| Script | Purpose |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` / `npm run start` | Production build / run |
| `npm run lint` / `npm run typecheck` | Lint / type-check |
| `npm run db:generate` | Generate a Drizzle migration from schema changes |
| `npm run db:migrate` | Apply migrations |
| `npm run db:push` | Push schema directly (local prototyping only) |
| `npm run db:studio` | Open Drizzle Studio |
| `npm run db:seed` | Run the idempotent dev seed |
