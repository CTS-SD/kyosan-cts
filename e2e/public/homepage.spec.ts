import { test, expect } from "../fixtures";

test("homepage", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      name: "キャンスタ",
    }),
  ).toBeVisible();

  await expect(page.locator("a[href='/puratto']")).toBeVisible();
});
