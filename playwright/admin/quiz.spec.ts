import type { Page } from "@playwright/test";
import { expect, test } from "../fixtures";

const sampleQuiz = {
  question: "次のうち、果物はどれですか？（テスト作成）",
  correctChoicesText: "りんご",
  incorrectChoicesText: "にんじん\nじゃがいも\nピーマン",
};

/** Create a select quiz through the editor UI and land on its edit page. */
async function createQuizViaUI(page: Page) {
  await page.goto("/admin/puratto/q/new");
  await page.getByTestId("question-textarea").fill(sampleQuiz.question);
  await page.locator('textarea[name="correctChoicesText"]').fill(sampleQuiz.correctChoicesText);
  await page.locator('textarea[name="incorrectChoicesText"]').fill(sampleQuiz.incorrectChoicesText);
  await page.getByRole("button", { name: "作成", exact: true }).click();

  await expect(page.getByText("問題を作成しました")).toBeVisible();
  await expect(page).toHaveURL(/\/admin\/puratto\/q\/\d+/);
}

test("lists the seeded quizzes", async ({ adminPage }) => {
  await adminPage.goto("/admin/puratto");

  await expect(adminPage.getByTestId("quiz-item").first()).toBeVisible();
  // Each card renders the question twice (highlight layer + markdown), so scope to first.
  await expect(adminPage.getByText("1+1は？").first()).toBeVisible();
});

test("opens a quiz from the list", async ({ adminPage }) => {
  await adminPage.goto("/admin/puratto");

  await adminPage.getByTestId("quiz-item").first().click();
  await expect(adminPage).toHaveURL(/\/admin\/puratto\/q\/\d+/);
});

test("navigates to the new-quiz page", async ({ adminPage }) => {
  await adminPage.goto("/admin/puratto");

  await adminPage.getByRole("link", { name: "新規作成" }).click();
  await expect(adminPage).toHaveURL(/\/admin\/puratto\/q\/new/);
  await expect(adminPage.getByRole("button", { name: "作成", exact: true })).toBeVisible();
});

test("creates a quiz", async ({ adminPage }) => {
  await createQuizViaUI(adminPage);
});

test("edits a quiz", async ({ adminPage }) => {
  await createQuizViaUI(adminPage);

  await adminPage.getByTestId("question-textarea").fill("次のうち、野菜はどれですか？（編集済み）");
  await adminPage.getByRole("button", { name: "保存", exact: true }).click();
  await expect(adminPage.getByText("問題を保存しました")).toBeVisible();
});

test("deletes a quiz", async ({ adminPage }) => {
  await createQuizViaUI(adminPage);

  adminPage.on("dialog", (dialog) => dialog.accept());
  await adminPage.getByRole("button", { name: "問題メニュー" }).click();
  await adminPage.getByRole("menuitem", { name: "削除" }).click();

  await expect(adminPage.getByText("問題を削除しました")).toBeVisible();
  await expect(adminPage).toHaveURL(/\/admin\/puratto$/);
});

test("filters the list by search term", async ({ adminPage }) => {
  await adminPage.goto("/admin/puratto");

  await adminPage.getByPlaceholder("問題を検索...").fill("果物");
  await expect(adminPage.getByText("次のうち、果物はどれですか？").first()).toBeVisible();
  await expect(adminPage.getByText("1+1は？")).toHaveCount(0);
});

test("filters the list by draft status", async ({ adminPage }) => {
  await adminPage.goto("/admin/puratto");

  await adminPage.getByRole("button", { name: "フィルター" }).click();
  await adminPage.getByRole("menuitemradio", { name: "下書き" }).click();

  await expect(adminPage.getByText("下書きのクイズ").first()).toBeVisible();
  await expect(adminPage.getByText("1+1は？")).toHaveCount(0);
});
