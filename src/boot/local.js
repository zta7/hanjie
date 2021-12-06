import { boot } from 'quasar/wrappers'
import { Quasar, LocalStorage as ls } from 'quasar'

export default boot(({ store }) => {
  const locale = ls.getItem('locale') || Quasar.lang.getLocale()
  store.commit('ls/SET', ['locale', locale])
})

// export { setAllLocale }
