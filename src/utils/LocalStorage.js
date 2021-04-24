import { LocalStorage } from 'quasar'
import { provide as p, watch, reactive } from 'vue'

export default ({ key, toValue, validateFn, provide }, cb = () => {}) => {
  let v = LocalStorage.getItem(key)
  if (validateFn && !validateFn(v)) v = toValue

  const _ref = reactive(v)
  if (provide) p(key, _ref)

  cb(_ref)
  watch(_ref, n => {
    cb(n)
    LocalStorage.set(key, n)
  })
  return _ref
}
