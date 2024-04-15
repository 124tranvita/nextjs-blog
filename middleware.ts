import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { i18n } from "./i18n";
import { decrypt } from "./app/lib/crypto";
import { Options, Routes } from "./app/lib/constants";

const locales = i18n.locales;
const defaultLocale = i18n.defaultLocale;

export function middleware(request: NextRequest) {
  /** Get pathname */
  const { pathname } = request.nextUrl;
  console.log({ pathname });
  /** Get `isSignedIn` from cookies */
  const isSignedIn = request.cookies.get("isSignedIn")?.value;

  /** Check if there is any supported locale in the pathname */
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  /** If not have supported locale in the pathname */
  if (!pathnameHasLocale) {
    // add default locale
    request.nextUrl.pathname = `/${defaultLocale}${pathname}`;
  }

  /** Access to public routes */
  if (Routes.Public.includes(request.nextUrl.pathname.slice(3))) {
    return NextResponse.redirect(request.nextUrl);
  }

  /** User already logged in */
  if (isSignedIn === Options.Yes) {
    return;
  }

  /** Get current locale */
  const currentLocale = request.nextUrl.pathname.split("/")[1];

  /** Access to protected routes */
  if (
    isSignedIn !== Options.Yes &&
    Routes.Protected.includes(request.nextUrl.pathname.slice(3))
  ) {
    // delete all cookie session
    request.cookies.delete("session");
    request.cookies.delete("isSignedIn");

    // redirect to login page
    const response = NextResponse.redirect(
      new URL(`/${currentLocale}/login`, request.url)
    );
    response.cookies.delete("session");
    response.cookies.delete("isSignedIn");

    return response;
  }

  /** Access to auth routes */
  if (
    Routes.Auth.includes(request.nextUrl.pathname.slice(3)) &&
    isSignedIn === Options.Yes
  ) {
    // redirect to `/` if user already logged in
    return NextResponse.redirect(new URL(`${currentLocale}/`, request.url));
  }

  return;
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
