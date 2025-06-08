import { headers } from "next/headers";
import { fallbackLng } from "@/i18n/settings";

export async function getLocale() {
    const headersList = await headers();
    const localeFromHeader = headersList.get("x-locale");

    if (!localeFromHeader) {
        return fallbackLng;
    }
    return localeFromHeader;
}
