import { test as base, expect } from "@playwright/test";
import type { Page } from "@playwright/test";

const AUTH_LOGIN_PATH = "/api/auth/test-login";

export type Fixtures = {
  authedPage: Page;
};

export const test = base.extend<Fixtures>({
  authedPage: async ({ browser }, _use) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    const response = await page.goto(AUTH_LOGIN_PATH);
    if (response?.status() !== 200) {
      throw new Error(
        `Failed to authenticate test user. Status: ${response?.status()}`,
      );
    }

    await page.goto("/");
    await _use(page);
    await context.close();
  },
});

export { expect };
