import path from "node:path";
import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(__dirname, ".env.test") });

const PORT = process.env.TEST_PORT ?? 3001;
const BASE_URL = `http://localhost:${PORT}`;

process.env.PLAYWRIGHT_TEST = "1";

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./playwright",
  /* Run tests in files in parallel - but ensure proper test isolation */
  fullyParallel: false, // Changed to false to avoid race conditions until we implement proper isolation
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Allow limited parallelism on CI to keep runtimes reasonable. */
  workers: 1, // Changed to 1 worker to ensure sequential execution for now
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL: BASE_URL,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",

    screenshot: "only-on-failure",
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
      },
    },
    // {
    //   name: "firefox",
    //   use: { ...devices["Desktop Firefox"] },
    // },
    // {
    //   name: "webkit",
    //   use: { ...devices["Desktop Safari"] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  globalSetup: "./playwright/global-setup.ts",

  webServer: {
    command: `pnpm start --port=${PORT}`,
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
    env: {
      PLAYWRIGHT_TEST: "1",
      NODE_ENV: "test",
    },
  },
});
