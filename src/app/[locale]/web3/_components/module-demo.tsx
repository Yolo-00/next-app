"use client";

import { useEffect, useMemo, useState, type ComponentType } from "react";
import { useTranslations } from "next-intl";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  useAccount,
  useBalance,
  useChainId,
  useConnect,
  useDisconnect,
  useSwitchChain,
  useSignMessage,
  useReadContract,
  useReadContracts,
  useWriteContract,
  useWaitForTransactionReceipt,
  useSendTransaction,
  useEstimateGas,
  useEstimateFeesPerGas,
  useEnsName,
  useWatchContractEvent,
} from "wagmi";
import {
  formatUnits,
  isAddress,
  parseEther,
  parseUnits,
  zeroAddress,
  type Address,
} from "viem";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { erc20Abi } from "@/lib/web3/abi/erc20";
import { contractsByChainId } from "@/lib/web3/contracts.config";

function asAddress(value: string): Address | undefined {
  return isAddress(value) ? (value as Address) : undefined;
}

function defaultToken(chainId?: number): Address {
  const byChain = chainId ? contractsByChainId[chainId] : undefined;
  return byChain?.erc20DemoToken?.address ?? zeroAddress;
}

function SimpleNotice({ message }: { message: string }) {
  return <p className="text-sm text-muted-foreground">{message}</p>;
}

function WalletConnectWagmiDemo() {
  const t = useTranslations("web3");
  const { connectors, connect, status, error } = useConnect();
  const { disconnect } = useDisconnect();
  const { address, isConnected } = useAccount();

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {connectors.map((connector) => (
          <Button
            key={connector.uid}
            variant="outline"
            onClick={() => connect({ connector })}
          >
            {t("actions.connect")} {connector.name}
          </Button>
        ))}
        <Button variant="secondary" onClick={() => disconnect()}>
          {t("actions.disconnect")}
        </Button>
      </div>
      <p className="text-sm">
        {t("demo_labels.status")}: {status}
      </p>
      <p className="text-sm">
        {t("demo_labels.connected")}: {isConnected ? t("common.yes") : t("common.no")}
      </p>
      {address && (
        <p className="text-sm break-all">
          {t("demo_labels.address")}: {address}
        </p>
      )}
      {error && (
        <p className="text-sm text-destructive">
          {t("demo_labels.error")}: {error.message}
        </p>
      )}
    </div>
  );
}

function WalletConnectRainbowDemo() {
  const t = useTranslations("web3");
  const { disconnect } = useDisconnect();
  const { status, address, chainId } = useAccount();

  return (
    <div className="space-y-3">
      <ConnectButton />
      <div className="space-y-1 text-sm">
        <p>
          {t("demo_labels.status")}: {status}
        </p>
        <p className="break-all">
          {t("demo_labels.address")}: {address ?? "-"}
        </p>
        <p>
          {t("demo_labels.chain_id")}: {chainId ?? "-"}
        </p>
      </div>
      <Button variant="secondary" onClick={() => disconnect()}>
        {t("actions.disconnect")}
      </Button>
      <p className="text-xs text-muted-foreground">{t("messages.rainbow_compare_note")}</p>
    </div>
  );
}

function WalletAccountDemo() {
  const t = useTranslations("web3");
  const { address, chainId, status, connector } = useAccount();
  const { data: ensName } = useEnsName({ address });

  return (
    <div className="space-y-2 text-sm">
      <p>
        {t("demo_labels.status")}: {status}
      </p>
      <p className="break-all">
        {t("demo_labels.address")}: {address ?? "-"}
      </p>
      <p>
        {t("demo_labels.chain_id")}: {chainId ?? "-"}
      </p>
      <p>
        {t("demo_labels.connector")}: {connector?.name ?? "-"}
      </p>
      <p>ENS: {ensName ?? "-"}</p>
    </div>
  );
}

function WatchAccountNetworkDemo() {
  const t = useTranslations("web3");
  const { address } = useAccount();
  const chainId = useChainId();
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    setLogs((prev) => [`${new Date().toLocaleTimeString()} account: ${address ?? "none"}`, ...prev]);
  }, [address]);

  useEffect(() => {
    setLogs((prev) => [`${new Date().toLocaleTimeString()} chain: ${chainId}`, ...prev]);
  }, [chainId]);

  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">{t("messages.switch_wallet_hint")}</p>
      <div className="rounded-md bg-muted p-3 text-xs space-y-2 max-h-52 overflow-auto">
        {logs.length === 0 && <p>{t("messages.no_logs")}</p>}
        {logs.map((log, idx) => (
          <p key={`${log}-${idx}`}>{log}</p>
        ))}
      </div>
    </div>
  );
}

