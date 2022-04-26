import { vite, WS_RPC } from './vite';

export function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

export async function createAccountBlock(
  provider: typeof WS_RPC,
  typ: string,
  params: any
) {
  const block = vite.accountBlock.createAccountBlock(typ, params);

  block.setProvider(provider);

  await block.autoSetPreviousAccountBlock();

  // get difficulty
  const { difficulty } = await provider.request('ledger_getPoWDifficulty', {
    address: block.address,
    previousHash: block.previousHash,
    blockType: block.blockType,
    toAddress: block.toAddress,
    data: block.data,
  });

  // if difficulty is null,
  // it indicates the account has enough quota to send the transaction
  // there is no need to do PoW
  if (difficulty) {
    const getNonceHashBuffer = Buffer.from(
      block.originalAddress + block.previousHash,
      'hex'
    );
    const getNonceHash = vite.utils.blake2bHex(getNonceHashBuffer, null, 32);
    const nonce = await provider.request(
      'util_getPoWNonce',
      difficulty,
      getNonceHash
    );
    block.setDifficulty(difficulty);
    block.setNonce(nonce);
  }

  return block;
}
