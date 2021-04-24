// import { boot } from 'quasar/wrappers'
// import { LocalStorage as ls } from 'quasar'
// import { isArray } from 'lodash'
// import { shallowRef } from 'vue'

// const navBar = shallowRef([])
// export default boot(({ app, router, store }) => {
//   const routes = router.getRoutes()
//   const navBarPaths = ls.getItem('navBarPaths')
//   if (isArray(navBarPaths)) {
//     navBarPaths.forEach(path => {
//       const r = routes.find(r => r.path === path)
//       if (r) navBar.value.push(r)
//     })
//   }
// })

// export { navBar }
