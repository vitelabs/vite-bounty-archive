import React, { FC, ReactNode, useMemo } from 'react';

import { vite } from '../vite';
import * as utils from '../utils';
import { useViteProvider, ViteWalletContext } from './vite';

const PRIVATE_KEY1 = import.meta.env.VITE_PRIVATE_KEY as string;
const PRIVATE_KEY2 = import.meta.env.VITE_PRIVATE_KEY2 as string;
const PRIVATE_KEY = ~window.location.search.search('priv2')
  ? PRIVATE_KEY2
  : PRIVATE_KEY1;

export const VitePrivatekeyProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { provider } = useViteProvider();

  const wallet = useMemo(
    () =>
      !PRIVATE_KEY ? null : vite.wallet.createAddressByPrivateKey(PRIVATE_KEY),
    []
  );

  const connect = async () => {};

  const createAccountBlock = async (typ: string, params: any) => {
    if (!wallet) return;

    const block = await utils.createAccountBlock(provider, typ, params);

    block.setPrivateKey(wallet.privateKey);

    console.log(await block.sign().send());
  };

  return (
    <ViteWalletContext.Provider
      value={{
        walletAddress: wallet?.address ?? null,
        connect,
        createAccountBlock,
      }}
    >
      {children}
    </ViteWalletContext.Provider>
  );
};
