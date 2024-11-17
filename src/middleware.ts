import { auth } from "@/lib/auth";
import { isApprovedEmail } from "./utils/utils";
import { isValidToken } from "./lib/token";

export default auth((req) => {
  const url = req.nextUrl;
  const path = url.pathname;
  const origin = url.origin;

  if (path.startsWith("/event/check-your-department")) {
    const token = req.cookies.get("user_token");
    if (
      !token ||
      !isValidToken(token.value, process.env.PIN_SECRET!, (decrypted) =>
        decrypted.startsWith(process.env.PIN!),
      )
    ) {
      return Response.redirect(new URL(`/pin?next=${url}`, origin));
    }
    return;
  }

  if (!req.auth) {
    return Response.redirect(new URL("/signin", origin));
  }

  if (!isApprovedEmail(req.auth.user?.email)) {
    return Response.redirect(new URL("/error/unauthorized", origin));
  }
});

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/admin/:path*",
    "/event/check-your-department/:path*",
  ],
};
