export const abbrAddress = (address: string, m?: number, n?: number) => {
  if (!m) {
    m = 4;
  }
  if (!n) {
    n = 4;
  }
  return `${address.slice(0, m)}${'.'.repeat(n)}${address.slice(-n)}`;
};