function NetworkSwitchDemo() {
  const t = useTranslations("web3");
  const { chains, switchChain, status, error } = useSwitchChain();
  const activeChainId = useChainId();

  return (
    <div className="space-y-3">
      <p className="text-sm">
        {t("demo_labels.current_chain_id")}: {activeChainId}
      </p>
      <div className="flex flex-wrap gap-2">
        {chains.map((chain) => (
          <Button
            key={chain.id}
            variant={activeChainId === chain.id ? "default" : "outline"}
            onClick={() => switchChain({ chainId: chain.id })}
          >
            {chain.name}
          </Button>
        ))}
      </div>
      <p className="text-sm">
        {t("demo_labels.status")}: {status}
      </p>
      {error && <p className="text-sm text-destructive">{t("demo_labels.error")}: {error.message}</p>}
    </div>
  );
}

function NativeBalanceDemo() {
  const t = useTranslations("web3");
  const { address, isConnected } = useAccount();
  const { data, isLoading, refetch, error } = useBalance({
    address,
    query: { enabled: isConnected && !!address },
  });

  return (
    <div className="space-y-3">
      <p className="text-sm break-all">
        {t("demo_labels.address")}: {address ?? "-"}
      </p>
      <p className="text-sm">
        {t("demo_labels.balance")}: {isLoading ? t("common.loading") : data ? `${data.formatted} ${data.symbol}` : "-"}
      </p>
      <Button variant="outline" onClick={() => refetch()}>
        {t("actions.refresh")}
      </Button>
      {error && <p className="text-sm text-destructive">{t("demo_labels.error")}: {error.message}</p>}
    </div>
  );
}

function Erc20MetadataDemo() {
  const [tokenInput, setTokenInput] = useState("");
  const chainId = useChainId();
  const token = asAddress(tokenInput) ?? defaultToken(chainId);
  const enabled = token !== zeroAddress;

  const nameRead = useReadContract({
    abi: erc20Abi,
    address: token,
    functionName: "name",
    query: { enabled },
  });
  const symbolRead = useReadContract({
    abi: erc20Abi,
    address: token,
    functionName: "symbol",
    query: { enabled },
  });
  const decimalsRead = useReadContract({
    abi: erc20Abi,
    address: token,
    functionName: "decimals",
    query: { enabled },
  });

  return (
    <div className="space-y-3">
      <Input value={tokenInput} onChange={(e) => setTokenInput(e.target.value)} placeholder="Token address (0x...)" />
      {!enabled && <SimpleNotice message="Please provide a valid token address or configure demo token address." />}
      <p className="text-sm">name: {String(nameRead.data ?? "-")}</p>
      <p className="text-sm">symbol: {String(symbolRead.data ?? "-")}</p>
      <p className="text-sm">decimals: {String(decimalsRead.data ?? "-")}</p>
      {(nameRead.error || symbolRead.error || decimalsRead.error) && (
        <p className="text-sm text-destructive">Error reading token metadata.</p>
      )}
    </div>
  );
}

function Erc20BalanceDemo() {
  const { address } = useAccount();
  const chainId = useChainId();
  const [tokenInput, setTokenInput] = useState("");
  const token = asAddress(tokenInput) ?? defaultToken(chainId);
  const enabled = token !== zeroAddress && !!address;

  const decimalsRead = useReadContract({
    abi: erc20Abi,
    address: token,
    functionName: "decimals",
    query: { enabled },
  });
  const balanceRead = useReadContract({
    abi: erc20Abi,
    address: token,
    functionName: "balanceOf",
    args: [address ?? zeroAddress],
    query: { enabled },
  });

  const amount = useMemo(() => {
    if (!balanceRead.data || !decimalsRead.data) return "-";
    return formatUnits(balanceRead.data as bigint, Number(decimalsRead.data));
  }, [balanceRead.data, decimalsRead.data]);

  return (
    <div className="space-y-3">
      <Input value={tokenInput} onChange={(e) => setTokenInput(e.target.value)} placeholder="Token address (0x...)" />
      <p className="text-sm break-all">Owner: {address ?? "-"}</p>
      <p className="text-sm">Balance: {amount}</p>
    </div>
  );
}

