import { api } from 'boot/axios'

export function $roles(data) {
  return api({
    url: '/roles',
    method: 'post',
    data
  })
}

export function $putRoles(data) {
  return api({
    url: '/roles/set',
    method: 'post',
    data
  })
}
