import { boot } from 'quasar/wrappers'
import { isArray } from 'lodash'
import { allRoutesRouter } from 'router/index.js'
import { constantRoutes } from 'router/routes.js'

export default boot(({ app, router, store }) => {
  const whiteList = ['/Login', '/Register']
  router.beforeEach(async(to, from, next) => {
    const hasToken = store.state.ls.token

    if (hasToken) {
      if (to.path === '/Login') next({ path: '/' })
      // LoadingBar.stop()

      else {
        const hasRoles = isArray(store.state.user.roles) && store.state.user.roles.length > 0
        if (hasRoles) next()

        else {
          try {
            await store.dispatch('user/info')

            // router.getRoutes().forEach(e => {
            //   router.removeRoute(e.name)
            // })
            // routes.forEach(e => {
            //   const r = allRoutesRouter.resolve(e)
            //   const matched = r.matched
            //   for (let i = 0; i < matched.length; i += 1) {
            //     if (!router.hasRoute(matched[i].name)) {
            //       delete matched[i].children
            //       i === 0
            //         ? router.addRoute(matched[i])
            //         : router.addRoute(matched[i - 1].name, matched[i])
            //     }
            //   }
            // })

            // constantRoutes.forEach(e => {
            //   router.addRoute(e)
            // })

            next()

            // next({
            //   ...to,
            //   replace: true
            // })
          }
          catch (error) {
            // remove token and go to login page to re-login
            await store.dispatch('user/reset')
            // Notify.create({
            //   type: 'negative',
            //   message: error.message
            // })
            next(`/Login`)
            // next(`/Login?redirect=${to.path}`)
            // LoadingBar.stop()
          }
        }
      }
    }
    else {
      if (whiteList.indexOf(to.path) !== -1) next()

      else next(`/Login`)
      // next(`/Login?redirect=${to.path}`)
      // LoadingBar.stop()
    }
  })

  router.afterEach(() => {
    // finish progress bar
    // LoadingBar.stop()
  })
})

