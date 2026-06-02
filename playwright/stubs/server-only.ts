// Stub for the `server-only` marker package, used only by the Playwright
// runner (wired via playwright/tsconfig.json). The real package is unresolvable
// outside Next's bundler and throws by design; tests import DB/auth modules in a
// plain Node context, so we replace it with a no-op here.
export {};
