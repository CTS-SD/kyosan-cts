import type { Page } from "@playwright/test";
import { test as base, expect } from "@playwright/test";
import { resetTestDb, seedTestDb } from "./helpers/db";

type Role = "admin" | "member";

export type Fixtures = {
  /** Auto fixture: a clean, freshly seeded DB before every test. */
  _db: undefined;
  /** A page signed in as the seeded admin user. */
  adminPage: Page;
  /** A page signed in as the seeded member user. */
  memberPage: Page;
};

/**
 * Authenticate the page's browser context via the test-only login route.
 * `page.request` shares the context cookie jar, so the session cookie it sets
 * is sent on subsequent `page.goto` navigations. Throws on failure rather than
 * letting an unauthenticated page silently proceed.
 */
async function loginAs(page: Page, role: Role) {
  const res = await page.request.get(`/api/auth/test-login?role=${role}`);
  if (!res.ok()) {
    throw new Error(`test-login failed for role=${role}: ${res.status()} ${await res.text()}`);
  }
}

export const test = base.extend<Fixtures>({
  _db: [
    // biome-ignore lint/correctness/noEmptyPattern: Playwright fixtures require the destructured-arg form even when no dependencies are used.
    async ({}, use) => {
      await resetTestDb();
      await seedTestDb();
      await use(undefined);
    },
    { auto: true },
  ],

  adminPage: async ({ page }, use) => {
    await loginAs(page, "admin");
    await use(page);
  },

  memberPage: async ({ page }, use) => {
    await loginAs(page, "member");
    await use(page);
  },
});

export { expect };
