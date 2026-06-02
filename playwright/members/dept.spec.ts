import { expect, test } from "../fixtures";
import { setTestConfig } from "../helpers/db";

// The member-facing department pages are gated behind the "published" flag,
// which the layouts read uncached — so a direct DB write takes effect at once.
test.beforeEach(async () => {
  await setTestConfig("departmentAnnouncementsPublished", true);
});

test("shows the department lookup form", async ({ memberPage }) => {
  await memberPage.goto("/members/dept");

  await expect(memberPage.getByText("あなたの学籍番号")).toBeVisible();
  await expect(memberPage.getByRole("button", { name: "配属部署を確認" })).toBeVisible();
});

test("looks up a student and reveals their department", async ({ memberPage }) => {
  await memberPage.goto("/members/dept");

  // 100009 = first seeded student (田中太郎 / 総務部署), a checksum-valid number.
  await memberPage.locator("input").first().pressSequentially("100009");
  await memberPage.getByRole("button", { name: "配属部署を確認" }).click();

  await expect(memberPage).toHaveURL(/\/members\/dept\/100009/);
  await expect(memberPage.getByText("田中太郎")).toBeVisible();
  await expect(memberPage.getByText("総務部署")).toBeVisible();
});

test("shows the department roster", async ({ memberPage }) => {
  await memberPage.goto("/members/dept/list");

  await expect(memberPage.getByRole("heading", { name: "総務部署" })).toBeVisible();
});
