"use client";

import { Wallet } from "lucide-react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useLocale, useTranslations } from "next-intl";
import Cookies from "js-cookie";
import { useDisconnect } from "wagmi";
import { Earth, Moon, Sun } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { useLanguage } from "@/hooks";
import { Link, useRouter, usePathname } from "@/i18n/routing";
import type { LanguageType } from "@/i18n/interface/index";

export default function NavRight() {
  const { theme, setTheme } = useTheme();
  const t = useTranslations();
  const locale = useLocale();
  const { changeLanguage } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();
  const { disconnect } = useDisconnect();

  const [mounted, setMounted] = useState(false);
  const [token, setToken] = useState<string | undefined>(undefined);

  const handleLogOut = () => {
    Cookies.remove("token");
    router.replace("/login");
    disconnect();
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setToken(Cookies.get("token"));
  }, [token]);

  if (!mounted) return null;
  return (
    <div className="flex items-center gap-5">
      {/* theme */}
      <Button
        variant="ghost"
        className="w-8 h-8 [&_svg]:size-5"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "dark" ? (
          <Sun strokeWidth={1.5} />
        ) : (
          <Moon strokeWidth={1.5} />
        )}
      </Button>

      {/* locale */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="w-8 h-8 [&_svg]:size-5">
            <Earth strokeWidth={1.5} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuRadioGroup
            value={locale}
            onValueChange={(e) => changeLanguage(e as LanguageType)}
          >
            <DropdownMenuRadioItem value="en">English</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="zh">简体中文</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Wallet */}
      {token && (
        <ConnectButton.Custom>
          {({
            account,
            chain,
            openAccountModal,
            openConnectModal,
            authenticationStatus,
            mounted,
          }) => {
            const ready = mounted && authenticationStatus !== "loading";
            const connected =
              ready &&
              account &&
              chain &&
              (!authenticationStatus ||
                authenticationStatus === "authenticated");
            return (
              <>
                {connected && chain.iconUrl && (
                  <Image
                    className="cursor-pointer"
                    src={chain.iconUrl}
                    alt="logo"
                    width={20}
                    height={20}
                    priority
                    onClick={() => openAccountModal()}
                  />
                )}
                {!connected && (
                  <Button
                    variant="ghost"
                    className="w-8 h-8 [&_svg]:size-5"
                    onClick={() => openConnectModal()}
                  >
                    <Wallet strokeWidth={1.5} />
                  </Button>
                )}
              </>
            );
          }}
        </ConnectButton.Custom>
      )}

      {/* login */}
      {token && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="w-7 h-7">
              <AvatarImage src="/images/avatar.png" />
              <AvatarFallback>Yolo</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-10">
            <DropdownMenuItem className="flex justify-center">
              <Link href="/my">{t("layout.nav.my")}</Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex justify-center"
              onClick={handleLogOut}
            >
              {t("layout.nav.logout")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      {pathname !== "/login" && !token && (
        <Button className="h-8">
          <Link href="/login">{t("layout.nav.login")}</Link>
        </Button>
      )}
    </div>
  );
}
