import { ViteAPI } from '@vite/vitejs/distSrc/viteAPI/type';
import SpaceContract from '../contracts/space'
import { setStateType } from './globalContext';
import { VC } from './viteConnect';

export type NetworkTypes = 'testnet' | 'mainnet';

export type State = {
  setState: setStateType;
  callContract: (
    contract: typeof SpaceContract,
    methodName: string,
    params?: any[],
    tokenId?: string,
    amount?: string
  ) => Promise<object>;
  scanEvents: (
    abi: any[],
    address: string,
    fromHeight: string,
    eventName: string
  ) => Promise<object>;
  viteApi: ViteAPI;
  toast: string;
  languageType: string;
  networkType: NetworkTypes;
  vcInstance: VC | null;
  metamaskAddress: string;
  viteBalanceInfo: ViteBalanceInfo;
};

export type ViteBalanceInfo = {
  balance: {
    address: string;
    blockCount: string;
    balanceInfoMap?: {
      [tokenId: string]: {
        tokenInfo: TokenInfo;
        balance: string;
      };
    };
  };
  unreceived: {
    address: string;
    blockCount: string;
  };
};

export type TokenInfo = {
  tokenName: string;
  tokenSymbol: string;
  totalSupply: string;
  decimals: number;
  owner: string;
  tokenId: string;
  maxSupply: string;
  ownerBurnOnly: false;
  isReIssuable: false;
  index: number;
  isOwnerBurnOnly: false;
};

export type NewAccountBlock = {
  hash: string;
  height: number;
  heightStr: string;
  removed: boolean;
};

export type Contract = {
  address: {
    mainnet: string,
    testnet: string,
  },
  abi: Array<object>
}

export type Proposal = {
  id: string,
  title: string,
  description: string,
  proposer: string,
  voteStart: string,
  voteEnd: string,
  executed: string,
  canceled: string,
}

export type Space = {
  address: string,
  name: string,
  memberCount: string,
  isMember: boolean,
  // creator: string,
}
