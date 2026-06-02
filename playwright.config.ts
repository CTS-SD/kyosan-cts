import path from "node:path";
import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";

// Load test env (DB on :5433, test secrets) for the Playwright runner process.
dotenv.config({ path: path.resolve(__dirname, ".env.test") });

const PORT = Number(process.env.TEST_PORT ?? 3001);
const BASE_URL = `http://localhost:${PORT}`;

// Ensure the runner process and the web server both run in test mode.
process.env.PLAYWRIGHT_TEST = "1";

export default defineConfig({
  testDir: "./playwright",
  // Per-test DB reset against a single shared test DB → run serially so every
  // test is fully isolated and reproducible.
  fullyParallel: false,
  workers: 1,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: [["list"], ["html", { open: "never" }]],
  timeout: 30_000,
  expect: { timeout: 10_000 },
  use: {
    baseURL: BASE_URL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "off",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      // Public + member flows on a phone viewport (staff use the app on mobile).
      // Admin tooling is desktop-only, so it is excluded here.
      name: "mobile-chrome",
      use: { ...devices["Pixel 5"] },
      testMatch: ["**/public/**/*.spec.ts", "**/members/**/*.spec.ts"],
    },
  ],

  globalSetup: "./playwright/global-setup.ts",

  webServer: {
    // CI builds in a dedicated workflow step; locally build on demand so a bare
    // `pnpm test:e2e` is self-contained and reproducible.
    command: process.env.CI ? `pnpm start --port=${PORT}` : `pnpm build && pnpm start --port=${PORT}`,
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
    env: {
      PLAYWRIGHT_TEST: "1",
      NODE_ENV: "test",
    },
  },
});
