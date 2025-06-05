import "server-only"
import { headers } from "next/headers"
import { createInstance } from "i18next"
import { initReactI18next } from "react-i18next/initReactI18next"
import resourcesToBackend from "i18next-resources-to-backend"

const HEADER_KEY = "Accept-Language"
const SUPPORTED_LOCALES = ["en-US", "uk-UA"]
const DEFAULT_LOCALE = "en-US"

export async function getLocaleName() {
    const reqHeaders = await headers()
    const localeLine = reqHeaders.get(HEADER_KEY)
    const locale = localeLine?.split(",")[0] || DEFAULT_LOCALE
    return SUPPORTED_LOCALES.includes(locale) ? locale : DEFAULT_LOCALE
}

export async function getTranslations(namespaces: string[] = ["common"]) {
    const i18nInstance = createInstance()
    const locale = await getLocaleName()

    await i18nInstance
        .use(initReactI18next)
        .use(
            resourcesToBackend(
                (language: string, namespace: string) =>
                    import(`@/../public/locales/${language}/${namespace}.json`),
            ),
        )
        .init({
            lng: locale,
            fallbackLng: DEFAULT_LOCALE,
            supportedLngs: SUPPORTED_LOCALES,
            defaultNS: namespaces[0] || "common",
            fallbackNS: "common",
            ns: namespaces,
            preload: typeof window === "undefined" ? SUPPORTED_LOCALES : [],
        })

    return {
        i18n: i18nInstance,
        resources: i18nInstance.services.resourceStore.data,
        t: i18nInstance.t,
        locale: locale,
    }
}
