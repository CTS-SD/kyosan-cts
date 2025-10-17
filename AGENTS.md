# Repository Guidelines

## Project Structure & Module Organization
- `src/app` is the Next.js App Router entry, with route groups such as `admin`, `members`, and server actions under `api`.
- Shared UI and logic live in `src/components`, `src/hooks`, `src/lib`, `src/providers`, and `src/stores`. Import using the `@/...` alias defined in `tsconfig.json`.
- Static assets sit in `public`, while database schema work is coordinated through `drizzle.config.ts` and `src/lib/db`.

## Build, Test, and Development Commands
- `pnpm install` — sync dependencies; run once per environment or lockfile change.
- `pnpm dev` — run Next.js with Turbopack for local iterative work.
- `pnpm build` / `pnpm start` — create a production bundle and serve it locally.
- `pnpm lint` — run ESLint with the project config; treat warnings as blockers.
- `pnpm format` — apply Prettier + Tailwind plugin ordering across the workspace.
- `pnpm db:generate`, `pnpm db:migrate`, `pnpm db:push` — manage Drizzle migrations against the Neon/Postgres setup.

## Coding Style & Naming Conventions
- Follow Prettier defaults (2-space indent, double quotes in JSON) and the Tailwind plugin for class ordering; never commit manual diffs that fight `pnpm format`.
- Keep React components in PascalCase exports, collocated in kebab-case files (e.g., `quiz-results-view.tsx`). Hooks stay in `src/hooks` and use the `useFoo` naming.
- Shared utilities belong in `src/lib`; avoid relative `../../` chains by relying on the `@/...` alias.

## Testing Guidelines
- No dedicated runner is configured yet; when adding one, prefer Vitest + Testing Library and mirror specs beside the code as `*.test.tsx`.
- Until automation lands, gate pull requests with `pnpm lint`, smoke the affected routes via `pnpm dev`, and include DB migration dry-runs with `pnpm db:generate` when schema changes.

## Commit & Pull Request Guidelines
- Match the existing terse, imperative commits (`fix import paths`, `refactor quiz lib`); scope each change narrowly and avoid multi-topic commits.
- PRs must include: summary of the change, screenshots or screen recordings for UI updates, linked issue numbers, migration steps, and any env var adjustments (reference `src/lib/env.ts`).

## Security & Configuration Tips
- Maintain `.env.local` in sync with `src/lib/env.ts`; all four variables (`BETTER_AUTH_SECRET`, etc.) are required at runtime.
- Never commit secrets or generated Drizzle SQL; update onboarding steps when credentials rotate and document Neon connection expectations in your PR.
