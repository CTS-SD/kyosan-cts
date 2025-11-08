import test, { expect } from "@playwright/test";

test("should display sign-in heading", async ({ page }) => {
  await page.goto("/sign-in");
  await expect(page.getByRole("heading", { name: "ログイン" })).toBeVisible();
});

test("should display login buttons", async ({ page }) => {
  await page.goto("/sign-in");
  await expect(
    page.getByRole("button", { name: "スタッフとしてログイン" }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "管理者としてログイン" }),
  ).toBeVisible();
});
