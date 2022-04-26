import * as dayjs from 'dayjs'

export const timestampToDate = (date) => {
  return dayjs.unix(date).format('DD/MM/YYYY, HH:mm:ss')
}
