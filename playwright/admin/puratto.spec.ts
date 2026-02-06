import type { Page } from "@playwright/test";
import { expect, test } from "../fixtures";

const defaultQuiz = {
  question: "次のうち、果物はどれですか？",
  correctChoicesText: "りんご",
  incorrectChoicesText: "にんじん\nじゃがいも\nピーマン",
};

async function createQuiz(page: Page) {
  const quiz = { ...defaultQuiz };

  await page.goto("/admin/puratto/q/new");
  await page.fill("[data-testid=question-textarea]", quiz.question);
  await page.fill("textarea[name=correctChoicesText]", quiz.correctChoicesText);
  await page.fill("textarea[name=incorrectChoicesText]", quiz.incorrectChoicesText);
  await page.click("button[type=submit]");

  await expect(page.locator("text=問題を作成しました")).toBeVisible();
  await expect(page).toHaveURL(/\/admin\/puratto\/q\/\d+/);

  return quiz;
}

test("should navigate to quiz page", async ({ authedPage }) => {
  await authedPage.goto("/admin/puratto");

  await authedPage.locator("[data-testid=quiz-item]").first().click();
  await test.expect(authedPage).toHaveURL(/\/admin\/puratto\/q\/\d+/);
});

test("should navigate to new quiz page", async ({ authedPage }) => {
  await authedPage.goto("/admin/puratto");
  const newButton = authedPage.locator("a", { hasText: "新規作成" });
  await test.expect(newButton).toBeVisible();
  await newButton.click();
  await test.expect(authedPage.locator("h1", { hasText: "問題作成" })).toBeVisible();
});

test.describe("quiz management", () => {
  test("should create quiz", async ({ authedPage: page }) => {
    await createQuiz(page);
  });

  test("should edit quiz", async ({ authedPage: page }) => {
    await createQuiz(page);

    const updatedQuestion = "次のうち、野菜はどれですか？";
    await page.fill("[data-testid=question-textarea]", updatedQuestion);
    await page.click("button[type=submit]");
    await expect(page.locator("text=問題を保存しました")).toBeVisible();
  });

  test("should delete quiz", async ({ authedPage: page }) => {
    await createQuiz(page);

    page.on("dialog", async (dialog) => {
      await dialog.accept();
    });

    await page.getByLabel("問題メニュー").click();
    await page.getByRole("menuitem", { name: "削除" }).click();
    await expect(page.locator("text=問題を削除しました")).toBeVisible();
    await expect(page).toHaveURL("/admin/puratto");
  });
});
