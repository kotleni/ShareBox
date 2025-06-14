import { NextRequest, NextResponse } from "next/server";
import { getPreferredLocale } from "./i18n/getPreferredLocale";
import { languages } from "@/i18n/settings";
import { auth } from "@/auth";

const AUTH_PAGE = "/auth";
const NOT_REQUIRED_AUTH_PAGES = [
    "/",
    "/en",
    "/uk",
    "/auth",
    "/en/auth",
    "/uk/auth",
    "/api/auth",
];

const isNotRequireAuth = (url: string) =>
    NOT_REQUIRED_AUTH_PAGES.some((page) => page === url) ||
    url.startsWith("/api/auth");

export async function middleware(req: NextRequest) {
    const { nextUrl } = req;
    const newUrl = nextUrl.clone();
    const pathname = newUrl.pathname;
    const res = NextResponse.rewrite(newUrl);

    const isAuthRequired = !isNotRequireAuth(nextUrl.pathname);

    if (isAuthRequired) {
        // Verify auth using NextAuth
        const session = await auth();
        if (!session) {
            newUrl.pathname = AUTH_PAGE;
            return NextResponse.redirect(newUrl);
        }
    }

    const localeInPath = languages.find(
        (locale) =>
            pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
    );

    const locale = getPreferredLocale({
        userLocale: localeInPath,
        acceptLanguageHeader: req.headers.get("accept-language") ?? undefined,
    });

    if (localeInPath) {
        res.headers.set("x-locale", locale);
        res.headers.set("x-pathname", pathname);
        console.log(locale);
        return NextResponse.next(res);
    }

    // If url has no locale, redirect to locale
    newUrl.pathname = `/${locale}${pathname}`;
    return NextResponse.redirect(newUrl);
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|static|.*\\.).*)"],
};
