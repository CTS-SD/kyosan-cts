import { Page } from "@playwright/test";
import { expect, test } from "../fixtures";

type StudentData = {
  name: string;
  studentNumber: string;
  faculty: string;
  department: string;
};

const studentFormSelectors = {
  nameInput: 'input[name="name"]',
  studentNumberInput: 'input[name="studentNumber"]',
  facultyDropdown: 'label:has-text("学部") + button',
  departmentDropdown: 'label:has-text("配属部署") + button',
  dropdownItem: '[role="option"]',
  submitButton: 'button[type="submit"]',
};

async function createStudent(page: Page, data: StudentData) {
  const s = studentFormSelectors;
  await page.locator("button", { hasText: "学生を追加" }).click();

  await page.fill(s.nameInput, data.name);

  await page.fill(s.studentNumberInput, data.studentNumber);

  await page.locator(s.facultyDropdown).click();
  await page.locator(s.dropdownItem, { hasText: data.faculty }).click();

  await page.locator(s.departmentDropdown).click();
  await page.locator(s.dropdownItem, { hasText: data.department }).click();

  await page.click(s.submitButton);
  await expect(page.locator("text=学生を追加しました")).toBeVisible();
  await page.locator("button", { hasText: "キャンセル" }).click();
}

test("should add new student", async ({ authedPage: page }) => {
  await page.goto("/admin/dept");
  await createStudent(page, {
    name: "田中 太郎",
    studentNumber: "111999",
    faculty: "文化学部",
    department: "総務部署",
  });
});

test("should edit student", async ({ authedPage: page }) => {
  const student = {
    name: "佐藤 花子",
    studentNumber: "112998",
    faculty: "経済学部",
    department: "広報部署",
  } satisfies StudentData;

  await page.goto("/admin/dept");
  await createStudent(page, student);
  await page.locator("button", { hasText: student.name }).click();

  const s = studentFormSelectors;
  await page.fill(s.nameInput, "佐藤 太郎");
  await page.fill(s.studentNumberInput, "113997");
  await page.locator(s.submitButton).click();

  await expect(page.locator("text=学生を更新しました")).toBeVisible();
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
  await createStudent(page, student);

  await page.locator("button", { hasText: student.name }).click();
  await page.locator("button", { hasText: "削除" }).click();
  await expect(page.locator("text=学生を削除しました")).toBeVisible();
});
