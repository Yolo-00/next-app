"use client";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { useLanguage } from "@/hooks";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
export default function Home() {
  const t = useTranslations();
  const locale = useLocale();
  const { changeLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const onSelectChange = (e: any) => {
    changeLanguage(e.target.value);
  };
  const onSelectThemeChange = (e: any) => {
    setTheme(e.target.value);
  };
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
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
        <Link href="/my" className="hover:text-blue-500 dark:text-yellow-500">
          {t("my")}
        </Link>
        <div>
          切换主题：
          <select defaultValue={theme} onChange={onSelectThemeChange}>
            <option value="light">light</option>
            <option value="dark">dark</option>
          </select>
        </div>
      </div>
    </div>
  );
}
