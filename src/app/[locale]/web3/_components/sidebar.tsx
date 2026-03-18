"use client";

import { useTranslations } from "next-intl";

import { Link, usePathname } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { WEB3_MODULES } from "../_lib/modules";

export function Web3Sidebar() {
  const pathname = usePathname();
  const t = useTranslations("web3");
  const normalizedPathname =
    pathname.replace(/^\/(zh|en)(?=\/|$)/, "") || "/";

  return (
    <aside className="w-72 h-full border-r border-border bg-card/40 flex flex-col overflow-hidden">
      <div className="p-4 border-b border-border">
        <h2 className="font-semibold">{t("module_nav_title")}</h2>
      </div>
      <nav className="p-2 space-y-1 flex-1 overflow-y-auto">
        <Link
          href="/web3"
          className={cn(
            "block rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent",
            normalizedPathname === "/web3" &&
              "bg-accent text-accent-foreground"
          )}
        >
          {t("overview")}
        </Link>
        {WEB3_MODULES.map((module) => {
          const href = `/web3/${module.slug}`;
          return (
            <Link
              key={module.slug}
              href={href}
              className={cn(
                "block rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent",
                normalizedPathname === href &&
                  "bg-accent text-accent-foreground"
              )}
            >
              {t(`modules.${module.slug}.title`)}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
