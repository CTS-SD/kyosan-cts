import type { Page } from "@playwright/test";
import { test as base, expect } from "@playwright/test";
import { resetDb } from "./helpers/reset-db";
import { seedDb } from "./helpers/seed-db";

const AUTH_LOGIN_PATH = "/api/auth/test-login";

export type Fixtures = {
  authedPage: Page;
  _db: null;
};

export const test = base.extend<Fixtures>({
  authedPage: async ({ browser }, use) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    // Authenticate test user
    const response = await page.goto(AUTH_LOGIN_PATH);
    if (response?.status() !== 200) {
      throw new Error(`Failed to authenticate test user. Status: ${response?.status()}`);
    }

    await page.goto("/");
    await use(page);
    await context.close();
  },
  _db: [
    // biome-ignore lint/correctness/noEmptyPattern:)
    async ({}, use) => {
      await resetDb();
      await seedDb();
      await use(null);
    },
    { auto: true },
  ],
});

export { expect };
