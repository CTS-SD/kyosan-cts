import { test, expect } from "../fixtures";

test("should navigate to puratto-test page", async ({ page }) => {
  await page.goto("/puratto");
  await expect(page.getByRole("heading", { name: "ぷらっとテスト" })).toBeVisible();
});

test("should navigate to puratto-test play page", async ({ page }) => {
  await page.goto("/puratto/play");
  await expect(page.getByRole("button", { name: "送信する" })).toBeVisible();
});
