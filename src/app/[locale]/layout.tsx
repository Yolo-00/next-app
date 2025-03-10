import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { ThemeProvider } from "next-themes";

import { routing } from "@/i18n/routing";
import CustomWagmiProvider from "@/components/CustomWagmiProvider";
import type { LanguageType } from "@/i18n/interface/index";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "layout" });
  return {
    title: {
      default: t("title"),
      template: "%s | " + t("title"),
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: LanguageType }>;
}>) {
  const { locale } = await params;
  if (!locale || !routing.locales.includes(locale)) {
    notFound();
  }
  setRequestLocale(locale);
  const messages = await getMessages();
  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="system">
            <CustomWagmiProvider locale={locale}>
              {children}
            </CustomWagmiProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
