import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { hasAuthConfigured } from "@/lib/env";
import { hasDemoSessionCookie } from "@/lib/demo-session";

const SESSION_COOKIE = "better-auth.session_token";

function isDashboardPath(pathname: string) {
  return pathname === "/dashboard" || pathname.startsWith("/dashboard/");
}

function hasBetterAuthSession(request: NextRequest) {
  return Boolean(request.cookies.get(SESSION_COOKIE)?.value);
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/login")) {
    if (
      hasAuthConfigured() &&
      (hasBetterAuthSession(request) ||
        hasDemoSessionCookie(request.headers.get("cookie")))
    ) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  }

  if (!isDashboardPath(pathname)) {
    return NextResponse.next();
  }

  if (!hasAuthConfigured()) {
    return NextResponse.next();
  }

  const cookieHeader = request.headers.get("cookie");
  if (hasBetterAuthSession(request) || hasDemoSessionCookie(cookieHeader)) {
    return NextResponse.next();
  }

  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("next", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
