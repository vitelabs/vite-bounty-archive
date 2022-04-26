export type TxStatus = 'pending' | 'sending' | 'sent';

// export type Network = 'mainnet' | 'testnet' | 'localnet';
export type Network = 'testnet' | 'localnet';

export type Fragment = {
  anonymous: boolean;
  inputs: {
    indexed: boolean;
    name: string;
    type: string;
  }[];
  outputs: {
    name: string;
    type: string;
  }[];
  name: string;
  type: string;
};