function Erc20AllowanceDemo() {
  const { address } = useAccount();
  const chainId = useChainId();
  const [tokenInput, setTokenInput] = useState("");
  const [spenderInput, setSpenderInput] = useState("");
  const token = asAddress(tokenInput) ?? defaultToken(chainId);
  const spender = asAddress(spenderInput) ?? zeroAddress;
  const enabled = token !== zeroAddress && !!address && spender !== zeroAddress;

  const decimalsRead = useReadContract({
    abi: erc20Abi,
    address: token,
    functionName: "decimals",
    query: { enabled },
  });
  const allowanceRead = useReadContract({
    abi: erc20Abi,
    address: token,
    functionName: "allowance",
    args: [address ?? zeroAddress, spender],
    query: { enabled },
  });

  const allowance = useMemo(() => {
    if (!allowanceRead.data || !decimalsRead.data) return "-";
    return formatUnits(allowanceRead.data as bigint, Number(decimalsRead.data));
  }, [allowanceRead.data, decimalsRead.data]);

  return (
    <div className="space-y-3">
      <Input value={tokenInput} onChange={(e) => setTokenInput(e.target.value)} placeholder="Token address" />
      <Input value={spenderInput} onChange={(e) => setSpenderInput(e.target.value)} placeholder="Spender address" />
      <p className="text-sm">Allowance: {allowance}</p>
    </div>
  );
}

function ContractReadDemo() {
  return <Erc20MetadataDemo />;
}

function ContractEventsDemo() {
  const [tokenInput, setTokenInput] = useState("");
  const chainId = useChainId();
  const token = asAddress(tokenInput) ?? defaultToken(chainId);
  const enabled = token !== zeroAddress;
  const [logs, setLogs] = useState<string[]>([]);

  useWatchContractEvent({
    abi: erc20Abi,
    address: token,
    eventName: "Transfer",
    enabled,
    onLogs(newLogs) {
      setLogs((prev) => {
        const next = newLogs.map((log) => {
          const args = log.args as { from?: Address; to?: Address; value?: bigint };
          return `${new Date().toLocaleTimeString()} from:${args.from} to:${args.to} value:${args.value?.toString()}`;
        });
        return [...next, ...prev].slice(0, 30);
      });
    },
  });

  return (
    <div className="space-y-3">
      <Input value={tokenInput} onChange={(e) => setTokenInput(e.target.value)} placeholder="Token address" />
      <div className="rounded-md bg-muted p-3 text-xs space-y-2 max-h-56 overflow-auto">
        {logs.length === 0 && <p>No transfer logs yet.</p>}
        {logs.map((log, idx) => (
          <p key={`${log}-${idx}`}>{log}</p>
        ))}
      </div>
    </div>
  );
}

function MulticallDemo() {
  const { address } = useAccount();
  const chainId = useChainId();
  const [tokenInput, setTokenInput] = useState("");
  const token = asAddress(tokenInput) ?? defaultToken(chainId);
  const enabled = token !== zeroAddress && !!address;

  const contracts = [
    { abi: erc20Abi, address: token, functionName: "symbol" },
    { abi: erc20Abi, address: token, functionName: "decimals" },
    { abi: erc20Abi, address: token, functionName: "balanceOf", args: [address ?? zeroAddress] },
  ] as const;

  const { data, error } = useReadContracts({ contracts, query: { enabled } });

  const symbol = data?.[0]?.result ? String(data[0].result) : "-";
  const decimals = data?.[1]?.result ? Number(data[1].result) : 18;
  const rawBalance = (data?.[2]?.result as bigint | undefined) ?? BigInt(0);

  return (
    <div className="space-y-3">
      <Input value={tokenInput} onChange={(e) => setTokenInput(e.target.value)} placeholder="Token address" />
      <p className="text-sm">symbol: {symbol}</p>
      <p className="text-sm">decimals: {decimals}</p>
      <p className="text-sm">balance: {formatUnits(rawBalance, decimals)}</p>
      {error && <p className="text-sm text-destructive">{error.message}</p>}
    </div>
  );
}

