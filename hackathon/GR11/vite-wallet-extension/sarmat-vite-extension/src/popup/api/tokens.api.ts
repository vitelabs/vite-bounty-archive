import { get } from './httpClient'
const END_POINT = '/tokens'

const getTokens = () => {
  const data = get(END_POINT).then((res: any) => res.data.data)
  return data
}

export { getTokens }
