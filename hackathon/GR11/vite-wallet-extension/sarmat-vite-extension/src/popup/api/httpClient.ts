import { useWeb3 } from '@/composables/useWeb3'
import axios from 'axios'

const { state } = useWeb3()
const baseURL = state.network.httpVitex

const httpClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export function get(url: string, data?: any) {
  return httpClient({
    method: 'get',
    url,
    params: data
  })
}

export function post(url: string, data: any) {
  return httpClient({
    method: 'post',
    url,
    data
  })
}
