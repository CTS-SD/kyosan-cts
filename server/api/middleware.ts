import "server-only";
import { createMiddleware } from "hono/factory";
import { auth } from "@/features/auth/server";

type SessionUser = typeof auth.$Infer.Session.user;

export type AuthVariables = {
  user: SessionUser;
};

/**
 * Authentication for API routes: requires a valid Better-Auth session (any role).
 * Returns 401 when unauthenticated. Stores the user in the Hono context.
 */
export const requireAuth = createMiddleware<{ Variables: AuthVariables }>(async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });

  if (!session) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  c.set("user", session.user);
  await next();
});

/**
 * Authentication + admin authorization for API routes (§3.4 multi-layer defense).
 * Validates the Better-Auth session and requires the `admin` role.
 * Returns 401 when unauthenticated and 403 when authenticated but not an admin.
 * On success the user is stored in the Hono context (`c.get("user")`).
 */
export const requireAdmin = createMiddleware<{ Variables: AuthVariables }>(async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });

  if (!session) {
    return c.json({ error: "Unauthorized" }, 401);
  }
  if (session.user.role !== "admin") {
    return c.json({ error: "Forbidden" }, 403);
  }

  c.set("user", session.user);
  await next();
});
