import { env } from "../../lib/env";

export function assertTestEnv() {
  if (env.NODE_ENV !== "test") {
    throw new Error("Blocked: NODE_ENV is not test");
  }

  const dbUrl = new URL(env.DATABASE_URL);

  if (!["localhost", "127.0.0.1"].includes(dbUrl.hostname)) {
    throw new Error("Blocked: non-localhost database");
  }

  if (!dbUrl.pathname.endsWith("test")) {
    throw new Error("Blocked: database name is not test");
  }
}
