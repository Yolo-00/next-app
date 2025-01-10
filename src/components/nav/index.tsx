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
import { Link } from "@/i18n/routing";
import { CircleUserRound, Earth, Moon, Sun } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useTheme } from "next-themes";

const Nav = () => {
  const t = useTranslations();
  const { theme, setTheme } = useTheme();
  const locale = useLocale();
  const { changeLanguage } = useLanguage();

  const onSelectChange = (e: any) => {
    changeLanguage(e);
  };
  return (
    <>
      <div className="flex justify-between items-center bg-background text-foreground sticky top-0 h-16 px-5 border-b border-gray-200">
        <div>
          <Image
            src="/images/logo.svg"
            alt="logo"
            width={40}
            height={40}
            priority
          />
        </div>
        <div className="flex items-center gap-5">
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

          {/* theme */}
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
