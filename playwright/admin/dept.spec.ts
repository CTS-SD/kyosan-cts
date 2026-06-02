import { expect, test } from "../fixtures";

test("lists the seeded departments", async ({ adminPage }) => {
  await adminPage.goto("/admin/dept");

  await expect(adminPage.getByRole("heading", { name: "総務部署" })).toBeVisible();
});

test("creates a department", async ({ adminPage }) => {
  await adminPage.goto("/admin/dept");

  await adminPage.getByRole("button", { name: "部署を追加" }).click();
  await adminPage.getByPlaceholder("総務部署").fill("テスト部署");
  await adminPage.getByRole("button", { name: "追加", exact: true }).click();

  await expect(adminPage.getByText("部署を追加しました")).toBeVisible();
  await expect(adminPage.getByRole("heading", { name: "テスト部署" })).toBeVisible();
});

test("edits a department", async ({ adminPage }) => {
  await adminPage.goto("/admin/dept");

  const box = adminPage.locator("section").filter({ hasText: "開発部署" });
  await box.getByRole("button", { name: "部署メニュー" }).click();
  await adminPage.getByRole("menuitem", { name: "編集" }).click();

  await adminPage.getByPlaceholder("総務部署").fill("開発部署（編集済み）");
  await adminPage.getByRole("button", { name: "変更を保存" }).click();

  await expect(adminPage.getByText("部署を更新しました")).toBeVisible();
  await expect(adminPage.getByRole("heading", { name: "開発部署（編集済み）" })).toBeVisible();
});

test("warns that belonging students are deleted, then deletes the department", async ({ adminPage }) => {
  await adminPage.goto("/admin/dept");

  // Each seeded department has 2 students.
  const box = adminPage.locator("section").filter({ hasText: "広報部署" });
  await box.getByRole("button", { name: "部署メニュー" }).click();
  await adminPage.getByRole("menuitem", { name: "削除" }).click();

  await expect(adminPage.getByText("所属する学生2名も全て削除されます")).toBeVisible();
  await adminPage.getByRole("button", { name: "削除する" }).click();

  await expect(adminPage.getByText("部署を削除しました")).toBeVisible();
  await expect(adminPage.getByRole("heading", { name: "広報部署" })).toHaveCount(0);
});
