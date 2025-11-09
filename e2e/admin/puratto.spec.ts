import { expect, test } from "../fixtures";

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

test("should create and delete quiz", async ({ authedPage: page }) => {
  page.on("dialog", async (dialog) => {
    await dialog.accept();
  });

  await page.goto("/admin/puratto/q/new");

  // Create quiz
  await page.fill("textarea[name=question]", "次のうち、果物はどれですか？");
  await page.fill("textarea[name=correctChoicesText]", "りんご");
  await page.fill(
    "textarea[name=incorrectChoicesText]",
    "にんじん\nじゃがいも\nピーマン",
  );
  await page.click("button[type=submit]");
  await expect(page.locator("text=問題を作成しました")).toBeVisible();
  await expect(page).toHaveURL(/\/admin\/puratto\/q\/\d+/);

  // Edit quiz
  await page.fill("textarea[name=question]", "次のうち、野菜はどれですか？");
  await page.click("button[type=submit]");
  await expect(page.locator("text=問題を保存しました")).toBeVisible();

  // Delete quiz
  await page.locator("button[aria-label='問題メニュー']").click();
  await page
    .locator("[role='menuitem']", {
      hasText: "削除",
    })
    .click();
  await expect(page.locator("text=問題を削除しました")).toBeVisible();
});
