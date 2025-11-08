import test from "@playwright/test";

test("should navigate to new quiz page", async ({ page }) => {
  await page.goto("/admin/puratto");
  const newButton = page.locator("a", { hasText: "新規作成" });
  await test.expect(newButton).toBeVisible();
  await newButton.click();
  await test.expect(page.locator("h1", { hasText: "問題作成" })).toBeVisible();
});

test("should navigate to quiz page", async ({ page }) => {
  await page.goto("/admin/puratto");

  const quizLink = page.locator("[data-testid=quiz-item]").first();
  await test.expect(quizLink).toBeVisible();
  await quizLink.click();
  await test.expect(page).toHaveURL(/\/admin\/puratto\/q\/\d+/);
});
