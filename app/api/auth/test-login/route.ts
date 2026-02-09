import { auth } from "../../../../lib/auth/server";
import { env } from "../../../../lib/env";

export async function GET() {
  console.log("######## PLAYWRIGHT_TEST: ", process.env.PLAYWRIGHT_TEST);

  if (process.env.PLAYWRIGHT_TEST !== "1") {
    return new Response("Not found", { status: 404 });
  }

  const response = await auth.api.signInEmail({
    body: {
      email: env.TEST_USER_EMAIL,
      password: env.TEST_USER_PASSWORD,
    },
    asResponse: true,
  });

  return response;
}
