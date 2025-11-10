import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

import { STRAPI_BASE_URL } from "@/lib/strapi";

const protectedRoutes = ["/dashboard"];

function checkIsProtectedRoute(path: string) {
  return protectedRoutes.includes(path);
}

function redirectToLogin(request: NextRequest) {
  return NextResponse.redirect(new URL("/stamp-in'", request.url));
}

export async function proxy(request: NextRequest) {
  const currentPath = request.nextUrl.pathname;

  const isProtectedRoute = checkIsProtectedRoute(currentPath);

  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  // Validate user authentication
  try {
    // 1. Check if user has a valid JWT
    const cookieStore = await cookies();
    const jwt = cookieStore.get("jwt");

    if (!jwt) {
      throw new Error("No JWT found");
    }

    // 2. Check if user is in the database
    const response = await fetch(`${STRAPI_BASE_URL}/api/users/me`, {
      headers: {
        Authorization: `Bearer ${jwt.value}`,
        "Content-Type": "application/json",
      },
    });
    const userResponse = await response.json();

    if (!userResponse) {
      throw new Error("User not found in database");
    }

    // 3. Check if user is active
    if (userResponse.blocked || !userResponse.confirmed) {
      throw new Error("User is not active");
    }

    // 4. Let the request pass
    return NextResponse.next();
  } catch (error) {
    console.error("Error verfying user authentication:", error);
    return NextResponse.redirect(new URL("/stamp-in", request.url));
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sw.js).*)",
    "/dashboard",
    "/dashboard/:path*",
  ],
};
