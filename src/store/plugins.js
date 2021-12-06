import { Quasar, LocalStorage as ls } from 'quasar'
import { setLocale } from '@vee-validate/i18n'
import { i18n } from 'boot/i18n'

const setAllLocale = async locale => {
  // 只支持 zh-CN, en-US
  ['zh-CN', 'en-US'].includes(locale) ? '' : locale = 'en-US'
  try {
    const lang = await import(`quasar/lang/${locale}`)
    Quasar.lang.set(lang.default)
    setLocale(locale)
    i18n.global.locale = locale
  }
  catch (err) {
    console.log('setAllLocale error')
  }
}

export default [
  store => {
    store.subscribe(({ type, payload }) => {
      if (type === 'ls/SET') {
        ls.set(payload[0], payload[1])
        if (payload[0] === 'locale') setAllLocale(payload[1])
      }
    })
  }
]
