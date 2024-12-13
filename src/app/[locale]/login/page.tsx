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
import { useCurrentPath } from "@/hooks";
import { useLayoutEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "@/i18n/routing";
const Page = () => {
  const t = useTranslations("login");
  const currentPath = useCurrentPath();
  const searchParams = useSearchParams();
  const router = useRouter();
  const clientId = "Ov23liyRpMRmQeOGgqel"; // GitHub OAuth Client ID
  const redirectUri = `${location.origin}${currentPath}`; // 重定向的回调URL
  const handleGithubLogin = () => {
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=user`;
    window.location.href = githubAuthUrl; // 重定向到 GitHub 的授权页面
  };
  useLayoutEffect(() => {
    const code = searchParams.get("code");
    if (code) {
      // 处理 GitHub 重定向回来的 code
      console.log("GitHub 授权码:", code);
      // 在这里可以将 code 发送给后端进行 GitHub 登录验证
      // 验证成功后，可以获取用户信息并进行相应的操作
      router.replace(`/`);
    }
  }, [searchParams, router]);
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
            <Button
              variant="outline"
              className="w-full"
              onClick={handleGithubLogin}
            >
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
