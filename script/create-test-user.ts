import { auth } from "@/lib/auth";

await auth.api.signUpEmail({
  body: {
    name: "Test User",
    email: process.env.TEST_USER_EMAIL!,
    password: process.env.TEST_USER_PASSWORD!,
  },
});
