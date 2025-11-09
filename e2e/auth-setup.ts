import { test as setup } from "@playwright/test";

setup("authenticate", async ({ page }) => {
  const res = await page.goto("/api/auth/test-login");

  if (res?.status() !== 200) {
    throw new Error(`Failed to log in, status: ${res?.status()}`);
  }

  await page.context().storageState({
    path: "playwright/.auth/user.json",
  });
});
