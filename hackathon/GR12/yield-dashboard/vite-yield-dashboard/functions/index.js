// const { Server } = require("socket.io")
// const io = new Server(server)
const functions = require("firebase-functions")
const admin = require("firebase-admin")
const { WS_RPC } = require('@vite/vitejs-ws')
const { ViteAPI } = require('@vite/vitejs')
const BigNumber = require('bignumber.js')
const axios = require('axios')

admin.initializeApp()

BigNumber.config({
  FORMAT: {
    decimalSeparator: '.',
    groupSeparator: '',
    groupSize: 0,
    secondaryGroupSize: 0,
    fractionGroupSeparator: '',
    fractionGroupSize: 0,
  },
  ROUNDING_MODE: BigNumber.ROUND_FLOOR,
})

const DP = 8

function plus(x, y, fix = 8, type = 'fix') {
  const tempX = new BigNumber(x)
  const tempY = new BigNumber(y)
  const result = tempX.plus(tempY)

  return type === 'fix' ? result.toFormat(fix) : result.decimalPlaces(fix, 1).toFormat()
}

function toBasic(num, minUnit = 0, decimalPlaces = DP) {
  const min = new BigNumber(10).exponentiatedBy(minUnit)
  const tempNum = new BigNumber(num)
  if (tempNum.c === null) {
    return ''
  }

  try {
    return tempNum.dividedBy(min).decimalPlaces(decimalPlaces, 1).toFormat()
  } catch (err) {
    return ''
  }
}

function multi(x, y, fix = 8) {
  const tempX = new BigNumber(x)
  const tempY = new BigNumber(y)
  return tempX.multipliedBy(tempY).toFormat(fix)
}

function dividedToNumber(num1, num2, fix = 0, type = 'fix') {
  const tempNum1 = new BigNumber(num1)
  const tempNum2 = new BigNumber(num2)
  if (fix === 0) {
    return tempNum1.dividedBy(tempNum2).integerValue().toString()
  }
  const result = tempNum1.dividedBy(tempNum2)
  return type === 'fix' ? result.toFormat(fix) : result.decimalPlaces(fix, 1).toFormat()
}

function originFormat(str, decimal = 18, fix = 8) {
  if (str === 0 || str === '0') return '0'
  if (!str || str === 'null') return ''
  const n = new BigNumber(str)
  return new BigNumber(n.shiftedBy(-decimal)).toFixed(fix)
}


/**
 * Background Cloud Function to be triggered by Pub/Sub.
 * This function is exported by index.js, and executed every
 * day at 1am.
 *
 */
