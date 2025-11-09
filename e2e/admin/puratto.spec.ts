import { test } from "../fixtures";

test("should navigate to new quiz page", async ({ authedPage }) => {
  await authedPage.goto("/admin/puratto");
  const newButton = authedPage.locator("a", { hasText: "新規作成" });
  await test.expect(newButton).toBeVisible();
  await newButton.click();
  await test
    .expect(authedPage.locator("h1", { hasText: "問題作成" }))
    .toBeVisible();
});

test("should navigate to quiz page", async ({ authedPage }) => {
  await authedPage.goto("/admin/puratto");

  const quizLink = authedPage.locator("[data-testid=quiz-item]").first();
  await test.expect(quizLink).toBeVisible();
  await quizLink.click();
  await test.expect(authedPage).toHaveURL(/\/admin\/puratto\/q\/\d+/);
});
