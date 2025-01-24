"use client";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
const Page = () => {
  const t = useTranslations("myPage");
  return (
    <div>
      <h1>{t("title")}</h1>
      <Link href="/order">
        <Button>订单</Button>
      </Link>
    </div>
  );
};
export default Page;
