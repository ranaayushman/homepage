import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get("authToken")?.value;

  // Define protected routes (actual URL paths, not group names)    
  const protectedPaths = [
    "/dashboard",
    "/profile", // Add other protected routes as needed
  ];

  // Check if the current path is protected
  const isProtectedRoute = protectedPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  if (isProtectedRoute && !authToken) {
    // Redirect to login page if no auth token
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*"], // Match actual protected routes
};
