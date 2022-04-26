import { get } from './httpClient'
const END_POINT = '/exchange-rate'

const getExchangeRate = (tokenId: string) => {
  return get(END_POINT, { tokenIds: tokenId })
}

export { getExchangeRate }
