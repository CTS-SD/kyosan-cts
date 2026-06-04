import { expect, test } from "../fixtures";
import { setTestConfig } from "../helpers/db";

// The staff login form signs in the shared member account using the password
// seeded as TEST_USER_PASSWORD (see playwright/helpers/db.ts). The email is
// filled from NEXT_PUBLIC_MEMBER_EMAIL by the form itself, so the test only
// types the password.
const MEMBER_PASSWORD = process.env.TEST_USER_PASSWORD ?? "";

test.describe("staff sign-in", () => {
  test("signs in and reaches the members area when announcements are published", async ({ page }) => {
    await setTestConfig("departmentAnnouncementsPublished", true);

    await page.goto("/sign-in");
    await page.getByPlaceholder("パスワード").fill(MEMBER_PASSWORD);
    await page.getByRole("button", { name: "ログイン", exact: true }).click();

    await expect(page).toHaveURL(/\/members\/dept/);
    await expect(page.getByText("あなたの学籍番号")).toBeVisible();
  });

  test("is sent back to sign-in when announcements are unpublished", async ({ page }) => {
    // departmentAnnouncementsPublished defaults to false, so members.layout only
    // authorizes admins — a correctly authenticated member is redirected back.
    await page.goto("/sign-in");
    await page.getByPlaceholder("パスワード").fill(MEMBER_PASSWORD);
    await page.getByRole("button", { name: "ログイン", exact: true }).click();

    await expect(page).toHaveURL(/\/sign-in/);
    // The session is established even though /members access is denied: the
    // sign-in page now shows the "logged in as …" notice.
    await expect(page.getByText("としてログインしています")).toBeVisible();
  });
});
