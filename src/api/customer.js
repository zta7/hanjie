import { api } from 'boot/axios'

export function $customers(data) {
  return api({
    url: '/users',
    method: 'post',
    data
  })
}

export function $deleteCustomer(data) {
  return api({
    url: '/users/delete',
    method: 'post',
    data
  })
}

export function $putCustomer(data) {
  return api({
    url: '/users/set',
    method: 'post',
    data
  })
}
