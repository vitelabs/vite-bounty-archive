export function accountNameSymbol(name: string): string {
  return name.charAt(0)
}

export function compressAddress(
  address: string,
  leftOffset = 10,
  rightOffet = 5
): string {
  return (
    address.substr(0, leftOffset) +
    '...' +
    address.substr(address.length - rightOffet, address.length)
  )
}

export function toHex(string: string) {
  let hex = ''
  for (let i = string.length - 1; i >= 0; i--)
    hex = '%' + string.charCodeAt(i).toString(16) + hex
  return hex
}
