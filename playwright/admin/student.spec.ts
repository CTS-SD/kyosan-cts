import { expect, test } from "../fixtures";

// Student records are managed from the dept admin page: added via the top-level
// "学生を追加" button (sources faculties/departments from DeptRefsProvider), and
// edited/deleted by opening a student row inside its department section.

test("adds a student via the top-level button", async ({ adminPage }) => {
  await adminPage.goto("/admin/dept");

  await adminPage.getByRole("button", { name: "学生を追加" }).click();

  const dialog = adminPage.getByRole("dialog");
  await dialog.getByPlaceholder("京産 花子").fill("山田 太郎");
  // 200008 satisfies the digit-sum checksum enforced by StudentNumberSchema.
  await dialog.getByPlaceholder("123456").fill("200008");
  await dialog.getByRole("combobox", { name: "学部" }).click();
  await adminPage.getByRole("option", { name: "法学部" }).click();
  await dialog.getByRole("combobox", { name: "配属部署" }).click();
  await adminPage.getByRole("option", { name: "総務部署" }).click();
  await dialog.getByRole("button", { name: "追加", exact: true }).click();

  await expect(adminPage.getByText("学生を追加しました")).toBeVisible();

  await adminPage.keyboard.press("Escape");
  const box = adminPage.locator("section").filter({ hasText: "総務部署" });
  await expect(box.getByRole("button", { name: "山田 太郎" })).toBeVisible();
});

test("edits a student", async ({ adminPage }) => {
  await adminPage.goto("/admin/dept");

  const box = adminPage.locator("section").filter({ hasText: "レク部署" });
  await box.getByRole("button", { name: "田中太郎" }).click();

  const dialog = adminPage.getByRole("dialog");
  await dialog.getByPlaceholder("京産 花子").fill("田中 次郎");
  await dialog.getByRole("button", { name: "保存", exact: true }).click();

  await expect(adminPage.getByText("学生を更新しました")).toBeVisible();
  await adminPage.keyboard.press("Escape");
  await expect(box.getByRole("button", { name: "田中 次郎" })).toBeVisible();
});

test("deletes a student", async ({ adminPage }) => {
  await adminPage.goto("/admin/dept");

  // Deletion is confirmed via a native window.confirm.
  adminPage.on("dialog", (dialog) => dialog.accept());

  const box = adminPage.locator("section").filter({ hasText: "SD部署" });
  await box.getByRole("button", { name: "佐藤花子" }).click();

  await adminPage.getByRole("dialog").getByRole("button", { name: "削除", exact: true }).click();

  await expect(adminPage.getByText("学生を削除しました")).toBeVisible();
  await expect(box.getByRole("button", { name: "佐藤花子" })).toHaveCount(0);
});
