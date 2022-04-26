import BigNumber from 'bignumber.js'

BigNumber.config({
  ROUNDING_MODE: BigNumber.ROUND_DOWN,
  EXPONENTIAL_AT: 1e9,
  DECIMAL_PLACES: 18
})

export function useNumbers() {
  function toNum(value: string | number, decimals: number): string {
    return new BigNumber(value).div(`1e${decimals}`).toString()
  }

  function formatUnits(value: any, decimals: number): string {
    return new BigNumber(value).times(`1e${decimals}`).toString()
  }

  function frac(value: number): string | number | undefined {
    const int = value.toString().split('.')[1]
    if (int === undefined) {
      return ''
    }
    if (!(Math.trunc(value) > 1)) {
      if (int.length > 5) {
        return int.substr(0, 5)
      }
      return int
    }
    if (Math.trunc(value) > 1) {
      if (int.length > 3) {
        return int.substr(0, 3)
      }
      return int
    }
  }

  return { toNum, frac, formatUnits }
}
