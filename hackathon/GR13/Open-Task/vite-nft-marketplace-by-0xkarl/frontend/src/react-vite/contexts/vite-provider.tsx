import React, { FC, ReactNode, useMemo, useState } from 'react';

import { vite, WS_RPC } from '../vite';
import { Network } from '../types';
import { ViteProviderContext } from './vite';

const VITE_BLOCK_EXPLORERS: Record<Network, string> = {
  // mainnet: 'https://viteview.xyz/#',
  testnet: 'https://buidl.viteview.xyz/#',
  localnet: 'https://viteview.xyz/#',
};

const VITE_PROVIDER_URLS: Record<Network, string> = {
  // mainnet: 'wss://node.vite.net/gvite/ws',
  testnet: 'wss://buidl.vite.net/gvite/ws',
  localnet: 'ws://0.0.0.0:23457',
};

export const ViteProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [network, setNetwork] = useState<Network>(
    import.meta.env.PROD ? 'testnet' : 'localnet'
  );

  const baseBlockexplorerUrl = useMemo(() => VITE_BLOCK_EXPLORERS[network], [
    network,
  ]);

  const provider = useMemo(
    () => new vite.ViteAPI(new WS_RPC(VITE_PROVIDER_URLS[network]), () => {}),
    [network]
  );

  return (
    <ViteProviderContext.Provider
      value={{
        network,
        setNetwork,
        baseBlockexplorerUrl,
        provider,
      }}
    >
      {children}
    </ViteProviderContext.Provider>
  );
};