function NativeTransferDemo() {
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("0.001");
  const [hash, setHash] = useState<`0x${string}` | undefined>();
  const { sendTransactionAsync, isPending, error } = useSendTransaction();
  const receipt = useWaitForTransactionReceipt({ hash, query: { enabled: !!hash } });

  const onSend = async () => {
    const toAddress = asAddress(to);
    if (!toAddress) return;
    const txHash = await sendTransactionAsync({ to: toAddress, value: parseEther(amount || "0") });
    setHash(txHash);
  };

  return (
    <div className="space-y-3">
      <Input value={to} onChange={(e) => setTo(e.target.value)} placeholder="To address" />
      <Input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount (ETH)" />
      <Button onClick={onSend} disabled={!asAddress(to) || isPending}>
        {isPending ? "Sending..." : "Send"}
      </Button>
      <p className="text-sm break-all">Hash: {hash ?? "-"}</p>
      <p className="text-sm">Receipt: {receipt.isSuccess ? "confirmed" : receipt.isLoading ? "pending" : "-"}</p>
      {error && <p className="text-sm text-destructive">{error.message}</p>}
    </div>
  );
}

function Erc20ApproveDemo() {
  const chainId = useChainId();
  const [tokenInput, setTokenInput] = useState("");
  const [spenderInput, setSpenderInput] = useState("");
  const [amount, setAmount] = useState("1");
  const token = asAddress(tokenInput) ?? defaultToken(chainId);
  const spender = asAddress(spenderInput);

  const { data: decimals = 18 } = useReadContract({
    abi: erc20Abi,
    address: token,
    functionName: "decimals",
    query: { enabled: token !== zeroAddress },
  });
  const { writeContractAsync, isPending, error } = useWriteContract();
  const [hash, setHash] = useState<`0x${string}` | undefined>();
  const receipt = useWaitForTransactionReceipt({ hash, query: { enabled: !!hash } });

  const onApprove = async () => {
    if (!spender || token === zeroAddress) return;
    const txHash = await writeContractAsync({
      abi: erc20Abi,
      address: token,
      functionName: "approve",
      args: [spender, parseUnits(amount || "0", Number(decimals))],
    });
    setHash(txHash);
  };

  return (
    <div className="space-y-3">
      <Input value={tokenInput} onChange={(e) => setTokenInput(e.target.value)} placeholder="Token address" />
      <Input value={spenderInput} onChange={(e) => setSpenderInput(e.target.value)} placeholder="Spender address" />
      <Input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" />
      <Button onClick={onApprove} disabled={!spender || token === zeroAddress || isPending}>
        {isPending ? "Submitting..." : "Approve"}
      </Button>
      <p className="text-sm break-all">Hash: {hash ?? "-"}</p>
      <p className="text-sm">Receipt: {receipt.isSuccess ? "confirmed" : receipt.isLoading ? "pending" : "-"}</p>
      {error && <p className="text-sm text-destructive">{error.message}</p>}
    </div>
  );
}

function Erc20TransferDemo() {
  const chainId = useChainId();
  const [tokenInput, setTokenInput] = useState("");
  const [toInput, setToInput] = useState("");
  const [amount, setAmount] = useState("1");
  const token = asAddress(tokenInput) ?? defaultToken(chainId);
  const to = asAddress(toInput);

  const { data: decimals = 18 } = useReadContract({
    abi: erc20Abi,
    address: token,
    functionName: "decimals",
    query: { enabled: token !== zeroAddress },
  });
  const { writeContractAsync, isPending, error } = useWriteContract();
  const [hash, setHash] = useState<`0x${string}` | undefined>();
  const receipt = useWaitForTransactionReceipt({ hash, query: { enabled: !!hash } });

  const onTransfer = async () => {
    if (!to || token === zeroAddress) return;
    const txHash = await writeContractAsync({
      abi: erc20Abi,
      address: token,
      functionName: "transfer",
      args: [to, parseUnits(amount || "0", Number(decimals))],
    });
    setHash(txHash);
  };

  return (
    <div className="space-y-3">
      <Input value={tokenInput} onChange={(e) => setTokenInput(e.target.value)} placeholder="Token address" />
      <Input value={toInput} onChange={(e) => setToInput(e.target.value)} placeholder="Recipient address" />
      <Input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" />
      <Button onClick={onTransfer} disabled={!to || token === zeroAddress || isPending}>
        {isPending ? "Submitting..." : "Transfer"}
      </Button>
      <p className="text-sm break-all">Hash: {hash ?? "-"}</p>
      <p className="text-sm">Receipt: {receipt.isSuccess ? "confirmed" : receipt.isLoading ? "pending" : "-"}</p>
      {error && <p className="text-sm text-destructive">{error.message}</p>}
    </div>
  );
}

