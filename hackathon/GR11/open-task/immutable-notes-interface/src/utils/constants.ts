export const PROD = process.env.NODE_ENV === 'production';

const tokensArr: [
  tokenId: string,
  tokenInfo: {
    ticker: string;
    decimals: number;
  }
][] = [
  ['tti_5649544520544f4b454e6e40', { ticker: 'VITE', decimals: 18 }],
  ['tti_564954455820434f494e69b5', { ticker: 'VX', decimals: 18 }],
  ['tti_b90c9baffffc9dae58d1f33f', { ticker: 'BTC', decimals: 8 }],
  ['tti_687d8a93915393b219212c73', { ticker: 'ETH', decimals: 18 }],
];

export const tokensMap = new Map(tokensArr);

export const tipTokenIds = tokensArr.map(([tokenId]) => tokenId);

export const zeroHash = '0'.repeat(64);
