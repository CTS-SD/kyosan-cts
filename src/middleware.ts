import { auth } from "@/lib/auth";
import { isApprovedEmail } from "./utils/utils";

export default auth((req) => {
  if (!req.auth) {
    const url = new URL("/signin", req.nextUrl.origin);
    return Response.redirect(url);
  }

  if (!isApprovedEmail(req.auth.user?.email)) {
    const url = new URL("/error/unauthorized", req.nextUrl.origin);
    return Response.redirect(url);
  }
});

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
