import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="hover:text-foreground transition-colors relative group"
    >
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-foreground transition-all group-hover:w-full" />
    </Link>
  );
}

const NavMenu = () => {
  const t = useTranslations();
  return (
    <div className="ml-10">
      <NavLink href="/components">{t("layout.nav.components_menu")}</NavLink>
    </div>
  );
};

export default NavMenu;
