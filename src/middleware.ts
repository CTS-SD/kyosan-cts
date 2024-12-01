import { auth } from "@/lib/auth";
import { isApprovedEmail } from "./utils/utils";
import { jwtVerify } from "jose";
import { CookieKey } from "./lib/const";

const pinProtectedPaths: string[] = [];

const PIN_SECRET = process.env.PIN_SECRET!;
const PIN_SECRET_ENCODED = new TextEncoder().encode(PIN_SECRET);

export default auth(async (req) => {
  const url = req.nextUrl;
  const path = url.pathname;
  const origin = url.origin;

  if (pinProtectedPaths.some((p) => path.startsWith(p))) {
    const token = req.cookies.get(CookieKey.USER_JWT)?.value;
    if (token) {
      try {
        await jwtVerify(token, PIN_SECRET_ENCODED);
        return;
      } catch (e) {
        console.warn(e);
      }
    }
    return Response.redirect(new URL(`/pin?next=${url}`, origin));
  }

  if (!req.auth) {
    return Response.redirect(new URL("/signin", origin));
  }

  if (!isApprovedEmail(req.auth.user?.email)) {
    return Response.redirect(new URL("/error/unauthorized", origin));
  }
});

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