exports.schedulerUpdate = functions.region('us-west1').pubsub.schedule('every day 01:00').onRun(async () => {
  const currDate = new Date()
  const timestamp = currDate.getTime()
  const priorDate = new Date(timestamp)
  priorDate.setDate(currDate.getDate() - 1)
  const prevDayTime = priorDate.getTime()
  const prevDayUnixTime = Math.floor(prevDayTime / 1000)
  const viteConnection = new WS_RPC('wss://node.vite.net/gvite/ws')
  const viteProvider = new ViteAPI(viteConnection, () => {
    // console.log('[LOG]: VITE API CLIENT CONNECTED')
  })
  const prevDaySBPRewards = await viteProvider.request('contract_getSBPRewardByTimestamp', prevDayUnixTime)
  const viteMiningInfo = await viteProvider.request('dex_getCurrentMiningInfo')
  const totalVxBalance = await viteProvider.request('dex_getAllTotalVxBalance')
  const vxMiningInfo = await viteProvider.request('dexfund_getCurrentVxMineInfo')
  const pledgeForVxSum = await viteProvider.request('dexfund_getCurrentPledgeForVxSum')
  const dividendPools = await viteProvider.request('dexfund_getCurrentDividendPools')
  const vitePriceInUsd = (await axios.get('https://api.vitex.net/api/v2/exchange-rate?tokenSymbols=VITE')).data['data'][0].usdRate
  const vxPriceInUsd = (await axios.get('https://api.vitex.net/api/v2/exchange-rate?tokenSymbols=VX')).data['data'][0].usdRate
  const ethPriceInUsd = (await axios.get('https://api.vitex.net/api/v2/exchange-rate?tokenSymbols=ETH-000')).data['data'][0].usdRate
  const btcPriceInUsd = (await axios.get('https://api.vitex.net/api/v2/exchange-rate?tokenSymbols=BTC-000')).data['data'][0].usdRate
  const usdtPriceInUsd = (await axios.get('https://api.vitex.net/api/v2/exchange-rate?tokenSymbols=USDT-000')).data['data'][0].usdRate
  const rewardsDocRef = admin.firestore().collection('rewards').doc('rewards-history')
  const rewardsDoc = (await rewardsDocRef.get()).data()
  const bookkeepingDocRef = admin.firestore().collection('bookkeeping').doc('bookkeeping-doc')
  const bookkeepingDoc = (await bookkeepingDocRef.get()).data()
  const cronLog = bookkeepingDoc.cronLog
  cronLog.push({
    timestamp: timestamp,
  })
  cronLog.shift()
  const thirtyDayCategories = bookkeepingDoc.thirtyDayCategories
  const sevenDayCategories = bookkeepingDoc.sevenDayCategories
  const movingAvgDates = bookkeepingDoc.movingAvgDates
  thirtyDayCategories.push(priorDate)
  sevenDayCategories.push(priorDate)
  movingAvgDates.push(priorDate)
  thirtyDayCategories.shift()
  sevenDayCategories.shift()
  movingAvgDates.shift()
  bookkeepingDocRef.update({
    currDate: currDate,
    cronLog: cronLog,
    thirtyDayCategories: thirtyDayCategories,
    sevenDayCategories: sevenDayCategories,
    movingAvgDates: movingAvgDates,
  })
  const sbpDataQueue = rewardsDoc.sbp
  const viteDataQueue = rewardsDoc.vite
  const vxDataQueue = rewardsDoc.vx
  const tokenDiviList = ['VITE', 'ETH', 'BTC', 'USDT']
  const inputAmount = 1000

  // Update SBP rewards queue
  sbpDataQueue.push(prevDaySBPRewards)
  sbpDataQueue.shift()

  // Calculate and format Vite reward related values
  const viteHistoryMinedSum = originFormat(viteMiningInfo.historyMinedSum, 18, 2)
  const viteStakingRatio = multi(vxMiningInfo.pledgeMine / viteMiningInfo.historyMinedSum, 100, 2)
  const viteTotal = originFormat(viteMiningInfo.total, 18, 2)
  const pledgeMineFormatted = originFormat(vxMiningInfo.pledgeMine, 18)
  const pledgeForVxSumFormatted = originFormat(pledgeForVxSum, 18)
  const dailyRewardPerVite = dividedToNumber(pledgeMineFormatted, pledgeForVxSumFormatted, 8)
  const yearlyRewardPerVite = multi(dailyRewardPerVite, 365, 18)
  const viteAPR = dividedToNumber(yearlyRewardPerVite, vxPriceInUsd, 8)
  const viteRewardAmount = pledgeForVxSum && multi(dailyRewardPerVite, inputAmount, 6)

  // Update Vite rewards queue
  viteDataQueue.push({
    viteAPR: viteAPR,
    dailyRewardPerVite: dailyRewardPerVite,
    pledgeMineFormatted: pledgeMineFormatted,
    pledgeForVxSumFormatted: pledgeForVxSumFormatted,
    viteMiningInfo: {
      stakingRatio: viteStakingRatio,
      historyMinedSum: viteHistoryMinedSum,
      total: viteTotal,
      rewardAmount: viteRewardAmount,
    },
  })
  viteDataQueue.shift()

  // Calculate and format VX dividend related values
  // VX staked amount
  let fundAmount = ''
  let fundPeriod = 0
  totalVxBalance.funds.forEach(fund => {
    if (fund.period > fundPeriod) {
      fundAmount = fund.amount
      fundPeriod = fund.period
    }
  })
  const vxStakedAmount = fundAmount
  const vxStakedAmountBasic = originFormat(vxStakedAmount, 18, 2)

  const pool = {}
  let vxDividendPoolsTotalUsd = 0
  Object.values(dividendPools).forEach(tokenId => {
    const tokenTypeName = tokenDiviList[tokenId.quoteTokenType - 1]
    const amount = toBasic(tokenId.amount, tokenId.tokenInfo.decimals)
    const amountToDivided = dividedToNumber(amount, 100, 18)
    const amountPerVx = dividedToNumber(amountToDivided, toBasic(vxStakedAmount, 18), 18)
    let priceInUsd = 1

    pool[tokenTypeName] = pool[tokenTypeName] || {
      amount: '0',
      decimals: 8,
      btcAmount: '0',
    }
    pool[tokenTypeName].amount = amount
    pool[tokenTypeName].amountPerVx = amountPerVx
    switch (tokenTypeName) {
      case 'VITE':
        priceInUsd = vitePriceInUsd
        break
      case 'ETH':
        priceInUsd = ethPriceInUsd
        break
      case 'BTC':
        priceInUsd = btcPriceInUsd
        break
      case 'USDT':
        priceInUsd = usdtPriceInUsd
        break
      default:
        priceInUsd = vxPriceInUsd
        break
    }
    pool[tokenTypeName].usdAmount = multi(amount, priceInUsd)
    pool[tokenTypeName].valuePerVx = {
      usd: multi(amountPerVx, priceInUsd || 0),
    }

    if (tokenTypeName !== 'VITE') {
      vxDividendPoolsTotalUsd = plus(multi(amount, priceInUsd), vxDividendPoolsTotalUsd)
    }
  })

  const rewardList = Object.keys(pool).filter(key => key !== 'VITE').map(key => {
    return {
      ...pool[key],
      name: key,
      amount: multi(
        multi(inputAmount, pool[key].amountPerVx),
        1,
      ),
      value: {
        usd: multi(
          inputAmount,
          pool[key].valuePerVx.usd,
        ),
      },
    }
  })

  // const rewardTotal = rewardList.reduce(
  //   (pre, cur) => plus(pre, cur.value.usd),
  //   0,
  // )

  const dividedTodayInTotal = dividedToNumber(vxDividendPoolsTotalUsd, 100, 18)
  const dailyRewardPerVx = dividedToNumber(dividedTodayInTotal, vxStakedAmountBasic, 18)
  const vxRewardAmount = vxStakedAmount && multi(dailyRewardPerVx, inputAmount, 6)
  const yearlyRewardPerVx = multi(dailyRewardPerVx, 365, 18)
  const vxAPR = dividedToNumber(yearlyRewardPerVx, vxPriceInUsd, 8)

  const vxTotal = originFormat(vxMiningInfo.total, 18, 2)
  const vxHistoryMinedSum = originFormat(vxMiningInfo.historyMinedSum, 18, 2)
  const vxStakingRatio = multi(vxStakedAmount / vxMiningInfo.historyMinedSum, 100, 2)

  // Update VX rewards queue
  vxDataQueue.push({
    vxAPR: vxAPR,
    dailyRewardPerVx: dailyRewardPerVx,
    rewardList: rewardList,
    vxPools: pool,
    vxMiningInfo: {
      stakingRatio: vxStakingRatio,
      historyMinedSum: vxHistoryMinedSum,
      stakedAmount: originFormat(vxStakedAmount, 18, 2),
      total: vxTotal,
      rewardAmount: vxRewardAmount,
    },
  })
  vxDataQueue.shift()

  // Update stored rewards history doc
  rewardsDocRef.update({
    sbp: sbpDataQueue,
    vite: viteDataQueue,
    vx: vxDataQueue,
  })
})

