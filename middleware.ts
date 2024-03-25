import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { i18n } from "./i18n";

const locales = i18n.locales;
const defaultLocale = i18n.defaultLocale;

export function middleware(request: NextRequest) {
  const encryptedSessionData = request.cookies.get("session")?.value;

  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  /** If have supported locale in the pathname */
  if (pathnameHasLocale) {
    // Protect route `/new` and `/edit`.
    if (
      !encryptedSessionData &&
      (pathname.includes("/new") || pathname.includes("/edit"))
    ) {
      // Return login page if unauthentication
      const loginUrl = new URL("/login", request.url);
      return NextResponse.redirect(loginUrl);
    }

    return;
  }

  /** If have supported locale in the pathname */
  // Protect route `/new` and `/edit`.
  if (
    !encryptedSessionData &&
    (pathname.startsWith("/new") || pathname.startsWith("/edit"))
  ) {
    // Return login page if unauthentication
    request.nextUrl.pathname = `/${defaultLocale}/login`;
    console.log(request.nextUrl.pathname);
    return NextResponse.redirect(request.nextUrl);
  }

  // Redirect if there is no locale
  request.nextUrl.pathname = `/${defaultLocale}${pathname}`;
  // e.g. incoming request is /products
  // The new URL is now /en/products

  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|.*\\.png$).*)",
  ],
};
