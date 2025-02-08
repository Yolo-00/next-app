import { useTranslations } from "next-intl";

const NavMenu = () => {
  const t = useTranslations();
  return <div className="ml-10">{t("layout.nav.components_menu")}</div>;
};

export default NavMenu;
