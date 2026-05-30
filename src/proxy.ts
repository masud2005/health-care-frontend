import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import {
  getDefaultDashboardRoute,
  getRouteOwner,
  isAuthRoute,
  UserRole,
} from "./lib/auth-utils";

export async function proxy(request: NextRequest) {
  // console.log(request.nextUrl.pathname);
  const pathname = request.nextUrl.pathname;

  // Get the access token from cookies
  const cookieStore = await cookies();
  const accessToken = request.cookies.get("accessToken")?.value || null;
  // console.log(accessToken, "Access Token");

  // Verify the access token and extract the user role
  let userRole: UserRole | null = null;
  if (accessToken) {
    const verifiedToken: JwtPayload | string = jwt.verify(
      accessToken,
      process.env.JWT_SECRET as string,
    );
    // console.log(verifiedToken, "Verified Token");

    if (typeof verifiedToken === "string") {
      cookieStore.delete("accessToken");
      cookieStore.delete("refreshToken");
      return NextResponse.redirect(new URL("/login", request.url));
    }

    userRole = verifiedToken.role;
  }
  // console.log(userRole, "User Role");

  // Determine the route owner (ADMIN, DOCTOR, PATIENT, COMMON, or null for public routes)
  const routeOwner = getRouteOwner(pathname);
  // console.log(routeOwner, "Route Owner");

  // Determine if the route is an auth route (like /login or /register)
  const isAuth = isAuthRoute(pathname);
  // console.log(isAuth, "is Auth Route!");

  // Rule 1 : User is logged in and trying to access auth route. Redirect to default dashboard
  if (accessToken && isAuth) {
    return NextResponse.redirect(
      new URL(getDefaultDashboardRoute(userRole as UserRole), request.url),
    );
  }

  // Rule 2 : User is trying to access open public route
  if (routeOwner === null) {
    return NextResponse.next();
  }

  // User is not authenticated and trying to access protected route
  if (!accessToken) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Rule 3 : User is trying to access common protected route
  if (routeOwner === "COMMON") {
    return NextResponse.next();
  }

  // Rule 4 : User is trying to access role based protected route
  if (
    routeOwner === "ADMIN" ||
    routeOwner === "DOCTOR" ||
    routeOwner === "PATIENT"
  ) {
    if (userRole !== routeOwner) {
      return NextResponse.redirect(
        new URL(getDefaultDashboardRoute(userRole as UserRole), request.url),
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)",
  ],
};
