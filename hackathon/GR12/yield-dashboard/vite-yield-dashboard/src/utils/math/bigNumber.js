import BigNumber from 'bignumber.js'

const groupFormat = {
  decimalSeparator: '.',
  groupSeparator: ',',
  groupSize: 3,
  secondaryGroupSize: 0,
  fractionGroupSeparator: ' ',
  fractionGroupSize: 0,
}
const normalFormat = {
  decimalSeparator: '.',
  groupSeparator: '',
  groupSize: 0,
  secondaryGroupSize: 0,
  fractionGroupSeparator: '',
  fractionGroupSize: 0,
}

const normalConfig = {
  FORMAT: normalFormat,
  ROUNDING_MODE: BigNumber.ROUND_FLOOR,
}

const groupConfig = {
  FORMAT: groupFormat,
  ROUNDING_MODE: BigNumber.ROUND_FLOOR,
}

const ceilConfig = {
  FORMAT: normalFormat,
  ROUNDING_MODE: BigNumber.ROUND_CEIL,
}

BigNumber.config(normalConfig)
const GroupBigNumber = BigNumber.clone(groupConfig)
const CeilBigNumber = BigNumber.clone(ceilConfig)

const DP = 8

export default {

  compared(x, y) {
    const tempX = new BigNumber(x)
    const tempY = new BigNumber(y)

    return tempX.comparedTo(tempY)
  },

  isEqual(num1, num2) {
    const tempNum1 = new BigNumber(num1)
    const tempNum2 = new BigNumber(num2)

    return tempNum1.isEqualTo(tempNum2)
  },

  minus(x, y, fix = 8, type = 'fix') {
    const tempX = new BigNumber(x)
    const tempY = new BigNumber(y)
    const result = tempX.minus(tempY)

    return type === 'fix' ? result.toFormat(fix) : result.decimalPlaces(fix, 1).toFormat()
  },

  plus(x, y, fix = 8, type = 'fix') {
    const tempX = new BigNumber(x)
    const tempY = new BigNumber(y)
    const result = tempX.plus(tempY)

    return type === 'fix' ? result.toFormat(fix) : result.decimalPlaces(fix, 1).toFormat()
  },

  multi(x, y, fix = 8) {
    const tempX = new BigNumber(x)
    const tempY = new BigNumber(y)

    return tempX.multipliedBy(tempY).toFormat(fix)
  },

  dividedToNumber(num1, num2, fix = 0, type = 'fix') {
    const tempNum1 = new BigNumber(num1)
    const tempNum2 = new BigNumber(num2)
    if (fix === 0) {
      return tempNum1.dividedBy(tempNum2).integerValue().toString()
    }

    const result = tempNum1.dividedBy(tempNum2)

    return type === 'fix' ? result.toFormat(fix) : result.decimalPlaces(fix, 1).toFormat()
  },

  dividedCeil(num1, num2, fix = 0) {
    const tempNum1 = new CeilBigNumber(num1)
    const tempNum2 = new CeilBigNumber(num2)
    const result = tempNum1.dividedBy(tempNum2)

    return result.toFormat(fix)
  },

  toBasic(num, minUnit = 0, decimalPlaces = DP) {
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
  },

  exponentiated(num, unit, offset = 0) {
    const number = new BigNumber(num).exponentiatedBy(unit)
    const offsetNum = new BigNumber(offset)
    const result = number.plus(offsetNum)

    return result.toFormat()
  },

  toMin(num, minUnit) {
    const min = new BigNumber(10).exponentiatedBy(minUnit)
    const tempNum = new BigNumber(num)
    if (tempNum.c === null) {
      return ''
    }

    try {
      return tempNum.multipliedBy(min).toFormat()
    } catch (err) {
      return ''
    }
  },

  formatNum(num, decimal = 8, fix = 8) {
    const tempDecimal = decimal >= fix ? fix : decimal
    const n = new GroupBigNumber(num)

    return n.toFormat(tempDecimal)
  },

  normalFormatNum(num, decimal = 8, fix = 8) {
    const tempDecimal = decimal >= fix ? fix : decimal
    const n = new BigNumber(num)

    return n.toFormat(tempDecimal)
  },

  onlyFormat(num) {
    const n = new GroupBigNumber(num)

    return n.toFormat()
  },

  originFormat(str, decimal = 18, fix = 8) {
    if (str === 0 || str === '0') return '0'
    if (!str || str === 'null') return ''
    const n = new BigNumber(str)

    return new BigNumber(n.shiftedBy(-decimal)).toFixed(fix)
  },
}
