import bigNumber from '@/utils/math/bigNumber'

const { WS_RPC } = require('@vite/vitejs-ws')
const { ViteAPI } = require('@vite/vitejs')
const axios = require('axios')

const viteConnection = new WS_RPC('wss://node.vite.net/gvite/ws')
const viteProvider = new ViteAPI(viteConnection, () => {
  // console.log('[LOG]: VITE API CLIENT CONNECTED')
})

export const viteTokenId = 'tti_5649544520544f4b454e6e40'
export const viteTokenInfo = {
  decimals: 18,
  tokenId: viteTokenId,
  tokenName: 'Vite Token',
  tokenSymbol: 'VITE',
}

export const vxTokenId = 'tti_564954455820434f494e69b5'
export const vxTokenInfo = {
  decimals: 18,
  tokenId: vxTokenId,
  tokenName: 'ViteX Coin',
  tokenSymbol: 'VX',
}

// SBP Vitejs Helpers

/**
 *
 */
export async function getSBPList() {
  // const result = await viteProvider.request('vote_getVoteDetails', 0)
  // console.log('[LOG] GetSBPList result:', result, '\n')

  return viteProvider.request('contract_getSBPVoteList', 'vite_9065ff0e14ebf983e090cde47d59fe77d7164b576a6d2d0eda')
}

/**
 *
 */
export async function getSBPVoteList() {
  const result = await viteProvider.request('contract_getSBPVoteList')

  // console.log('[LOG] getVoteList', result, '\n')

  return result
}

/**
 *
 */
export async function getSBPRewardByTimestamp(timestamp) {
  const result = await viteProvider.request('contract_getSBPRewardByTimestamp', timestamp)

  // console.log('[LOG] GetSBPRewardByTimestamp', result, '\n')

  return result
}

/**
 *
 */
export async function getSBPRewardByCycle(cycleIndex) {
  const result = await viteProvider.request('contract_getSBPRewardByCycle', cycleIndex)

  // console.log('[LOG] GetSBPRewardByCycle', result, '\n')

  return result
}

// VITE/VX Vitejs Helpers

/**
 *
 */
export async function getViteMiningInfoByTimestamp(timestamp) {
  const periodID = await viteProvider.request('dex_getPeriodIdByTimestamp', timestamp)
  const miningInfo = await viteProvider.request('dex_getMiningInfo', periodID)

  return { viteMiningInfo: miningInfo }
}

/**
 *
 */
export async function getCurrentViteMiningInfo() {
  const miningInfo = await viteProvider.request('dex_getCurrentMiningInfo')

  return { viteMiningInfo: miningInfo }
}

/**
 *
 */
export async function getCurrentStakingValidForMining() {
  const staking = await viteProvider.request('dex_getCurrentStakingValidForMining')
  console.log('getCurrentStakingValidForMining result: ', staking)

  return { stakingValidForMining: staking }
}

/**
 * FIX ME FIX ME - 12/22
 */
// export async function getVxMiningInfoByTimestamp(timestamp) {
//   const periodID = await viteProvider.request('dex_getPeriodIdByTimestamp', timestamp)
//   const miningInfo = await viteProvider.request('dex_getMiningInfo', periodID)
//
//   return { viteMiningInfo: miningInfo }
// }

/**
 * FIX ME FIX ME - 12/22
 */
// export async function getVxMineInfo(indexPeriod = 0) {
//   const periodID = await viteProvider.request('dex_getPeriodIdByTimestamp', timestamp)
//   const miningInfo = await viteProvider.request('dex_getMiningInfo', periodID)
//   const pledgeForVxSum = await viteProvider.request('dexfund_getPledgeForVxSum')
//   const dailyRewardPerVite = bigNumber.dividedToNumber(bigNumber.originFormat(miningInfo.pledgeMine, 18), bigNumber.originFormat(pledgeForVxSum, 18), 8)
//   const pledgeSumFormatted = bigNumber.originFormat(pledgeForVxSum, 18, 2)
//
//   return { vxMiningInfo: miningInfo, pledgeForVxSum: pledgeForVxSum, dailyRewardPerVite: dailyRewardPerVite, pledgeSumFormatted: pledgeSumFormatted }
// }

/**
 *
 */
export async function getCurrentVxMineInfo() {
  const miningInfo = await viteProvider.request('dexfund_getCurrentVxMineInfo')
  const pledgeForVxSum = await viteProvider.request('dexfund_getCurrentPledgeForVxSum')
  const dailyRewardPerVite = bigNumber.dividedToNumber(bigNumber.originFormat(miningInfo.pledgeMine, 18), bigNumber.originFormat(pledgeForVxSum, 18), 8)
  const pledgeSumFormatted = bigNumber.originFormat(pledgeForVxSum, 18, 2)

  return { vxMiningInfo: miningInfo, pledgeForVxSum: pledgeForVxSum, dailyRewardPerVite: dailyRewardPerVite, pledgeSumFormatted: pledgeSumFormatted }
}

/**
 *
 */
export async function getCurrentFeesForMine() {
  const result = await viteProvider.request('dexfund_getCurrentFeesForMine')

  // console.log('[LOG] getCurrentFeesForMine', result, '\n')

  return result
}

/**
 *
 */
export async function getCurrentDividendPools() {
  const result = await viteProvider.request('dexfund_getCurrentDividendPools')

  // console.log('[LOG] getCurrentDividendPools', result, '\n')

  return result
}

/**
 *
 */
export async function getAllTotalVxBalance() {
  const result = await viteProvider.request('dex_getAllTotalVxBalance')

  // console.log('[LOG] getAllTotalVxBalance', result, '\n')

  return result
}

/**
 *
 */
export async function getTotalVxSupply() {
  const result = await viteProvider.request('mintage_getTokenInfoById', vxTokenId)

  // console.log('[LOG] getTotalVxSupply', result, '\n')

  return result
}

export async function getExchangeRate(token) {
  const result = await axios.get(`https://api.vitex.net/api/v2/exchange-rate?tokenSymbols=${token},USDC-000`)

  // console.log('[LOG] getExchangeRate token: ', token)
  // console.log('[LOG] getExchangeRate result: ', result)

  return result
}
