import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { WEB3_MODULES } from "./_lib/modules";

export default async function Web3Page() {
  const t = await getTranslations("web3");

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t("title")}</h1>
        <p className="text-muted-foreground mt-2">{t("subtitle")}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {WEB3_MODULES.map((module) => (
          <div
            key={module.slug}
            className="rounded-lg border border-border p-4 space-y-3"
          >
            <h2 className="font-semibold">{t(`modules.${module.slug}.title`)}</h2>
            <p className="text-sm text-muted-foreground">
              {t(`modules.${module.slug}.summary`)}
            </p>
            <Button asChild variant="outline">
              <Link href={`/web3/${module.slug}`}>{t("open_module")}</Link>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
