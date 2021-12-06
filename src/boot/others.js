import { boot } from 'quasar/wrappers'
import _, { isArray } from 'lodash'
import { LoadingBar } from 'quasar'

export default boot(({ app, store }) => {
  app.config.globalProperties.$_ = _
  app.config.globalProperties.$store = store

  LoadingBar.setDefaults({
    color: 'primary',
    size: '4px',
    position: 'top',
    skipHijack: true
  })

  const checkPermission = (el, binding) => {
    const { value: accessRoles } = binding
    const roles = store.state.user.roles
    if (isArray(accessRoles)) {
      const hasPermission = roles.some(role => {
        return accessRoles.includes(role)
      })
      if (!hasPermission) el.parentNode && el.parentNode.removeChild(el)
    }
    else throw new Error(`need roles! Like v-permission="['admin','editor']"`)
  }
  // v-permission
  app.directive('permission', {
    mounted(el, binding) {
      checkPermission(el, binding)
    },
    updated(el, binding) {
      checkPermission(el, binding)
    }
  })
})

