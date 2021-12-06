import { boot } from 'quasar/wrappers'
import axios from 'axios'
import { Notify } from 'quasar'
// http://192.168.3.236:9000/
const api = axios.create({ baseURL: '/' })

export default boot(({ app, store }) => {
  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$api = api
  api.interceptors.request.use(
    config => {
      // config.headers['Accept-Language'] = store.state.ls.local
      // config.headers.Authorization = store.state.ls.token
      return config
    },
    error => {
      return Promise.reject(error)
    }
  )

  api.interceptors.response.use(
    response => {
      const res = response.data
      if (res.code !== 1) {
        Notify.create({
          message: res.msg || 'Server Error',
          type: 'negative'
        })

        // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
        // if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        //   // to re-login
        //   MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
        //     confirmButtonText: 'Re-Login',
        //     cancelButtonText: 'Cancel',
        //     type: 'warning'
        //   }).then(() => {
        //     store.dispatch('user/resetToken').then(() => {
        //       location.reload()
        //     })
        //   })
        // }
        return Promise.reject(new Error(res.msg || 'Error'))
      }
      else return res
    },
    error => {
      console.log(`err${error}`) // for debug
      Notify.create({
        message: error.message,
        type: 'negative'
      })
      return Promise.reject(error)
    }
  )
})

export { axios, api }
