"use client";

import { useMemo, useState } from "react";
import { useAccount, useBalance, useSwitchChain } from "wagmi";
import type { Address } from "viem";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type TokenDefinition = {
  id: string;
  label: string;
  symbol: string;
  type: "native" | "erc20";
  addresses?: Partial<Record<number, Address>>;
  supportedChains: number[];
};

const TOKEN_LIST: TokenDefinition[] = [
  {
    id: "usdt",
    label: "Tether USD",
    symbol: "USDT",
    type: "erc20",
    supportedChains: [1, 56, 8453, 11155111, 59141],
    addresses: {
      1: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
      56: "0x55d398326f99059fF775485246999027B3197955",
      8453: "0x2FbEb6A6c5F38E609f1e9575E6F6BA5711a96484",
      11155111: "0xEd37A0303714c5c6F7fC8d4DAd0B86c9Cc1fb7C4",
      59141: "0xf37C83A85Df7E3534406AB0FF7E3F784dB2e1daf",
    },
  },
  {
    id: "eth",
    label: "Ether",
    symbol: "ETH",
    type: "native",
    supportedChains: [1, 11155111, 8453],
  },
  {
    id: "bnb",
    label: "BNB",
    symbol: "BNB",
    type: "native",
    supportedChains: [56],
  },
];

const formatChainName = (chainId?: number) => {
  if (!chainId) return "Unknown Network";
  switch (chainId) {
    case 1:
      return "Ethereum";
    case 56:
      return "BNB Smart Chain";
    case 8453:
      return "Base";
    case 11155111:
      return "Sepolia";
    case 59141:
      return "Linea Sepolia";
    default:
      return `Chain ${chainId}`;
  }
};

export const UsdtBalanceCard = () => {
  const { address, chain } = useAccount();
  const [selectedTokenId, setSelectedTokenId] = useState(TOKEN_LIST[0].id);
  const {
    chains: switchableChains,
    switchChain,
    isPending: isSwitching,
    error: switchError,
  } = useSwitchChain();

  const selectedToken = useMemo(
    () => TOKEN_LIST.find((token) => token.id === selectedTokenId),
    [selectedTokenId]
  );

  const eligibleChains = useMemo(() => {
    if (!selectedToken) return [];
    return (switchableChains ?? []).filter((c) =>
      selectedToken.supportedChains.includes(c.id)
    );
  }, [switchableChains, selectedToken]);

  const isChainSupported =
    !!chain && !!selectedToken?.supportedChains.includes(chain.id);

  const tokenAddress =
    selectedToken?.type === "erc20" && chain?.id
      ? selectedToken.addresses?.[chain.id]
      : undefined;

  const shouldFetch =
    Boolean(address) &&
    Boolean(chain?.id) &&
    Boolean(selectedToken) &&
    isChainSupported &&
    (selectedToken?.type === "native" || Boolean(tokenAddress));

  const {
    data: balance,
    isLoading,
    error,
    isFetched,
  } = useBalance({
    address,
    token: selectedToken?.type === "native" ? undefined : tokenAddress,
    chainId: chain?.id,
    query: {
      enabled: shouldFetch,
      refetchInterval: 15_000,
    },
  });
  console.log(balance, "/balancebalancebalance");

  return (
    <div className="rounded-xl border p-6 shadow-sm space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Connected Wallet</p>
          {address ? (
            <p className="font-mono text-sm break-all">{address}</p>
          ) : (
            <p className="text-sm text-muted-foreground">
              Connect a wallet to view balances.
            </p>
          )}
        </div>
        <span className="text-xs rounded-full border px-2 py-0.5 text-muted-foreground">
          {formatChainName(chain?.id)}
        </span>
      </div>

      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">Select Token</p>
        <Select value={selectedTokenId} onValueChange={setSelectedTokenId}>
          <SelectTrigger>
            <SelectValue placeholder="Choose token" />
          </SelectTrigger>
          <SelectContent>
            {TOKEN_LIST.map((token) => (
              <SelectItem key={token.id} value={token.id}>
                {token.symbol} - {token.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <div className="space-y-2 mb-4">
          <p className="text-sm text-muted-foreground">Switch Network</p>
          <Select
            value={chain?.id ? String(chain.id) : undefined}
            onValueChange={(value) => {
              const targetId = Number(value);
              if (targetId === chain?.id) return;
              switchChain?.({ chainId: targetId });
            }}
            disabled={
              !address ||
              eligibleChains.length === 0 ||
              isSwitching ||
              !switchChain
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select network" />
            </SelectTrigger>
            <SelectContent>
              {eligibleChains.map((eligibleChain) => (
                <SelectItem
                  key={eligibleChain.id}
                  value={String(eligibleChain.id)}
                >
                  {formatChainName(eligibleChain.id)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {!address && (
            <p className="text-xs text-muted-foreground">
              Connect a wallet to switch networks.
            </p>
          )}
          {switchError && (
            <p className="text-xs text-destructive">
              Failed to switch network: {switchError.message}
            </p>
          )}
          {isSwitching && (
            <p className="text-xs text-muted-foreground">
              Switching network...
            </p>
          )}
        </div>

        <p className="text-sm text-muted-foreground mb-1">
          {selectedToken?.symbol} Balance
        </p>
        {!address && (
          <p className="text-muted-foreground text-sm">
            Connect your wallet to fetch balances.
          </p>
        )}

        {address && !isChainSupported && (
          <p className="text-sm text-muted-foreground">
            {selectedToken?.symbol} is unavailable on{" "}
            {formatChainName(chain?.id)}. Switch networks to one of:{" "}
            {selectedToken?.supportedChains
              .map((id) => formatChainName(id))
              .join(", ")}
            .
          </p>
        )}

        {address &&
          isChainSupported &&
          selectedToken?.type === "erc20" &&
          !tokenAddress && (
            <p className="text-sm text-muted-foreground">
              No contract configured for {formatChainName(chain?.id)}.
            </p>
          )}

        {shouldFetch && isLoading && (
          <p className="text-lg font-semibold">Loading...</p>
        )}

        {shouldFetch && error && (
          <p className="text-sm text-destructive">
            Failed to load balance: {error.message}
          </p>
        )}

        {shouldFetch && isFetched && balance && (
          <p className="text-3xl font-bold">
            {Number(balance.formatted).toFixed(4)}{" "}
            <span className="text-lg text-muted-foreground">
              {selectedToken?.symbol}
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default UsdtBalanceCard;
