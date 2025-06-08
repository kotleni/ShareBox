import type { InitOptions, Namespace } from "i18next";

export const fallbackLng = "en";
export const languages = [fallbackLng, "uk"];
export const defaultNS = "common";

export function getOptions(
    lng = fallbackLng,
    ns: Namespace = defaultNS,
): InitOptions {
    return {
        supportedLngs: languages,
        fallbackLng,
        lng,
        fallbackNS: defaultNS,
        defaultNS,
        ns,
    };
}
