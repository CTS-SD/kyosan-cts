import { test as setup } from "@playwright/test";

setup("authenticate", async ({ page }) => {
  await page.goto("/api/auth/test-login");
  await page.context().storageState({
    path: "playwright/.auth/user.json",
  });
});
