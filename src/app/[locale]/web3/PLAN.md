# Web3 示例项目计划

## 1. 目标

- 在当前项目中建设独立的 Web3 功能示例区，用于后续开发时快速参考与复用。
- Web3 路由与 `(public-layout)` 同级，不放在 `(public-layout)` 目录下。
- 一个功能模块对应一个页面，页面包含：
  - 功能示例（可操作）
  - 功能说明（场景、注意点）
  - 伪代码（流程参考）

## 1.1 技术栈与支持范围（建议）

| 能力 | 建议选型 | 说明 |
|------|----------|------|
| 链交互 / ABI | **viem** | `readContract`、`writeContract`、`multicall`、`watchContractEvent` 等 |
| React 状态与连接 | **wagmi** | `useAccount`、`useConnect`、`useDisconnect`、`useSwitchChain` 等 |
| 钱包 UI 组件库 | **RainbowKit（项目保留依赖）** | 默认保留并可在部分页面使用；**本计划单独提供“页面内不使用 RainbowKit 组件/API”的连接示例** |
| 扫码 / 移动端钱包 | **WalletConnect**（v2） | 通过 wagmi 的 `walletConnect` connector，需配置 `projectId` |
| 登录验签 | **SIWE**（推荐） | `sign-message` / `verify-signature` 对齐真实业务：domain、nonce、过期时间 |

- **支持链**：开发阶段以 Sepolia（或项目选定的测试网）为主；合约地址与 ABI 按 `chainId` 分支管理。
- **布局**：目录固定在 `src/app/[locale]/web3`，URL 为 `/[locale]/web3/...`。Web3 区域采用独立 `layout`（左侧导航 + 右侧内容），并保留顶部 `Web3` 入口，避免重复导航。

## 1.2 不用 RainbowKit 连接钱包（示例要求）

单独一页 **`wallet-connect-wagmi-only`**（或同名路由），与是否在其他地方使用 RainbowKit 无关，用于学习「自己接 UI + wagmi」：

1. **Provider**：根上使用 `WagmiProvider` + `createConfig`（`chains`、`transports`、`connectors`），项目可以继续保留 `@rainbow-me/rainbowkit` 依赖。
2. **连接**：用 `useConnect()`，对 `connectors` 做 `map`，每个 connector 一个按钮（如 **Injected**、可选 **WalletConnect**）。展示 `isPending` / `error`。
3. **断开**：`useDisconnect()`。
4. **状态**：`useAccount()` 展示 `address`、`chainId`、`status`、`connector.name`。
5. **说明区**写清与 RainbowKit 的差异：RainbowKit 封装了 Modal、主题与多钱包列表；本页等价于「ConnectButton 内部的连接逻辑由你手写」。

**可选进阶（同一页第二个 Demo 或子标题）**：**纯 EIP-1193**——`window.ethereum?.request({ method: 'eth_requestAccounts' })`，说明其与 wagmi 的关系（wagmi 的 injected 底层也是 provider），以及为何不推荐在生产里只写裸调、仍建议统一走 wagmi 管理状态。

---

## 2. 路由与目录规划

### 2.1 目录与路由

- 新增目录：`src/app/[locale]/web3/...`
- 路径表现：`/[locale]/web3/...`（与 `(public-layout)` 平级，不放在 `(public-layout)` 下）。

### 2.2 页面结构

- `src/app/[locale]/web3/layout.tsx`  
  - Web3 区域布局（左侧导航 + 右侧内容；可内嵌全站 Header 或仅侧栏 + 内容区）。
- `src/app/[locale]/web3/page.tsx`  
  - Web3 总览页（模块索引 + 技术栈说明链接）。

各模块页（路径与左侧导航一一对应）：

