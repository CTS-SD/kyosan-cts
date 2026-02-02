import { getSessionCookie } from "better-auth/cookies";
import { type NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
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
