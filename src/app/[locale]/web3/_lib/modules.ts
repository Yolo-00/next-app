export type Web3Module = {
  slug: string;
  title: string;
  summary: string;
  pseudocode: string[];
  interactive: boolean;
};

export const WEB3_MODULES: Web3Module[] = [
  {
    slug: "wallet-connect",
    title: "Wallet Connect",
    summary: "Connect/disconnect wallet using project default RainbowKit flow.",
    pseudocode: [
      "if wallet not connected -> open connect modal",
      "on success -> read address and active chain",
      "allow user to disconnect and clear local session state",
    ],
    interactive: true,
  },
  {
    slug: "wallet-connect-wagmi-only",
    title: "Wallet Connect (Wagmi Only)",
    summary:
      "Connect wallets with wagmi hooks directly, without RainbowKit UI components.",
    pseudocode: [
      "load connectors from useConnect()",
      "render one button per connector",
      "call connect({ connector }) and observe status/error",
      "call disconnect() when user clicks disconnect",
    ],
    interactive: true,
  },
  {
    slug: "wallet-account",
    title: "Wallet Account",
    summary: "Read account metadata: address, connector, chain id, and status.",
    pseudocode: [
      "read account from useAccount()",
      "if connected -> show address, chainId, connector name",
      "if disconnected -> show guidance to connect first",
    ],
    interactive: true,
  },
  {
    slug: "watch-account-network",
    title: "Watch Account & Network",
    summary: "Observe account/network changes and append logs for debugging.",
    pseudocode: [
      "subscribe to address and chainId changes",
      "when changed -> push timestamped log entry",
      "use logs for debugging connector/network edge cases",
    ],
    interactive: true,
  },
  {
    slug: "network-switch",
    title: "Network Switch",
    summary: "Switch chain and validate if the target chain is supported.",
    pseudocode: [
      "read current chainId",
      "render supported chains list",
      "on click -> switchChain({ chainId })",
      "handle rejected switch and unsupported chain errors",
    ],
    interactive: true,
  },
  {
    slug: "native-balance",
    title: "Native Balance",
    summary: "Read native coin balance for connected account.",
    pseudocode: [
      "if account connected -> query useBalance({ address })",
      "render formatted amount + symbol",
      "support manual refresh for demo feedback",
    ],
    interactive: true,
  },
  {
    slug: "erc20-metadata",
    title: "ERC20 Metadata",
    summary: "Read ERC20 name/symbol/decimals from contract.",
    pseudocode: [
      "input token address",
      "call readContract(name/symbol/decimals)",
      "handle invalid contract or non-ERC20 errors",
    ],
    interactive: false,
  },
  {
    slug: "erc20-balance",
    title: "ERC20 Balance",
    summary: "Read ERC20 balance for owner address.",
    pseudocode: [
      "input token + owner address",
      "call readContract(balanceOf(owner))",
      "format units with decimals before rendering",
    ],
    interactive: false,
  },
  {
    slug: "erc20-allowance",
    title: "ERC20 Allowance",
    summary: "Read allowance(owner, spender) for approval workflows.",
    pseudocode: [
      "input token + owner + spender",
      "call readContract(allowance(owner, spender))",
      "display allowance and compare with required spend amount",
    ],
    interactive: false,
  },
  {
    slug: "contract-read",
    title: "Contract Read",
    summary: "General readContract pattern for custom contract methods.",
    pseudocode: [
      "select contract + method + args",
      "call readContract with ABI and functionName",
      "map raw response into UI-friendly values",
    ],
    interactive: false,
  },
  {
    slug: "contract-events",
    title: "Contract Events",
    summary: "Watch events and query historical logs by block range.",
    pseudocode: [
      "watch contract event stream for live updates",
      "optionally query past logs with fromBlock/toBlock",
      "decode and render event payloads",
    ],
    interactive: false,
  },
  {
    slug: "multicall",
    title: "Multicall",
    summary: "Batch read multiple contracts/functions in a single request.",
    pseudocode: [
      "prepare contracts[] calls",
      "invoke multicall",
      "map result array to cards/table UI",
    ],
    interactive: false,
  },
  {
    slug: "native-transfer",
    title: "Native Transfer",
    summary: "Send native token transaction and show hash/receipt lifecycle.",
    pseudocode: [
      "validate to-address and amount",
      "call sendTransaction({ to, value })",
      "wait for receipt and update status",
    ],
    interactive: false,
  },
  {
    slug: "erc20-approve",
    title: "ERC20 Approve",
    summary: "Approve spender amount for token spending.",
    pseudocode: [
      "input token/spender/amount",
      "call writeContract(approve)",
      "wait receipt then refresh allowance",
    ],
    interactive: false,
  },
  {
    slug: "erc20-transfer",
    title: "ERC20 Transfer",
    summary: "Transfer ERC20 token using writeContract(transfer).",
    pseudocode: [
      "input token/to/amount",
      "encode amount by decimals",
      "send transfer tx and wait confirmation",
    ],
    interactive: false,
  },
  {
    slug: "tx-status",
    title: "Transaction Status",
    summary: "Track tx lifecycle: pending, confirmed, failed, replacement.",
    pseudocode: [
      "start from transaction hash",
      "poll or wait for receipt",
      "derive final status and confirmations",
    ],
    interactive: false,
  },
  {
    slug: "gas-estimate",
    title: "Gas Estimate",
    summary: "Compare EIP-1559 and legacy gas estimation strategies.",
    pseudocode: [
      "estimate gas limit for call",
      "read fee data (maxFee/maxPriority)",
      "show expected fee range before submit",
    ],
    interactive: false,
  },
  {
    slug: "sign-message",
    title: "Sign Message",
    summary: "Sign plain message or SIWE-style payload from connected wallet.",
    pseudocode: [
      "compose message payload",
      "call signMessageAsync({ message })",
      "store signature for backend verification",
    ],
    interactive: true,
  },
  {
    slug: "verify-signature",
    title: "Verify Signature",
    summary:
      "Backend verification with nonce replay protection and context checks.",
    pseudocode: [
      "GET nonce from backend",
      "sign message containing nonce/domain/chain",
      "POST signature payload for server verification",
      "on success -> create secure session cookie",
    ],
    interactive: true,
  },
  {
    slug: "error-handling",
    title: "Error Handling",
    summary:
      "Map wallet/RPC/contract failures into stable UI error codes and tips.",
    pseudocode: [
      "catch error from hooks/actions",
      "normalize to app error code",
      "display actionable message + retry suggestion",
    ],
    interactive: false,
  },
  {
    slug: "retry-pattern",
    title: "Retry Pattern",
    summary: "Prevent duplicate submits and provide safe retry UX.",
    pseudocode: [
      "disable submit while pending",
      "keep idempotent request key for retries",
      "allow retry only when previous attempt resolved",
    ],
    interactive: false,
  },
  {
    slug: "dev-checklist",
    title: "Dev Checklist",
    summary: "Checklist for RPC, faucet, ABI, addresses, and test accounts.",
    pseudocode: [
      "verify env vars and RPC endpoints",
      "verify contract address per chainId",
      "run smoke tests for connect/read/write/sign flow",
    ],
    interactive: false,
  },
];

export function getWeb3Module(slug: string) {
  return WEB3_MODULES.find((item) => item.slug === slug);
}

