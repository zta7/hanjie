import { api } from 'boot/axios'

export function $solderJoint(params) {
  return api({
    url: '/solderJoint',
    params
  })
}
