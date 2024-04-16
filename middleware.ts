import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { i18n } from "./i18n";
import { Options, Routes } from "./app/lib/constants";

const locales = i18n.locales;
const defaultLocale = i18n.defaultLocale;

export function middleware(request: NextRequest) {
  const lang = request.nextUrl.searchParams.get("lang");

  /** Get `isSignedIn` from cookies */
  const isSignedIn = request.cookies.get("isSignedIn")?.value;

  /** Get pathname */
  const { pathname } = request.nextUrl;
  // const pathnameHasLocale = locales.some(
  //   (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  // );

  console.log({ pathname, lang });

  /** Access to public routes */
  const isProtectedRoute = Routes.Protected.some((route) =>
    pathname.startsWith(route)
  );

  /** Access to protected routes w/o signed in */
  if (isProtectedRoute && isSignedIn !== Options.Yes) {
    // delete all cookie session
    request.cookies.delete("session");
    request.cookies.delete("isSignedIn");

    // redirect to login page
    const response = NextResponse.redirect(
      new URL(`/login?lang=${lang ? lang : defaultLocale}`, request.url)
    );
    response.cookies.delete("session");
    response.cookies.delete("isSignedIn");

    return response;
  }

  if (!lang) {
    console.log("ADD LANG");
    request.nextUrl.searchParams.set("lang", defaultLocale);
    return NextResponse.redirect(request.nextUrl);
  }
  // /** Access to auth routes */
  // if (
  //   Routes.Auth.includes(request.nextUrl.pathname.slice(3)) &&
  //   isSignedIn === Options.Yes
  // ) {
  //   console.log("AUth route logged in");
  //   // redirect to `/` if user already logged in
  //   return NextResponse.redirect(new URL(`/?lang=${lang}`, request.url));
  // }

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
