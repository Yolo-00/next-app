"use client";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { useLanguage } from "@/hooks";
export default function Home() {
  const t = useTranslations();
  const locale = useLocale();
  const { changeLanguage } = useLanguage();
  const onSelectChange = (e: any) => {
    changeLanguage(e.target.value);
  };
  return (
    <div className="flex items-center justify-center">
      <div>
        <h1>{t("home")}</h1>
        <div>
          切换语言：
          <select defaultValue={locale} onChange={onSelectChange}>
            <option value="en">en</option>
            <option value="zh">zh</option>
          </select>
        </div>
        <Link href="/my">{t("my")}</Link>
      </div>
    </div>
  );
}
