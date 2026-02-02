import { config } from "dotenv";
import { cleanEnv, str, url } from "envalid";

config();

export const env = cleanEnv(process.env, {
  NODE_ENV: str(),

  DATABASE_URL: str(),

  BETTER_AUTH_SECRET: str(),
  BETTER_AUTH_URL: url(),

  GOOGLE_CLIENT_ID: str(),
  GOOGLE_CLIENT_SECRET: str(),

  TEST_USER_EMAIL: str({ default: "" }),
  TEST_USER_PASSWORD: str({ default: "" }),
});
