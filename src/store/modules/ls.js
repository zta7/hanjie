import { LocalStorage as ls } from 'quasar'
// import { i18n } from 'boot/i18n'

const state = {
  locale: '',
  token: ls.getItem('token'),
  navbar: ls.getItem('navbar') || [] // path数组
}

const getters = {
}

const mutations = {
  SET(state, pairs) {
    state[pairs[0]] = pairs[1]
  }
}

const actions = {

}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