/**
 * Background Cloud Function to be triggered by Pub/Sub.
 * This function is exported by index.js, and executed anytime
 * the rewards history doc is updated.
 *
 */
// exports.parseUpdatedRewards = functions.firestore.document('rewards/rewards-history').onUpdate(() => {
//   // const bookkeepingDocRef = admin.firestore().collection('bookkeeping').doc('bookkeeping-doc')
//   // const bookkeepingDoc = (await bookkeepingDocRef.get()).data()
//   const rewardsDocRef = admin.firestore().collection('rewards').doc('rewards-history')
//   const rewardsDoc = (await rewardsDocRef.get()).data()
//   const sbpDataQueue = rewardsDoc.sbp
//   // const viteDataQueue = rewardsDoc.vite
//   // const vxDataQueue = rewardsDoc.vx
//   const sbpList = await viteProvider.request('contract_getSBPVoteList', 'vite_9065ff0e14ebf983e090cde47d59fe77d7164b576a6d2d0eda')
//   // const aprHistory = new Array(30).fill(0)
//   // const movingAverages = new Array(7).fill(0)
//   for (let i = 0; i < 30; ++i) {
//     const rewardMapKeys = Object.keys(sbpDataQueue[i].rewardMap)
//     for (let j = 0; j < sbpList.length; ++j) {
//       let aprValue = 0
//       const sbpRewardIndex = rewardMapKeys.indexOf(sbpList[j].sbpName.toString())
//       if (sbpRewardIndex !== -1) {
//         aprValue = rewardObj.rewardMap[rewardMapKeys[sbpRewardIndex]]
//       }
//       if (index > 15) {
//         movingAvgTempArr.push(apr)
//       }
//     }
//   }
// })

