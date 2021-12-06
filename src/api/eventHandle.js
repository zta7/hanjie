import { api } from 'boot/axios'
import { set } from 'lodash'
export function $eventHandles(data) {
  if (!data) data = {}
  set(data, 'filter.state', 1)
  return api({
    url: '/messages',
    method: 'post',
    data
  })
}

export function $eventHandleExport(data) {
  return api({
    url: '/eventHandleExport',
    method: 'post',
    data
  })
}
