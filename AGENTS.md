# AGENTS.md

This file provides guidance to AI Coding Agents when working with code in this repository.

## Overview

Kyosan CTS is an internal web app for 京都産業大学キャンパスツアースタッフ (Kyoto Sangyo University Campus Tour Staff). Four features: a staff quiz game (ぷらっとテスト / "puratto"), an admin dashboard (Google OAuth), department-assignment announcements with reveal animations, and member management. UI text is Japanese.

## Commands

```bash
pnpm dev               # dev server (Turbopack)
pnpm build             # production build
pnpm typecheck         # tsc --noEmit
pnpm check             # biome check --write (lint + format + organize imports)
pnpm lint              # biome lint only
pnpm test:unit         # vitest (watch); append `run` for single pass
pnpm test:unit run tests/lib/utils.spec.ts   # run one unit test file
pnpm test:e2e          # playwright (builds + starts prod server on :3001)
pnpm test:e2e <file>   # run one E2E spec
```

DB (drizzle-kit, reads `.env.local`):

```bash
pnpm db:generate   # generate migration from schema changes
pnpm db:migrate    # apply migrations
pnpm db:studio
pnpm db:backup     # encrypted dump via scripts/backup-db.ts (XChaCha20-Poly1305)
```

Local dev requires Postgres via `docker compose up -d`: dev DB on `:5432`, ephemeral test DB on `:5433`. Create `.env.local` (see `lib/env.ts` for required vars).

Git hooks (husky): **pre-commit** runs lint + typecheck + `test:unit run`; **pre-push** additionally runs `build` and `test:e2e`.

## Architecture

**Type-safe RPC stack.** API runs on Hono, not Next.js route handlers. All routes mount under one catch-all (`app/api/[[...route]]/route.ts` → `server/api/app.ts`). The Hono app's chained route type is exported as `AppType`, and `lib/api-client.ts` wraps it with `hc<AppType>` so the client (`api.quizzes.$get(...)`) is fully typed end-to-end. **When adding/changing a route, keep the `.route(...)` chain in `app.ts` intact** — breaking the chain drops types from the client.

Request flow: React component → TanStack Query hook (`features/*/hooks/`) → feature API fn (`features/*/api.ts`, calls `api.*`) → Hono route (`server/api/routes/`, validates with `@hono/zod-validator`) → service (`server/services/`, the only place that touches `db`). Services are marked `"server-only"`.

**Two auth layers.**
- `proxy.ts` (Next.js 16 renamed `middleware`→`proxy`) does a cheap session-cookie presence check and redirects `/admin` and `/members` to `/sign-in`. It does *not* check roles.
- Real authorization is enforced independently: Hono routes use `requireAuth` / `requireAdmin` middleware (`server/api/middleware.ts`); server components / server actions use `requireRole([...])` from `features/auth/actions.ts`.

Auth is Better-Auth (`features/auth/server.ts`) with Drizzle adapter, Google OAuth, and email+password (the latter used only for the single shared `member` account, reset via `resetMemberPassword`). Roles are `"admin" | "member" | "none"` (custom `role` field on user; defaults to `"none"`).

**Quiz type system (single source of truth).** `db/schema/quiz.ts` defines `QuizParamsByType` mapping each quiz `type` (`select` | `text` | `true_false`) to its exclusive `params` jsonb shape. `features/quizzes/types.ts` builds Zod schemas with `satisfies { [K in QuizType]: ... }` so the schemas can't drift from the DB types — change one and the other fails to compile. `Quiz` is a discriminated union on `type`, so narrowing `quiz.type` narrows `quiz.params`. Quiz play logic (judging, prompts) lives in `features/quizzes/domain.ts`. **To add a quiz type, update both files plus `domain.ts`.** Quizzes cross the RPC boundary as JSON, so API fns re-parse responses with `QuizSchema` to revive real `Date`s.

**Config system.** Typed key-value store. `features/config/definitions.ts` declares each config key with a Zod schema + default. `server/services/config.ts` reads/writes the `config` table (jsonb), always falling back to the default if a row is missing or fails validation, and uses Next.js cache tags (`revalidateTag("config")`) for invalidation. Add a key only in `definitions.ts`.

**Directory layers:**
- `app/` — App Router. Route groups: `(public)`, `admin`, `members`. Colocated UI in `_components/`.
- `features/<domain>/` — domain modules (`auth`, `config`, `quizzes`, `students`, `departments`): `types.ts`, `api.ts` (client RPC fns), `hooks/` (TanStack Query), `components/`, `domain.ts`/`editor.ts` (pure logic).
- `server/api/` — Hono routes + middleware; `server/services/` — DB access layer.
- `db/` — Drizzle: `schema/` (split per domain, re-exported from `schema/index.ts`), `migrations/`. `db/index.ts` exports the `db` client.
- `lib/` — `env.ts` (`@t3-oss/env-nextjs`, validate new env vars here), `api-client.ts`, `utils.ts`.

## Conventions

- Biome (not ESLint/Prettier): 2-space indent, 120 cols, double quotes, trailing commas, semicolons. Run `pnpm check` before committing. a11y rules are off; Tailwind classes auto-sorted in `clsx`/`cva`/`cn`/`tw`.
- Path alias `@/*` → repo root.
- Env access goes through `lib/env.ts`'s `env` object, never raw `process.env` (except the test-only `PLAYWRIGHT_TEST` guard).
- Validation schemas are Zod 4.

## Testing

- **Unit** (Vitest, jsdom): only `tests/**/*.{test,spec}.ts`.
- **E2E** (Playwright): specs in `playwright/`, runs serially (1 worker) against a prod build on `:3001` using `.env.test`. The `_db` fixture resets + seeds the test DB before each test; `authedPage` logs in via `/api/auth/test-login` (a route that only responds when `PLAYWRIGHT_TEST=1`). `global-setup.ts` drops all tables and re-migrates.