| 路由 | 说明 |
|------|------|
| `web3/wallet-connect/page.tsx` | 钱包连接与断开（若全站已用 RainbowKit，可在此放 ConnectButton 对照） |
| **`web3/wallet-connect-wagmi-only/page.tsx`** | **无 RainbowKit：wagmi `useConnect` + 自建按钮 + EIP-1193 可选** |
| `web3/wallet-account/page.tsx` | 账户信息（地址、链、connector、ENS） |
| **`web3/watch-account-network/page.tsx`** | **监听账户/链变化**（`accountsChanged` / `chainChanged` 与 wagmi 同步表现） |
| `web3/network-switch/page.tsx` | 网络切换与支持链校验 |
| `web3/native-balance/page.tsx` | 原生币余额 |
| `web3/erc20-metadata/page.tsx` | ERC20 name/symbol/decimals |
| `web3/erc20-balance/page.tsx` | ERC20 余额 |
| `web3/erc20-allowance/page.tsx` | allowance 读取（为 approve 铺垫） |
| `web3/contract-read/page.tsx` | 合约只读 `readContract` |
| **`web3/contract-events/page.tsx`** | **合约事件：`watchContractEvent` / 按 block 扫 logs** |
| `web3/multicall/page.tsx` | 批量 multicall |
| `web3/native-transfer/page.tsx` | 原生币转账 |
| `web3/erc20-approve/page.tsx` | ERC20 approve |
| `web3/erc20-transfer/page.tsx` | ERC20 transfer |
| `web3/tx-status/page.tsx` | 交易状态：pending / receipt / fail；可选：加速替换（同 nonce）、确认数 |
| `web3/gas-estimate/page.tsx` | Gas 估算；EIP-1559（maxFee / priority）与 legacy gasPrice 对比说明 |
| `web3/sign-message/page.tsx` | 签名；**推荐含 SIWE 结构化消息示例** |
| `web3/verify-signature/page.tsx` | 前端签名 + **后端 SIWE / personal_sign 验签**（含 nonce、防重放、域名与链校验） |
| `web3/error-handling/page.tsx` | 拒签、RPC、余额不足、nonce 等 |
| `web3/retry-pattern/page.tsx` | 重试、防重复提交、pending 阻塞、UI 禁用 |
| `web3/dev-checklist/page.tsx` | 测试网、RPC、Faucet、**合约部署、ABI 与按 chainId 的 address 配置** |

> 若希望减少页面数，可将 `erc20-metadata` / `erc20-balance` / `erc20-allowance` 合并为一页三节 Demo，但导航上仍建议分锚点或子标题，便于复制单能力。

## 3. 导航改造

- 顶部导航新增 `Web3` 入口，跳转 `/${locale}/web3`。
- Web3 区域内部使用左侧导航切换功能模块。
- 左侧导航与页面路由保持一一对应；**「无 RainbowKit 连接」单独一项**，便于对照学习。

## 4. 功能模块清单（开发常用）

1. 钱包连接与断开（含 **wagmi-only 无 UI 库** 示例）
2. 账户信息读取（地址、链、connector、ENS）
3. **监听账户与网络变化**
4. 网络切换与支持链校验
5. 原生币余额读取
6. ERC20：metadata / 余额 / allowance（拆分或合并展示）
7. 合约只读调用（readContract）
8. **合约事件订阅与历史 logs**
9. 批量读取（multicall）
10. 原生币转账（sendTransaction）
11. ERC20 授权（approve）
12. ERC20 转账（transfer）
13. 交易状态追踪（含 receipt、失败原因、可选替换交易）
14. Gas 估算与费用展示（含 EIP-1559）
15. 消息签名（**SIWE**）
16. 验签流程（前端 + 后端）
17. 常见错误处理
18. 重试与防重复提交（并发点击、幂等）
19. 开发准备清单（**含 ABI、部署、多链 address**）

## 5. 页面模板规范

每个模块页面统一为三段：

1. **Demo 区**：可执行交互 + 关键状态展示  
2. **说明区**：适用场景、参数含义、常见问题与坑点  
3. **伪代码区**：从输入到链上结果的完整流程伪代码  

## 5.2 验签安全规范（新增）

