"use client";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { useLanguage } from "@/hooks";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { DateRange } from "react-day-picker";
import { addDays } from "date-fns";
import dayjs from "dayjs";
export default function Home() {
  const t = useTranslations();
  const locale = useLocale();
  const { changeLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 5),
  });
  const onSelectChange = (e: any) => {
    changeLanguage(e);
  };
  const onSelectThemeChange = (e: any) => {
    setTheme(e);
  };
  useEffect(() => {
    console.log(dayjs(new Date().toISOString()).format("YYYY-MM-DD HH:mm:ss"));
    console.log(Intl.DateTimeFormat().resolvedOptions().timeZone);
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }
  return (
    <div className="flex items-center justify-center">
      <div>
        <h1>{t("home")}</h1>
        <Button>
          <Link href="/my" className="hover:text-blue-500 dark:text-yellow-500">
            {t("my")}
          </Link>
        </Button>
        <Button>
          <Link href="/login">去登录</Link>
        </Button>

        <div className="flex">
          切换语言：
          <Select defaultValue={locale} onValueChange={onSelectChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="locale" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="zh">简体中文</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex mt-5">
          切换主题：
          <Select defaultValue={theme} onValueChange={onSelectThemeChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">{t("theme.light")}</SelectItem>
              <SelectItem value="dark">{t("theme.dark")}</SelectItem>
              <SelectItem value="system">{t("theme.system")}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Calendar
          mode="range"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
          numberOfMonths={2}
        />
      </div>
    </div>
  );
}
