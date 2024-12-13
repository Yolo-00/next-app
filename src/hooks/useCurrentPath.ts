import { useLocale } from "next-intl";
import { usePathname } from "@/i18n/routing";
export function useCurrentPath() {
    const locale = useLocale();
    const pathname = usePathname();
    return `/${locale}${pathname}`;
}