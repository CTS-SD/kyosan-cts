import { auth } from "@/features/auth/server";
import { env } from "@/lib/env";

/**
 * Test-only programmatic sign-in used by the Playwright fixtures.
 * Only responds when PLAYWRIGHT_TEST=1, so it is inert in real deployments.
 *
 * `?role=admin` (default) signs in the seeded admin user (TEST_USER_EMAIL);
 * `?role=member` signs in the seeded shared member account (NEXT_PUBLIC_MEMBER_EMAIL).
 * Both seeded accounts share TEST_USER_PASSWORD (see playwright/helpers/db.ts).
 */
export async function GET(req: Request) {
  if (process.env.PLAYWRIGHT_TEST !== "1") {
    return new Response("Not found", { status: 404 });
  }

  if (!env.TEST_USER_EMAIL || !env.TEST_USER_PASSWORD) {
    return new Response("Test user credentials are not set", { status: 500 });
  }

  const role = new URL(req.url).searchParams.get("role") ?? "admin";
  const email = role === "member" ? env.NEXT_PUBLIC_MEMBER_EMAIL : env.TEST_USER_EMAIL;

  const response = await auth.api.signInEmail({
    body: {
      email,
      password: env.TEST_USER_PASSWORD,
    },
    asResponse: true,
  });

  return response;
}