function TxStatusDemo() {
  const [hashInput, setHashInput] = useState("");
  const hash = hashInput.startsWith("0x") && hashInput.length > 10 ? (hashInput as `0x${string}`) : undefined;
  const receipt = useWaitForTransactionReceipt({ hash, query: { enabled: !!hash } });

  return (
    <div className="space-y-3">
      <Input value={hashInput} onChange={(e) => setHashInput(e.target.value)} placeholder="Transaction hash" />
      <p className="text-sm">pending: {receipt.isLoading ? "yes" : "no"}</p>
      <p className="text-sm">success: {receipt.isSuccess ? "yes" : "no"}</p>
      <p className="text-sm">error: {receipt.isError ? "yes" : "no"}</p>
      {receipt.data?.blockNumber && <p className="text-sm">block: {receipt.data.blockNumber.toString()}</p>}
    </div>
  );
}

function GasEstimateDemo() {
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("0.001");
  const toAddress = asAddress(to);
  const estimate = useEstimateGas({
    to: toAddress,
    value: toAddress ? parseEther(amount || "0") : undefined,
    query: { enabled: !!toAddress },
  });
  const fees = useEstimateFeesPerGas();

  return (
    <div className="space-y-3 text-sm">
      <Input value={to} onChange={(e) => setTo(e.target.value)} placeholder="To address" />
      <Input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount (ETH)" />
      <p>gasLimit: {estimate.data ? estimate.data.toString() : "-"}</p>
      <p>maxFeePerGas: {fees.data?.maxFeePerGas ? formatUnits(fees.data.maxFeePerGas, 9) + " gwei" : "-"}</p>
      <p>maxPriorityFeePerGas: {fees.data?.maxPriorityFeePerGas ? formatUnits(fees.data.maxPriorityFeePerGas, 9) + " gwei" : "-"}</p>
      {(estimate.error || fees.error) && <p className="text-destructive">Estimate error.</p>}
    </div>
  );
}

function SignMessageDemo() {
  const t = useTranslations("web3");
  const { isConnected } = useAccount();
  const [message, setMessage] = useState(t("messages.default_sign_message"));
  const [signature, setSignature] = useState("");
  const { signMessageAsync, isPending, error } = useSignMessage();

  const onSign = async () => {
    if (!isConnected) return;
    const sig = await signMessageAsync({ message });
    setSignature(sig);
  };

  return (
    <div className="space-y-3">
      <Input value={message} onChange={(e) => setMessage(e.target.value)} />
      <Button onClick={onSign} disabled={!isConnected || isPending}>
        {isPending ? t("common.signing") : t("actions.sign_message")}
      </Button>
      {signature && <p className="text-xs break-all rounded-md bg-muted p-3">{signature}</p>}
      {error && <p className="text-sm text-destructive">{t("demo_labels.error")}: {error.message}</p>}
    </div>
  );
}

