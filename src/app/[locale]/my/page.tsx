"use client";
import { useTranslations, useLocale } from "next-intl";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { usePathname } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";
const Page = () => {
  const t = useTranslations("myPage");
  const [value, setValue] = useState("");
  const pathname = usePathname();
  const locale = useLocale();
  const searchParams = useSearchParams();
  console.log(pathname, locale, `/${locale}${pathname}`);
  console.log(searchParams.get("next"));
  return (
    <div>
      <h1>{t("title")}</h1>
      {value}
      <Input
        placeholder="请输入"
        className="w-50"
        defaultValue={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};
export default Page;
