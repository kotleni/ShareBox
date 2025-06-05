// const locales = ["en-US", "uk-UA"]
// const defaultLocale = "en-US"
//
// // Get the preferred locale from the request
// function getLocale(request: NextRequest) {
//     // Check if the URL has a [lang] parameter
//     const pathname = request.nextUrl.pathname
//     const langMatch = pathname.match(/^\/([^\/]+)/)
//
//     if (langMatch && locales.includes(langMatch[1])) {
//         return langMatch[1]
//     }
//
//     // If no valid lang parameter, use accept-language header
//     const acceptLanguage =
//         request.headers.get("accept-language") || "en-US,en;q=0.5"
//     const headers = { "accept-language": acceptLanguage }
//     const languages = new Negotiator({ headers }).languages()
//
//     return match(languages, locales, defaultLocale)
// }
//
// export function middleware(request: NextRequest) {
//     // Check if the URL already has a valid locale
//     const { pathname } = request.nextUrl
//
//     // Check if the URL starts with a valid locale
//     const pathnameHasLocale = locales.some(
//         (locale) =>
//             pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
//     )
//
//     // If the URL already has a valid locale, no need to redirect
//     if (pathnameHasLocale) return
//
//     // Get the preferred locale
//     const locale = getLocale(request)
//
//     // Redirect to the URL with the locale
//     request.nextUrl.pathname = `/${locale}${pathname}`
//     return NextResponse.redirect(request.nextUrl)
// }

export const config = {
    matcher: [],
}
