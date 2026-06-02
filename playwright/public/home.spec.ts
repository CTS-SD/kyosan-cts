import { expect, test } from "../fixtures";

test("renders the landing page with the puratto entry", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "#キャンスタ" })).toBeVisible();
  await expect(page.getByRole("link", { name: "ぷらっとテスト" })).toBeVisible();
});

test("hides the department announcement link while unpublished", async ({ page }) => {
  await page.goto("/");

  // Default config has announcements unpublished, so the link must be absent.
  await expect(page.getByRole("link", { name: "配属発表" })).toHaveCount(0);
});
