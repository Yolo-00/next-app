import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

import { ModuleTemplate } from "../_components/module-template";
import { ModuleDemo } from "../_components/module-demo";
import { getWeb3Module, WEB3_MODULES } from "../_lib/modules";

export function generateStaticParams() {
  return WEB3_MODULES.map((module) => ({ module: module.slug }));
}

export default async function Web3ModulePage({
  params,
}: {
  params: Promise<{ module: string }>;
}) {
  const { module } = await params;
  const item = getWeb3Module(module);
  const t = await getTranslations("web3");

  if (!item) {
    notFound();
  }

  return (
    <ModuleTemplate
      sectionTitles={{
        demo: t("demo"),
        explanation: t("explanation"),
        pseudocode: t("pseudocode"),
      }}
      title={t(`modules.${item.slug}.title`)}
      summary={t(`modules.${item.slug}.summary`)}
      explanation={[
        t("module_explain_1", { title: t(`modules.${item.slug}.title`) }),
        t("module_explain_2"),
      ]}
      pseudocode={item.pseudocode}
      demo={<ModuleDemo slug={item.slug} interactive={item.interactive} />}
    />
  );
}