function VerifySignatureDemo() {
  const t = useTranslations("web3");
  const { address, chainId, isConnected } = useAccount();
  const [nonce, setNonce] = useState("");
  const [result, setResult] = useState("");
  const [message, setMessage] = useState("");
  const { signMessageAsync, isPending, error } = useSignMessage();

  const loadNonce = async () => {
    const res = await fetch("/api/web3/nonce");
    const data = await res.json();
    setNonce(data.nonce ?? "");
  };

  useEffect(() => {
    loadNonce().catch(() => setNonce(""));
  }, []);

  useEffect(() => {
    if (!address || !nonce) return;
    const domain = window.location.host;
    const uri = window.location.origin;
    setMessage(`Demo verify\naddress:${address}\nchainId:${chainId ?? ""}\nnonce:${nonce}\ndomain:${domain}\nuri:${uri}`);
  }, [address, chainId, nonce]);

  const verify = async () => {
    if (!address || !message) return;
    const signature = await signMessageAsync({ message });
    const body = {
      message,
      signature,
      address,
      nonce,
      domain: window.location.host,
      uri: window.location.origin,
      chainId,
      issuedAt: new Date().toISOString(),
      expirationTime: new Date(Date.now() + 5 * 60 * 1000).toISOString(),
    };
    const res = await fetch("/api/web3/verify-signature", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    setResult(JSON.stringify(data, null, 2));
  };

  return (
    <div className="space-y-3">
      <p className="text-sm">{t("demo_labels.nonce")}: {nonce || "-"}</p>
      <Button variant="outline" onClick={loadNonce}>{t("actions.refresh_nonce")}</Button>
      <Input value={message} onChange={(e) => setMessage(e.target.value)} />
      <Button onClick={verify} disabled={!isConnected || isPending || !nonce}>
        {isPending ? t("common.signing") : t("actions.sign_and_verify")}
      </Button>
      {result && <pre className="text-xs bg-muted rounded-md p-3 overflow-x-auto">{result}</pre>}
      {error && <p className="text-sm text-destructive">{t("demo_labels.error")}: {error.message}</p>}
    </div>
  );
}

function ErrorHandlingDemo() {
  const [input, setInput] = useState("");
  const [errorCode, setErrorCode] = useState("-");

  const normalize = (raw: string) => {
    const text = raw.toLowerCase();
    if (text.includes("user rejected") || text.includes("rejected")) return "USER_REJECTED";
    if (text.includes("insufficient funds")) return "INSUFFICIENT_FUNDS";
    if (text.includes("nonce")) return "NONCE_ERROR";
    if (text.includes("network") || text.includes("rpc")) return "NETWORK_ERROR";
    return "UNKNOWN_ERROR";
  };

  return (
    <div className="space-y-3">
      <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Paste wallet/RPC error message" />
      <Button variant="outline" onClick={() => setErrorCode(normalize(input))}>Normalize Error</Button>
      <p className="text-sm">App error code: {errorCode}</p>
    </div>
  );
}

function RetryPatternDemo() {
  const [pending, setPending] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [result, setResult] = useState("-");

  const run = async () => {
    if (pending) return;
    setPending(true);
    setAttempts((v) => v + 1);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setResult(`completed at ${new Date().toLocaleTimeString()}`);
    setPending(false);
  };

  return (
    <div className="space-y-3">
      <Button onClick={run} disabled={pending}>{pending ? "Processing..." : "Submit once"}</Button>
      <Button variant="outline" onClick={run} disabled={pending}>Retry</Button>
      <p className="text-sm">Attempts: {attempts}</p>
      <p className="text-sm">Last result: {result}</p>
    </div>
  );
}

function DevChecklistDemo() {
  const [checks, setChecks] = useState<Record<string, boolean>>({
    rpc: false,
    faucet: false,
    abi: false,
    addresses: false,
    wallet: false,
  });

  const toggle = (key: string) => {
    setChecks((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const items: Array<{ key: string; label: string }> = [
    { key: "rpc", label: "RPC endpoint configured" },
    { key: "faucet", label: "Testnet faucet funded" },
    { key: "abi", label: "ABI file verified" },
    { key: "addresses", label: "Address per chainId configured" },
    { key: "wallet", label: "Wallet connect/read/write smoke-tested" },
  ];

  const done = items.filter((i) => checks[i.key]).length;

  return (
    <div className="space-y-3">
      <p className="text-sm">Progress: {done}/{items.length}</p>
      {items.map((item) => (
        <label key={item.key} className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={checks[item.key] ?? false} onChange={() => toggle(item.key)} />
          {item.label}
        </label>
      ))}
    </div>
  );
}

const interactiveMap: Record<string, ComponentType> = {
  "wallet-connect": WalletConnectRainbowDemo,
  "wallet-connect-wagmi-only": WalletConnectWagmiDemo,
  "wallet-account": WalletAccountDemo,
  "watch-account-network": WatchAccountNetworkDemo,
  "network-switch": NetworkSwitchDemo,
  "native-balance": NativeBalanceDemo,
  "erc20-metadata": Erc20MetadataDemo,
  "erc20-balance": Erc20BalanceDemo,
  "erc20-allowance": Erc20AllowanceDemo,
  "contract-read": ContractReadDemo,
  "contract-events": ContractEventsDemo,
  multicall: MulticallDemo,
  "native-transfer": NativeTransferDemo,
  "erc20-approve": Erc20ApproveDemo,
  "erc20-transfer": Erc20TransferDemo,
  "tx-status": TxStatusDemo,
  "gas-estimate": GasEstimateDemo,
  "sign-message": SignMessageDemo,
  "verify-signature": VerifySignatureDemo,
  "error-handling": ErrorHandlingDemo,
  "retry-pattern": RetryPatternDemo,
  "dev-checklist": DevChecklistDemo,
};

export function ModuleDemo({ slug }: { slug: string; interactive: boolean }) {
  const t = useTranslations("web3");
  const component = useMemo(() => interactiveMap[slug], [slug]);

  if (!component) {
    return <SimpleNotice message={t("coming_soon")} />;
  }

  const DemoComponent = component;
  return <DemoComponent />;
}
