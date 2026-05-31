import { expect, test } from "../fixtures";

test("shows the puratto landing page", async ({ page }) => {
  await page.goto("/puratto");

  await expect(page.getByRole("heading", { name: "ぷらっとテスト" })).toBeVisible();
  await expect(page.getByRole("link", { name: "今すぐスタート" })).toBeVisible();
});

test("plays a full quiz session through to the results screen", async ({ page }) => {
  await page.goto("/puratto/play");

  const results = page.getByText("正解数");
  const submit = page.getByRole("button", { name: "送信する" });
  const next = page.getByRole("button", { name: "次へ" });

  // The session length follows the seeded published-quiz pool. Answer each
  // question (correctness is irrelevant) until the results screen appears. The
  // loop only acts once the page has settled on a definite state — either a new
  // question (submit button) or the results — so it never races the inter-question
  // transition. The cap is a safety bound well above the seeded pool size.
  for (let i = 0; i < 12; i++) {
    await expect(results.or(submit).first()).toBeVisible();
    if (await results.isVisible()) break;

    // Pick an enabled choice from the live question (the outgoing question's
    // choices are disabled mid-transition, so :not([disabled]) targets it).
    await page.locator('form button[type="button"]:not([disabled])').first().click();
    await submit.click();
    await expect(next).toBeVisible();
    await next.click();
  }

  await expect(results).toBeVisible();
  await expect(page.getByText("正答率")).toBeVisible();
  await expect(page.getByRole("link", { name: "OK" })).toBeVisible();
});
