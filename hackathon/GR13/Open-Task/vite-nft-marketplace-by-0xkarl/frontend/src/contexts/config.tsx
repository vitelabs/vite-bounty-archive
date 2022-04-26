import React, {
  FC,
  useContext,
  createContext,
  ReactNode,
  useMemo,
} from 'react';
import { Network, useViteProvider } from '@react-vite';

const BAYC_CONTRACT_ADDRESSES: Record<Network, string> = {
  mainnet: '',
  testnet: 'vite_a6b7ca14d5ce26c7f0356b2b128ef5769356d9aa727acb4542',
  localnet: 'vite_129c940d475daf59569437bffb701e1b078daad68d78e58489',
};

const MARKETPLACE_CONTRACT_ADDRESSES: Record<
  Network,
  string
> = BAYC_CONTRACT_ADDRESSES;

// const MARKETPLACE_CONTRACT_ADDRESSES: Record<Network, string> = {
//   mainnet: '',
//   testnet: '',
//   localnet: 'vite_129c940d475daf59569437bffb701e1b078daad68d78e58489',
// };

const ConfigContext = createContext<{
  baycContractAddress: string;
  marketplaceContractAddress: string;
} | null>(null);

export const ConfigProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { network } = useViteProvider();
  const baycContractAddress = useMemo(() => BAYC_CONTRACT_ADDRESSES[network], [
    network,
  ]);
  const marketplaceContractAddress = useMemo(
    () => MARKETPLACE_CONTRACT_ADDRESSES[network],
    [network]
  );

  return (
    <ConfigContext.Provider
      value={{
        baycContractAddress,
        marketplaceContractAddress,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
};

export function useConfig() {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error('Missing Config context');
  }
  return context;
}
