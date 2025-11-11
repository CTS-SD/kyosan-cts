import { Page } from "@playwright/test";
import { expect, test } from "../fixtures";

type StudentData = {
  name: string;
  studentNumber: string;
  faculty: string;
  department: string;
};

async function addStudent(page: Page, student: StudentData) {
  await page.locator("button", { hasText: "学生を追加" }).click();
  await page.locator("input[name='name']").fill(student.name);
  await page.locator("input[name='studentNumber']").fill(student.studentNumber);
  await page.getByRole("combobox").filter({ hasText: "学部を選択" }).click();
  await page.getByRole("option", { name: student.faculty }).click();
  await page.getByRole("combobox").filter({ hasText: "部署を選択" }).click();
  await page.getByRole("option", { name: student.department }).click();
  await page.getByRole("button", { name: "追加" }).click();
  await page.getByRole("button", { name: "キャンセル" }).click();
}

test("should add new student", async ({ authedPage: page }) => {
  await page.goto("/admin/dept");

  await addStudent(page, {
    name: "山田 太郎",
    studentNumber: "111999",
    faculty: "経済学部",
    department: "総務部署",
  });

  await expect(page.getByText("学生を追加しました")).toBeVisible();
});

test("should edit student", async ({ authedPage: page }) => {
  const student = {
    name: "橋本 花子",
    studentNumber: "112998",
    faculty: "文化学部",
    department: "レク部署",
  } satisfies StudentData;

  await page.goto("/admin/dept");
  await addStudent(page, student);

  await page.locator("button", { hasText: student.name }).click();
  await page.locator("input[name='name']").fill("橋本 光子");
  await page.locator("input[name='studentNumber']").fill("113997");
  await page.locator("button[type='submit']").click();

  await expect(page.getByText("学生を更新しました")).toBeVisible();
});

test("should delete student", async ({ authedPage: page }) => {
  const student = {
    name: "鈴木 次郎",
    studentNumber: "114996",
    faculty: "法学部",
    department: "レク部署",
  } satisfies StudentData;

  page.on("dialog", async (dialog) => {
    await dialog.accept();
  });

  await page.goto("/admin/dept");
  await addStudent(page, student);

  await page.locator("button", { hasText: student.name }).click();
  await page.getByRole("button", { name: "削除" }).click();

  await expect(page.getByText("学生を削除しました")).toBeVisible();
});
