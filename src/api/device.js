import { api } from 'boot/axios'

export function $devices(data) {
  return api({
    url: '/devices',
    method: 'post',
    data
  })
}

export function $deleteDevice(data) {
  return api({
    url: '/devices/delete',
    method: 'post',
    data
  })
}

export function $putDevice(data) {
  return api({
    url: '/devices/set',
    method: 'post',
    data
  })
}

