# Instructions

- Use `zsh` terminal.
- Run `pnpm typecheck` to confirm there's no errors.

# Repository Guidelines

These guidelines expand on the mandatory terminal steps above and should be followed for all contributions.

## Project Structure & Module Organization

- `src/app` holds Next.js route segments; keep UI flows scoped to their route to benefit from automatic code-splitting.
- `src/components` collects reusable UI primitives; co-locate style helpers in `src/styles` when sharing Tailwind tokens.
- `src/lib`, `src/hooks`, and `src/ctx` centralize domain logic, custom hooks, and context providers respectively.
- `src/providers` wires global React providers, while `public/` stores static assets referenced via the Next Image and metadata APIs.
- Database utilities and migrations live under `script/` alongside `drizzle.config.ts`; regenerate SQL artifacts with Drizzle commands before shipping schema changes.

## Build, Test & Development Commands

- `pnpm dev` starts the Next.js 16 dev server (Turbopack) for iterative work.
- `pnpm build` and `pnpm start` build and serve the optimized production bundle; run both before merging deployment-critical changes.
- `pnpm lint` applies the ESLint configuration in `eslint.config.mjs`; fix or suppress issues inline with documented justifications.
- `pnpm typecheck` runs `tsc --noEmit`; use it pre-commit to ensure the repository stays typesafe.
- `pnpm db:generate`, `pnpm db:migrate`, and `pnpm db:push` manage Drizzle schema artifacts—commit generated files whenever schema definitions move.

## Coding Style & Naming Conventions

- Follow TypeScript + React best practices with Prettier formatting (3.6.x) and ESLint 9 rules; prefer named exports for shared modules.
- Use PascalCase for React components, camelCase for hooks/utilities, and snake_case only for database column definitions reflected in Drizzle models.
- Tailwind CSS class composition should flow from layout → typography → state modifiers; lean on `tailwind-merge` and `clsx` helpers already in place.

## Testing Guidelines

- Prioritize component-level verification with React Testing Library when introducing new complex UI; locate specs beside the component as `<name>.test.tsx`.
- Use MSW or mocked fetch utilities inside tests to isolate network behavior; snapshot test only for static markdown-rendering views.
- Always run `pnpm typecheck` and `pnpm lint` before opening a PR; add manual QA notes for flows lacking automated coverage.

## Commit & Pull Request Guidelines

- Mirror the conventional prefix style used in history (e.g., `feat:`, `refactor:`, `fix:`) and keep subject lines under 72 characters.
- Group related file changes per commit; include database migrations and generated artifacts in the same commit as the schema change.
- PRs should outline scope, testing evidence (`pnpm typecheck`, `pnpm lint`, manual checks), related issues, and UI screenshots or recordings for visible updates.

## Data & Environment Notes

- Configure required environment variables via `.env.local`; validate with `envalid` helpers stored in `src/lib` before pushing.
- For Postgres changes, coordinate connection details with the Neon serverless instance and document secrets usage in the PR description.
