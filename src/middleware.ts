import { NextRequest, NextResponse } from "next/server";
import { getPreferredLocale } from "./i18n/getPreferredLocale";
import { languages } from "@/i18n/settings";

export function middleware(req: NextRequest) {
    const { nextUrl } = req;
    const newUrl = nextUrl.clone();
    const pathname = newUrl.pathname;

    const localeInPath = languages.find(
        (locale) =>
            pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
    );

    if (localeInPath) {
        return NextResponse.next();
    }

    const locale = getPreferredLocale({
        userLocale: undefined,
        acceptLanguageHeader: req.headers.get("accept-language") ?? undefined,
    });

    newUrl.pathname = `/${locale}${pathname}`;

    return NextResponse.redirect(newUrl);
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|static|.*\\.).*)"],
};
