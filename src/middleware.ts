import { NextRequest, NextResponse } from "next/server";
import acceptLanguage from "accept-language";
import { fallbackLng, cookieName, headerName } from "@/i18n/settings";

export function middleware(req: NextRequest) {
    let lang: string | undefined | null;
    if (req.cookies.has(cookieName))
        lang = acceptLanguage.get(req.cookies.get(cookieName)?.value);
    if (!lang) lang = acceptLanguage.get(req.headers.get("Accept-Language"));
    if (!lang) lang = fallbackLng;

    const headers = new Headers(req.headers);
    headers.set(headerName, lang);

    return NextResponse.next({ headers });
}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
    ],
};
