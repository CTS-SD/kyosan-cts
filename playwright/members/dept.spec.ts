import { expect, test } from "../fixtures";

test("members dept page", async ({ authedPage: page }) => {
  await page.goto("/members/dept");
  await expect(
    page.locator("label", {
      hasText: "あなたの学籍番号",
    }),
  ).toBeVisible();
  await expect(page.locator("input")).toBeVisible();
  await expect(
    page.locator("button", {
      hasText: "配属部署を確認",
    }),
  ).toBeVisible();
});

test("members dept list page", async ({ authedPage: page }) => {
  await page.goto("/members/dept/list");
  await expect(page.locator("h2", { hasText: "総務部署" })).toBeVisible();
});
