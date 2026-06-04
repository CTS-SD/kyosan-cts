import type { Page } from "@playwright/test";
import { expect, test } from "../fixtures";

// Faculty management lives behind the dept admin "管理メニュー" → "学部を管理"
// dialog, which renders FacultyList with per-faculty student counts.
async function openFacultyManager(page: Page) {
  await page.goto("/admin/dept");
  await page.getByRole("button", { name: "管理メニュー" }).click();
  await page.getByRole("menuitem", { name: "学部を管理" }).click();
  return page.getByRole("dialog");
}

test("adds a faculty", async ({ adminPage }) => {
  const dialog = await openFacultyManager(adminPage);

  await dialog.getByRole("button", { name: "学部を追加" }).click();
  await dialog.getByPlaceholder("〇〇学部").fill("テスト学部");
  await dialog.getByRole("button", { name: "追加", exact: true }).click();

  await expect(adminPage.getByText("学部を追加しました")).toBeVisible();
  await expect(dialog.getByText("テスト学部")).toBeVisible();
});

test("edits a faculty", async ({ adminPage }) => {
  const dialog = await openFacultyManager(adminPage);

  await dialog.getByRole("button", { name: "理学部 を編集" }).click();
  await dialog.getByPlaceholder("〇〇学部").fill("理学部（編集済み）");
  await dialog.getByRole("button", { name: "保存", exact: true }).click();

  await expect(adminPage.getByText("学部を更新しました")).toBeVisible();
  await expect(dialog.getByText("理学部（編集済み）")).toBeVisible();
});

test("deletes a faculty with no students", async ({ adminPage }) => {
  // 理学部 has no seeded students, so deletion needs no cascade warning.
  const dialog = await openFacultyManager(adminPage);

  await dialog.getByRole("button", { name: "理学部 を削除" }).click();
  await adminPage.getByRole("button", { name: "削除する" }).click();

  await expect(adminPage.getByText("学部を削除しました")).toBeVisible();
  await expect(dialog.getByText("理学部", { exact: true })).toHaveCount(0);
});
