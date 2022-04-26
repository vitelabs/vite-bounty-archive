import { useContext, createContext } from 'react';

import { WS_RPC } from '../vite';
import { Network } from '../types';

export const ViteProviderContext = createContext<{
  network: string;
  setNetwork: (s: Network) => void;
  baseBlockexplorerUrl: string;
  provider: typeof WS_RPC;
} | null>(null);

export const ViteWalletContext = createContext<{
  walletAddress: string | null;
  connect: () => void;
  createAccountBlock: (typ: string, params: any) => any;
} | null>(null);

export function useViteProvider() {
  const context = useContext(ViteProviderContext);
  if (!context) {
    throw new Error('Missing ViteProvider context');
  }
  return context;
}

export function useViteWallet() {
  const context = useContext(ViteWalletContext);
  if (!context) {
    throw new Error('Missing ViteWallet context');
  }
  return context;
}
