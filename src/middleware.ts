/* eslint-disable no-console */
// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("refreshToken")?.value;
  const { pathname } = request.nextUrl;

  // Skip middleware for static files and API routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") // This will skip files with extensions
  ) {
    return NextResponse.next();
  }

  // Allow access to reset-password pages without token
  if (pathname.startsWith("/reset-password")) {
    const response = NextResponse.next();
    response.headers.set("Cache-Control", "no-store");
    return response;
  }

  // Handle login routes
  if (pathname === "/login") {
    // Redirect root login to admin login
    return NextResponse.redirect(new URL("/login/manager", request.url));
  }

  if (pathname === "/login/admin" || pathname === "/login/manager") {
    // If user has token and tries to access login page, redirect to appropriate dashboard
    if (token && token !== undefined) {
      const dashboardPath =
        pathname === "/login/admin" ? "/dashboard/admin" : "/dashboard/manager";
      return NextResponse.redirect(new URL(dashboardPath, request.url));
    }
    const response = NextResponse.next();
    // Add cache control headers to prevent unnecessary middleware calls
    response.headers.set("Cache-Control", "no-store");
    return response;
  }

  // For all other routes, require token
  if (!token) {
    return NextResponse.redirect(new URL("/login/admin", request.url));
  }

  const response = NextResponse.next();
  // Add cache control headers to prevent unnecessary middleware calls
  response.headers.set("Cache-Control", "no-store");
  return response;
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)"
  ]
};
