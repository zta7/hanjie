import { api } from 'boot/axios'

export function $login(data) {
  return api({
    url: '/login',
    method: 'post',
    data
  })
}

export function $info(params) {
  return api({
    url: '/user',
    params
  })
}

export function $logout(data) {
  return api({
    url: '/user/logout',
    method: 'post',
    data
  })
}

export function $profile(data) {
  return api({

  })
}

// export function $routes(data) {
//   return api({
//     url: '/user/routes',
//     method: 'post',
//     data
//   })
// }
