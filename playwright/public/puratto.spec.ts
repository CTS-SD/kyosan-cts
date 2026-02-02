import { expect, test } from "../fixtures";

test("should navigate to puratto-test page", async ({ page }) => {
  await page.goto("/puratto");
  await expect(page.getByRole("heading", { name: "ぷらっとテスト" })).toBeVisible();
});
