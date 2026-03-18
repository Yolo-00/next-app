export type ContractEntry = {
  name: string;
  address: `0x${string}`;
};

export type ChainContracts = {
  erc20DemoToken?: ContractEntry;
  demoAppContract?: ContractEntry;
};

export const contractsByChainId: Record<number, ChainContracts> = {
  11155111: {
    erc20DemoToken: {
      name: "Sepolia Demo Token",
      address: "0x0000000000000000000000000000000000000000",
    },
  },
  84532: {
    erc20DemoToken: {
      name: "Base Sepolia Demo Token",
      address: "0x0000000000000000000000000000000000000000",
    },
  },
};

export const supportedChains = [11155111, 84532];

