"use client";
import { useTranslations } from "next-intl";
import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Cookies from "js-cookie";

import { Link, useRouter } from "@/i18n/routing";
import { useCurrentPath } from "@/hooks";

// components
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const GoogleIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path
        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
        fill="currentColor"
      />
    </svg>
  );
};
const GitHubIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path
        d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
        fill="currentColor"
      />
    </svg>
  );
};
const clientId = "Ov23liyRpMRmQeOGgqel"; // GitHub OAuth Client ID
const changeEncodeURI = (currentPath: string) => {
  // 重定向的回调URL
  return encodeURIComponent(
    typeof window !== "undefined"
      ? `${window.location.origin}${currentPath}`
      : ""
  );
};

const GitHubCode = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  useEffect(() => {
    const code = searchParams.get("code");
    if (code) {
      // 处理 GitHub 重定向回来的 code
      console.log("GitHub 授权码:", code);
      Cookies.set("token", "123456");
      // 在这里可以将 code 发送给后端进行 GitHub 登录验证
      // 验证成功后，可以获取用户信息并进行相应的操作
      router.replace(`/`);
    }
  }, [searchParams, router]);
  return null;
};

const Page = () => {
  const t = useTranslations("login");
  const currentPath = useCurrentPath();

  const router = useRouter();
  const formSchema = z.object({
    email: z.string().email({ message: t("email_err") }),
    password: z.string().nonempty({ message: t("password_err") }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleGithubLogin = () => {
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${changeEncodeURI(
      currentPath
    )}&scope=user`;
    window.location.href = githubAuthUrl; // 重定向到 GitHub 的授权页面
  };
  const handleLogin = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    Cookies.set("token", "123456");
    router.replace(`/`);
  };
  useEffect(() => {
    if (Cookies.get("token")) {
      router.back();
    }
  }, [router]);
  return (
    <Suspense>
      <div className="flex justify-center items-center h-screen-minus-nav">
        <Card className="w-[24rem]">
          <CardHeader>
            <CardTitle className="text-2xl">{t("title")}</CardTitle>
            <CardDescription>{t("sub_title")}</CardDescription>
          </CardHeader>
          <CardContent>
            {/* 表单 */}
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleLogin)}>
                <div className="grid gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">
                          {t("email")}
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder={t("email_placeholder")}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center">
                          <FormLabel className="text-foreground">
                            {t("password")}
                          </FormLabel>
                          <Link
                            href="/"
                            className="ml-auto inline-block text-sm underline"
                          >
                            {t("forget_password")}
                          </Link>
                        </div>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" variant="outline" className="w-full">
                    {t("title")}
                  </Button>
                  <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                    <span className="relative z-10 bg-background px-2 text-muted-foreground">
                      {t("or_tips")}
                    </span>
                  </div>
                  {/* 额外登录 */}
                  <Button type="button" variant="outline" className="w-full">
                    <GoogleIcon />
                    {t("google_login")}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={handleGithubLogin}
                  >
                    <GitHubIcon />
                    {t("github_login")}
                  </Button>
                </div>
              </form>
            </Form>
            {/* 注册 */}
            <div className="mt-4 text-center text-sm">
              {t("sign_up_tips")}{" "}
              <Link href="/" className="underline">
                {t("sign_up")}
              </Link>
            </div>
          </CardContent>
          <CardFooter>
            <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4">
              {t.rich("privacy_agreement", {
                div1: (chunks) => (
                  <Link className="hover:text-primary" href="/">
                    {chunks}
                  </Link>
                ),
                div2: (chunks) => (
                  <Link className="hover:text-primary" href="/">
                    {chunks}
                  </Link>
                ),
              })}
            </div>
          </CardFooter>
        </Card>
      </div>
      <GitHubCode />
    </Suspense>
  );
};

export default Page;