/**
 * Background Cloud Function to be triggered by Pub/Sub.
 * This function is exported by index.js, and executed anytime
 * the rewards history doc is updated.
 *
 */
// exports.parseUpdatedRewards = functions.firestore.document('rewards/rewards-history').onUpdate(() => {
//   const bookkeepingDocRef = admin.firestore().collection('bookkeeping').doc('bookkeeping-doc')
//   const bookkeepingDoc = (await bookkeepingDocRef.get()).data()
//   const rewardsDocRef = admin.firestore().collection('rewards').doc('rewards-history')
//   const rewardsDoc = (await rewardsDocRef.get()).data()
//   const sbpDataQueue = rewardsDoc.sbp
//   const viteDataQueue = rewardsDoc.vite
//   const vxDataQueue = rewardsDoc.vx
//   const sbpList = []
//   getSBPList().then(res => {
//     // console.log('[LOG] SbpVotingRewards onCreated() getSBPList: ', res)
//     if (res) {
//       this.sbpChartDataMap = []
//       const aprHistory = new Array(30).fill(2)
//       const movingAverages = new Array(7).fill(3.5)
//       for (let i = 0; i < res.length; ++i) {
//         this.sbpList.push({ sbpName: res[i].sbpName, sbpAddr: res[i].blockProducingAddress, sbpRewards: [], sbpVotes: res[i].votes })
//         this.sbpRewards.forEach(rewardObj => {
//           let sbpReward = {}
//           const rewardMapKeys = Object.keys(rewardObj.rewardMap)
//           const sbpRewardIndex = rewardMapKeys.indexOf(this.sbpList[i].sbpName.toString())
//           if (sbpRewardIndex !== -1) {
//             sbpReward = rewardObj.rewardMap[rewardMapKeys[sbpRewardIndex]]
//           }
//           this.sbpList[i].sbpRewards.push(sbpReward)
//
//           for (let j = 0; j < this.sbpList.length; ++j) {
//             // FIX ME
//             this.sbpChartDataMap.push({ thirtyData: aprHistory, movingAverageData: movingAverages })
//           }
//
//           // console.log('CHART DATA MAP: ', this.sbpChartDataMap)
//           this.chartDataLoaded = true
//         })
//       }
//
//       this.sbpListLoaded = true
//     }
//
//     this.sbpList.sort((a, b) => b.sbpVotes - a.sbpVotes)
//   })
// })
