# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Internal web app for Kyoto Sangyo University Campus Tour Staff (CTS). Features include:
- **Puratto Test** - Quiz game for staff to test their university knowledge
- **Admin Dashboard** - Google OAuth login for admins to manage quiz content
- **Department Announcements** - Staff placement/department reveal for new members
- **Member Directory** - Manage staff displayed in department announcements

## Commands

- `pnpm dev --turbopack` - Start dev server
- `pnpm build` - Production build
- `pnpm typecheck` - Run TypeScript type checking (**run after making changes**)
- `pnpm lint` - Lint and auto-fix with Biome
- `pnpm format` - Format with Biome
- `pnpm check` - Lint + format with Biome (combined)
- `pnpm test:unit` - Run unit tests (Vitest, watch mode)
- `pnpm test:unit run` - Run unit tests once
- `pnpm test:e2e` - Run E2E tests (Playwright)

## Tech Stack

- **Framework**: Next.js 16 (App Router, React 19, Turbopack)
- **Language**: TypeScript 5.9 (strict mode)
- **Database**: PostgreSQL 17 via Drizzle ORM
- **Auth**: Better-Auth (Google OAuth)
- **Styling**: Tailwind CSS 4 + Shadcn/ui + Radix UI
- **Forms**: React Hook Form + Zod 4
- **State**: Zustand (client), TanStack React Query (server), nuqs (URL state)
- **Linting**: Biome (not ESLint/Prettier)
- **Testing**: Vitest (unit), Playwright (E2E)

## Architecture

### Directory Structure (root-level, no `src/`)

```
app/                    # Next.js App Router
  (public)/             # Public routes (home, sign-in, puratto quiz play)
  admin/                # Protected admin routes (quiz CRUD, settings, dept management)
  members/              # Protected member directory
  api/auth/             # Better-Auth API routes
  middleware.ts         # Auth protection for /admin, /members

components/             # React components
hooks/                  # React hooks (query/ = TanStack Query hooks)
lib/                    # Core business logic
  auth/                 # Better-Auth setup (client.ts, server.ts)
  db/                   # Drizzle ORM (schema/, migrations/, index.ts)
  quiz/                 # Quiz module (clean architecture - see below)
  config/               # App configuration (definitions, actions)
  env.ts                # Environment variable validation (envalid)
```

### Key Patterns

- **Imports**: Use `@/` alias (maps to project root). 
- **`cn()`** utility (`lib/utils.ts`) for Tailwind class merging

### Database

- Docker Compose provides dev DB (port 5432) and ephemeral test DB (port 5433)
- Schema defined in `lib/db/schema/`
- Quiz tables use discriminated union pattern: base `QuizTable` + type-specific tables with foreign keys

## Keep Updated

Keep this CLAUDE.md updated at all times.
