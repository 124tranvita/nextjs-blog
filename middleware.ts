import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { i18n } from "./i18n";
import { Options, Routes } from "./common/lib/constants";

const locales = i18n.locales;
const defaultLocale = i18n.defaultLocale;

const isValidLocale = (lang: string) => {
  const found = i18n.locales.find((locale) => locale === lang);

  return Boolean(found);
};

export function middleware(request: NextRequest) {
  /** Get `lang` from cookies */
  const lang = request.nextUrl.searchParams.get("lang");

  /** Get `isSignedIn` from cookies */
  const isSignedIn = request.cookies.get("isSignedIn")?.value;

  /** Get pathname */
  const { pathname } = request.nextUrl;

  console.log({ pathname, lang });

  /** Check if public route */
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

  /** Access to auth route when already singed in */
  if (pathname.startsWith("/login") && isSignedIn === Options.Yes) {
    // redirect to `/` if user already logged in
    return NextResponse.redirect(new URL(`/?lang=${lang}`, request.url));
  }

  if (!lang || !isValidLocale(lang)) {
    request.nextUrl.searchParams.set("lang", defaultLocale);
    return NextResponse.redirect(request.nextUrl);
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
