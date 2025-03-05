"use client";

import {
  connectorsForWallets,
  RainbowKitProvider,
  darkTheme,
  lightTheme,
  type Locale,
} from "@rainbow-me/rainbowkit";
import { createConfig, http, WagmiProvider, createStorage } from "wagmi";
import { mainnet, base, sepolia, lineaSepolia } from "wagmi/chains";
import {
  binanceWallet,
  metaMaskWallet,
  okxWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const queryClient = new QueryClient();
const CustomWagmiProvider = ({
  children,
  locale,
}: Readonly<{
  children: React.ReactNode;
  locale: Locale;
}>) => {
  const { theme } = useTheme();
  const t = useTranslations();
  const [connectors] = useState(
    connectorsForWallets(
      [
        {
          groupName: t("login.common_wallets"),
          wallets: [
            metaMaskWallet,
            walletConnectWallet,
            okxWallet,
            binanceWallet,
          ],
        },
      ],
      { appName: "RainbowKit App", projectId: "YOUR_PROJECT_ID" }
    )
  );
  const [config] = useState(
    createConfig({
      connectors: [...connectors],
      storage: createStorage({
        storage:
          typeof window !== "undefined" ? window.localStorage : undefined,
      }),
      chains: [mainnet, base, sepolia, lineaSepolia],
      transports: {
        [mainnet.id]: http(),
        [base.id]: http(),
        [sepolia.id]: http(),
        [lineaSepolia.id]: http(),
      },
      multiInjectedProviderDiscovery: false,
      ssr: true,
    })
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          locale={locale}
          theme={theme === "dark" ? darkTheme() : lightTheme()}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default CustomWagmiProvider;
