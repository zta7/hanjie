import { api } from 'boot/axios'

export function $gateways(data) {
  return api({
    url: '/gateways',
    method: 'post',
    data
  })
}

export function $putGateway(data) {
  return api({
    url: '/gateways/set',
    method: 'post',
    data
  })
}
