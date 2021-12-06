import { sidebarRoutes } from 'src/router/routes'
import { $login, $info } from 'api/user'
import generateRoutes from 'utils/generateRoutes'

const state = {
  avatar: 'https://cdn.quasar.dev/img/boy-avatar.png',
  name: 'ZTA',
  roles: [],
  accessRoutes: [],
  sidebarRoutes: []
}

const getters = {
}

const mutations = {
  SET(state, pairs) {
    state[pairs[0]] = pairs[1]
  }
}

const actions = {
  reset({ commit }) {
    commit('ls/SET', ['token', ''], { root: true })
    commit('SET', ['roles', []])
  },
  info({ commit, state }) {
    return new Promise((resolve, reject) => {
      $info().then(({ roles, routes }) => {
        commit('SET', ['roles', roles])

        commit('SET', [
          'sidebarRoutes', generateRoutes({
            routes: sidebarRoutes,
            accessRoutes: routes,
            roles
          })
        ])
        resolve({ routes })
      }).catch(error => {
        reject(error)
      })
    })
  },
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      commit('ls/SET', ['token', ''], { root: true })
      commit('SET', ['roles', []])
      resolve()
    })
  },
  login({ commit }, values) {
    return new Promise((resolve, reject) => {
      $login(values).then(r => {
        const { token } = r
        commit('ls/SET', ['token', token], { root: true })
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
