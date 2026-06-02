import { expect, test } from "../fixtures";

test("redirects unauthenticated access to /admin to sign-in", async ({ page }) => {
  await page.goto("/admin");
  await expect(page).toHaveURL(/\/sign-in/);
});

test("redirects unauthenticated access to /members to sign-in", async ({ page }) => {
  await page.goto("/members");
  await expect(page).toHaveURL(/\/sign-in/);
});

test("blocks a member from the admin area", async ({ memberPage }) => {
  // The member holds a valid session (passes the cookie-only proxy check) but
  // the admin layout's role check must still reject them.
  await memberPage.goto("/admin");
  await expect(memberPage).toHaveURL(/\/sign-in/);
});
