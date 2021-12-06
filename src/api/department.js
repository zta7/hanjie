import { api } from 'boot/axios'

export function $departments(data) {
  return api({
    url: '/companys',
    method: 'post',
    data
  })
}

export function $deleteDepartment(data) {
  return api({
    url: '/companys/delete',
    method: 'post',
    data
  })
}

export function $putDepartment(data) {
  return api({
    url: '/companys/set',
    method: 'post',
    data
  })
}
