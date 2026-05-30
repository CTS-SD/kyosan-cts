import { getSessionCookie } from "better-auth/cookies";
import { type NextRequest, NextResponse } from "next/server";

/**
 * Page guard (Next.js 16 renamed `middleware` → `proxy`).
 * Redirects unauthenticated access to /admin and /members to the sign-in page.
 * This is a lightweight cookie-presence check; role authorization is enforced
 * independently by the page layouts (`requireRole`) and the API routes.
 */
export function proxy(req: NextRequest) {
  const cookie = getSessionCookie(req);

  if (!cookie) {
    const next = encodeURIComponent(req.nextUrl.pathname + req.nextUrl.search);
    return NextResponse.redirect(new URL(`/sign-in?next=${next}`, req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/members/:path*"],
};
