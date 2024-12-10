import { useParams } from "next/navigation";
import { usePathname, useRouter } from "@/i18n/routing";
import { LanguageType } from "@/i18n/interface/index";

export function useLanguage() {
    const pathname = usePathname();
    const router = useRouter();
    const params = useParams();
    const changeLanguage = (locale: LanguageType) => {
        router.replace(
            // @ts-expect-error -- TypeScript will validate that only known `params`
            // are used in combination with a given `pathname`. Since the two will
            // always match for the current route, we can skip runtime checks.
            { pathname, params },
            { locale }
        );
    };
    return {
        changeLanguage
    };
}