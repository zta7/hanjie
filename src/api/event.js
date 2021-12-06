import { api } from 'boot/axios'

export function $events(data) {
  return api({
    url: '/messages',
    method: 'post',
    data
  })
}

export function $putEvent(data) {
  return api({
    url: '/messages/set',
    method: 'post',
    data
  })
}

export function $batchPutEvent(data) {
  return api({
    url: '/messages/sets',
    method: 'post',
    data
  })
}

