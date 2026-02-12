import { expect, test } from "../fixtures";

test("should display login buttons", async ({ page }) => {
  await page.goto("/sign-in");
  await expect(page.getByRole("button", { name: "ログイン", exact: true })).toBeVisible();
  await expect(page.getByRole("button", { name: "管理者としてログイン", exact: true })).toBeVisible();
});