- 验签必须校验完整上下文，不仅是 `signature` 是否可恢复地址。
- 服务端校验项至少包含：
  - `nonce` 一次性使用，成功后立即作废。
  - `nonce` 过期时间（短时有效，超时拒绝）。
  - `domain` 与当前站点一致。
  - `uri` 与预期登录来源匹配。
  - `chainId` 在允许列表内。
  - `address` 与消息声明地址一致（大小写规范化后比较）。
  - `issuedAt` / `expirationTime` 时间窗口校验。
- 服务端验签成功后再创建会话，使用 `httpOnly + secure + sameSite` cookie。
- 统一错误码与提示语，至少覆盖：
  - 签名无效
  - nonce 无效或已使用
  - 消息已过期
  - domain/uri 不匹配
  - chainId 不支持

## 5.1 合约与配置规范（新增）

- 新增统一配置文件：`src/lib/web3/contracts.config.ts`。
- 统一结构建议：
  - 按 `chainId` 维护合约地址映射（如 `erc20`, `demoContract`）。
  - ABI 集中放在 `src/lib/web3/abi/*`，页面按模块引用。
  - 测试 Token、Spender、Receiver 示例地址与说明集中维护，避免散落到各页面。
- 页面禁止硬编码主配置（地址、ABI、链 ID），全部从配置层读取，保证示例可迁移。

## 6. 分阶段实施

### Phase 1：骨架搭建

- 新增 `src/app/[locale]/web3` 与 Web3 `layout`、总览页
- 增加顶部 `Web3` 入口
- 配置 **wagmi + viem**（`WagmiProvider`、`queryClient`）；项目默认保留 RainbowKit 依赖，同时不阻塞 wagmi-only 页面
- 产出页面模板（Demo / 说明 / 伪代码）
- 建立 `contracts.config.ts` 与 `abi` 目录骨架
- 建立 Web3 i18n 命名空间（如 `web3.*`）及中英文基础 key

### Phase 2：钱包 / 网络 / 读链

- `wallet-connect` + **`wallet-connect-wagmi-only`（优先实现，满足「不用 RainbowKit」学习）**
- `wallet-account` + **`watch-account-network`**
- `network-switch`
- `native-balance` / `erc20-metadata` / `erc20-balance` / `erc20-allowance`
- `contract-read` + **`contract-events`** + `multicall`
- 补齐 Phase 2 新增页面的 i18n 文案键（`zh/en` 同步）

### Phase 3：写链与交易追踪

- `native-transfer` / `erc20-approve` / `erc20-transfer`
- `tx-status` / `gas-estimate`
- 完成交易类页面错误码与提示文案国际化

### Phase 4：签名与鲁棒性

- `sign-message`（SIWE）/ `verify-signature`（后端）
- `error-handling` / `retry-pattern` / `dev-checklist`（合约与 ABI）
- 实现验签安全基线：nonce 机制、防重放、上下文字段校验、会话 cookie 策略

### Phase 5：收口与文档

- 所有模块补齐说明与伪代码
- 统一错误提示与交互反馈
- 完善 `.env.example`（如 `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`、RPC）与 README 的 Web3 章节
- **文档中明确**：连接钱包的两种方式——RainbowKit（项目默认方案）与 **wagmi-only 自建 UI** 的适用场景
- 增加“验签安全清单”：验签字段、错误码、会话策略、重放攻击防护
- 校验 `zh/en` 是否覆盖所有 Web3 页面标题、按钮、错误提示与说明文案

## 7. 验收标准

- 顶部导航可进入 Web3。
- Web3 区域左侧菜单可切换全部模块页面（含 **wallet-connect-wagmi-only**）。
- **`wallet-connect-wagmi-only` 页**：在项目保留 RainbowKit 依赖前提下，页面本身不使用 RainbowKit 组件/API，也可完成连接 / 断开 / 账户展示；说明区写清与 RainbowKit 的差异。
- `verify-signature` 具备安全校验能力：`nonce` 一次性与过期、`domain/uri/chainId/address` 校验、时间窗口校验、成功后签发安全会话 cookie。
- 验签失败返回可区分错误码，前端能做可读提示与重试引导。
- 每个模块页面都包含：功能示例、说明、伪代码。
- 模块可独立复用，方便后续业务直接复制。
