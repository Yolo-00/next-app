"use client";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";
const Page = () => {
  const t = useTranslations("login");
  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-[24rem]">
        <CardHeader>
          <CardTitle className="text-2xl">{t("title")}</CardTitle>
          <CardDescription>{t("sub_title")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">{t("email")}</Label>
              <Input
                id="email"
                type="email"
                placeholder={t("email_placeholder")}
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">{t("password")}</Label>
                <Link
                  href="#"
                  className="ml-auto inline-block text-sm underline"
                >
                  {t("forget_password")}
                </Link>
              </div>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full">
              {t("title")}
            </Button>
            <Button variant="outline" className="w-full">
              {t("google_login")}
            </Button>
            <Button variant="outline" className="w-full">
              {t("github_login")}
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            {t("sign_up_tips")}{" "}
            <Link href="#" className="underline">
              {t("sign_up")}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default Page;
