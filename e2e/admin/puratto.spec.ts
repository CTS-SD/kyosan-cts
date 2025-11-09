import type { Page } from "@playwright/test";
import { expect, test } from "../fixtures";

type QuizForm = {
  question: string;
  correctChoicesText: string;
  incorrectChoicesText: string;
};

const defaultQuiz: QuizForm = {
  question: "次のうち、果物はどれですか？",
  correctChoicesText: "りんご",
  incorrectChoicesText: "にんじん\nじゃがいも\nピーマン",
};

const newQuizUrl = "/admin/puratto/q/new";

async function createQuiz(
  page: Page,
  overrides: Partial<QuizForm> = {},
): Promise<QuizForm> {
  const quiz = { ...defaultQuiz, ...overrides } satisfies QuizForm;

  await page.goto(newQuizUrl);
  await page.fill("textarea[name=question]", quiz.question);
  await page.fill("textarea[name=correctChoicesText]", quiz.correctChoicesText);
  await page.fill(
    "textarea[name=incorrectChoicesText]",
    quiz.incorrectChoicesText,
  );
  await page.click("button[type=submit]");
  await expect(page.locator("text=問題を作成しました")).toBeVisible();
  await expect(page).toHaveURL(/\/admin\/puratto\/q\/\d+/);

  return quiz;
}

test("should navigate to quiz page", async ({ authedPage }) => {
  await authedPage.goto("/admin/puratto");

  const quizLink = authedPage.locator("[data-testid=quiz-item]").first();
  await test.expect(quizLink).toBeVisible();
  await quizLink.click();
  await test.expect(authedPage).toHaveURL(/\/admin\/puratto\/q\/\d+/);
});

test("should navigate to new quiz page", async ({ authedPage }) => {
  await authedPage.goto("/admin/puratto");
  const newButton = authedPage.locator("a", { hasText: "新規作成" });
  await test.expect(newButton).toBeVisible();
  await newButton.click();
  await test
    .expect(authedPage.locator("h1", { hasText: "問題作成" }))
    .toBeVisible();
});

test.describe("quiz management", () => {
  test("should create quiz", async ({ authedPage: page }) => {
    const quiz = await createQuiz(page, {
      question: "次のうち、海に住む生き物はどれですか？",
      correctChoicesText: "イルカ",
      incorrectChoicesText: "スズメ\nネズミ\nハト",
    });

    await expect(page.locator("textarea[name=question]")).toHaveValue(
      quiz.question,
    );
  });

  test("should edit quiz", async ({ authedPage: page }) => {
    await createQuiz(page);

    const updatedQuestion = "次のうち、野菜はどれですか？";
    await page.fill("textarea[name=question]", updatedQuestion);
    await page.click("button[type=submit]");
    await expect(page.locator("text=問題を保存しました")).toBeVisible();
    await expect(page.locator("textarea[name=question]")).toHaveValue(
      updatedQuestion,
    );
  });

  test("should delete quiz", async ({ authedPage: page }) => {
    await createQuiz(page);

    page.on("dialog", async (dialog) => {
      await dialog.accept();
    });

    await page.locator("button[aria-label='問題メニュー']").click();
    await page
      .locator("[role='menuitem']", {
        hasText: "削除",
      })
      .click();
    await expect(page.locator("text=問題を削除しました")).toBeVisible();
    await expect(page).toHaveURL("/admin/puratto");
  });
});
