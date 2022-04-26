// import { checkParams } from '@vite/vitejs-utils'

/**
 *
 */
export function calcSevenDayMovingAverages(rewardHistoryArr) {
  // console.log('[LOG] calcSevenDayMovingAverages rewardHistoryArr', rewardHistoryArr)
  const sevenDayData = new Array(7).fill(0)
  for (let index = 0; index < 7; ++index) {
    let sum = 0
    rewardHistoryArr.slice(index, index + 8).forEach(val => {
      // console.log('[LOG] calcSevenDayMovingAverages val', index, val)
      sum += parseFloat(val)
    })
    // console.log('[LOG] calcSevenDayMovingAverages sum', index, sum)
    sevenDayData[index] = (sum / 7.0)
    // console.log('[LOG] calcSevenDayMovingAverages sevenDayData[index]', index, sevenDayData[index])
  }

  // console.log('[LOG] calcSevenDayMovingAverages sevenDayData', sevenDayData)

  return sevenDayData
}

/**
 *
 */
export async function calcSBPVoteRewards(inputAmount) {
  const rewards = 0

  console.log('[LOG] calcSBPVoteRewards inputAmount', inputAmount, '\n')

  return rewards
}

/**
 *
 */
export async function calcStakingViteRewards(inputAmount) {
  const rewards = 0

  console.log('[LOG] calcStakingViteRewards inputAmount', inputAmount, '\n')

  return rewards
}

/**
 *
 */
export async function calcVXDividends(inputAmount) {
  const rewards = 0

  console.log('[LOG] calcVXDividends inputAmount', inputAmount, '\n')

  return rewards
}
