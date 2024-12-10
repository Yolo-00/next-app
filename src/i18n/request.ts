import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';
import { LanguageType } from "@/i18n/interface/index";

export default getRequestConfig(async ({ requestLocale }) => {
    // This typically corresponds to the `[locale]` segment
    let locale = await requestLocale;

    // Ensure that a valid locale is used
    if (!locale || !routing.locales.includes(locale as LanguageType)) {
        locale = routing.defaultLocale;
    }

    return {
        locale,
        messages: (await import(`./modules/${locale}.json`)).default
    };
});