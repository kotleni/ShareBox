import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { fallbackLng, languages } from "@/i18n/settings";

export function getPreferredLocale({
    userLocale,
    acceptLanguageHeader,
}: {
    userLocale?: string;
    acceptLanguageHeader?: string;
}) {
    if (userLocale && languages.includes(userLocale)) {
        return userLocale;
    }

    if (!acceptLanguageHeader) {
        return fallbackLng;
    }

    const preferredLanguages = new Negotiator({
        headers: {
            "accept-language": acceptLanguageHeader,
        },
    })
        .languages()
        .filter((lang) => lang !== "*");

    try {
        return match(preferredLanguages, languages, fallbackLng);
    } catch (e) {
        return fallbackLng;
    }
}
