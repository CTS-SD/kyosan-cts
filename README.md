# Kyosan CTS

Kyosan CTS is a Next.js 15 application for managing campus placement announcements, member directories, and quiz-based onboarding flows.

## Quick Start
- Install dependencies with `pnpm install`.
- Launch the local dev server with `pnpm dev` (Turbopack enabled).
- Build for production using `pnpm build` followed by `pnpm start`.

## Environment
Copy `.env.example` (if available) or create `.env.local` and supply the required values listed in `src/lib/env.ts`:
```
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

## Tooling
- Framework: Next.js (App Router) with React 19 and Tailwind CSS.
- Database: Drizzle ORM targeting Neon/Postgres (`drizzle.config.ts`).
- Linting/formatting: ESLint 9 + Prettier (Tailwind plugin included).

## Contributing
See `AGENTS.md` for repository guidelines on structure, commands, and pull request expectations.
