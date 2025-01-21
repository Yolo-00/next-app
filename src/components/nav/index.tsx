"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/hooks";
import { useTheme } from "next-themes";
import { Link } from "@/i18n/routing";
import { CircleUserRound, Earth, Moon, Sun } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";

function ThemeButton() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted)
    return (
      <div className="animate-pulse bg-gray-200 m-2 w-4 h-4 rounded-sm cursor-pointer"></div>
    );
  return (
    <Button
      variant="ghost"
      className="w-8 h-8"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? (
        <Sun strokeWidth={1.5} />
      ) : (
        <Moon strokeWidth={1.5} />
      )}
    </Button>
  );
}

const Nav = () => {
  const t = useTranslations();
  const locale = useLocale();
  const { changeLanguage } = useLanguage();

  const onSelectChange = (e: any) => {
    changeLanguage(e);
  };
  return (
    <>
      <div className="flex justify-between items-center bg-background text-foreground sticky top-0 h-nav-height px-5 border-b border-gray-200">
        <div>
          <Link href="/">
            <Image
              src="/images/logo.svg"
              alt="logo"
              width={40}
              height={40}
              priority
            />
          </Link>
        </div>
        <div className="flex items-center gap-5">
          {/* theme */}
          <ThemeButton />

          {/* locale */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-8 h-8">
                <Earth strokeWidth={1.5} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuRadioGroup
                value={locale}
                onValueChange={onSelectChange}
              >
                <DropdownMenuRadioItem value="en">
                  English
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="zh">
                  简体中文
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* user */}
          <Button variant="ghost" className="w-8 h-8">
            <Link href="/my">
              <CircleUserRound size={32} strokeWidth={1.5} />
            </Link>
          </Button>

          {/* login */}
          <Button className="h-8">
            <Link href="/login">{t("layout.nav.login")}</Link>
          </Button>
        </div>
      </div>
    </>
  );
};

export default Nav;
