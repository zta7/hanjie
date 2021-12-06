import { api } from 'boot/axios'
import { cloneDeep } from 'lodash'

export function $history(data) {
  // const copy = cloneDeep(data)
  // copy.startTime = copy.startTime ? new Date(copy.startTime).getTime() : ''
  // copy.endTime = copy.endTime ? new Date(copy.endTime).getTime() : ''
  return api({
    url: '/history',
    method: 'post',
    data
  })
}
