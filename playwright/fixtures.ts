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
  _db: [
    async ({ baseURL: _ }, use) => {
      await resetDb();
      await seedDb();
      await use(null);
    },
    { auto: true },
  ],

  authedPage: async ({ browser, _db: _ }, use) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    try {
      const response = await page.goto(AUTH_LOGIN_PATH);
      if (!response) throw new Error("Failed to authenticate: no response");
      if (response.status() !== 200) {
        throw new Error(`Failed to authenticate test user. Status: ${response.status()}`);
      }

      await page.goto("/");
      await use(page);
    } catch (e) {
      console.error("Error in authedPage fixture:", e);
    } finally {
      await context.close();
    }
  },
});

export { expect };
