import { defineRule, configure } from 'vee-validate'
import { localize } from '@vee-validate/i18n'
import en from '@vee-validate/i18n/dist/locale/en.json'
import zhCN from '@vee-validate/i18n/dist/locale/zh_CN.json'
import AllRules from '@vee-validate/rules'

Object.keys(AllRules).forEach(rule => {
  defineRule(rule, AllRules[rule])
})

defineRule('phone', v => {
  if (!v || !v.length) return true
  // 来源:https://github.com/VincentSit/ChinaMobilePhoneNumberRegex/blob/master/README-CN.md
  if (!/^(?:\+?86)?1(?:3\d{3}|5[^4\D]\d{2}|8\d{3}|7(?:[0-35-9]\d{2}|4(?:0\d|1[0-2]|9\d))|9[0-35-9]\d{2}|6[2567]\d{2}|4(?:(?:10|4[01])\d{3}|[68]\d{4}|[579]\d{2}))\d{6}$/.test(v)) return false
  return true
})

configure({
  generateMessage: localize({
    'en-US': {
      messages: {
        ...en.messages,
        phone: 'The {field} field must be a valid number'
      }
    },
    'zh-CN': {
      messages: {
        ...zhCN.messages,
        phone: '{field} 必须是正确的数字'
      }
    }
  })
})
