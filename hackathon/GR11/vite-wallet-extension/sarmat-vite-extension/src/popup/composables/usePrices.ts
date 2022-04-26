import { useNumbers } from '@/composables/useNumbers'
import store from '@/store'

export function usePrices() {
  const { frac } = useNumbers()

  function forPrice(price, balance?) {
    if (balance) {
      const b = balance.replace(',', '')
      const balanceUsd = price * b
      return `$${Math.trunc(balanceUsd)}${
        frac(balanceUsd) ? ',' + frac(balanceUsd) : ''
      }`
    }
    return price
      ? `1 ≈ $${Math.trunc(price)}${frac(price) ? ',' + frac(price) : ''}`
      : ''
  }
  function forAmount(amount) {
    if (amount) {
      const a = amount.replace(',', '')
      return `${Math.trunc(a)}${frac(a) ? ',' + frac(a) : ''}` + ' '
    } else {
      return 0 + ' '
    }
  }
  return {
    forPrice,
    forAmount
  }
}
