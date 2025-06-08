import { NextRequest, NextResponse } from "next/server";
import { getPreferredLocale } from "./i18n/getPreferredLocale";
import { languages } from "@/i18n/settings";

export function middleware(req: NextRequest) {
    const { nextUrl } = req;
    const newUrl = nextUrl.clone();
    const pathname = newUrl.pathname;
    const res = NextResponse.rewrite(newUrl);

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
