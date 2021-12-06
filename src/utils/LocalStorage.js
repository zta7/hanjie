import { LocalStorage } from 'quasar'
import { watch, ref } from 'vue'

export default ({ key, toValue, validateFn }, cb = () => {}) => {
  let v = LocalStorage.getItem(key)
  if (validateFn && !validateFn(v)) v = toValue

  const _ref = ref(v)

  cb(_ref.value)
  watch(_ref, n => {
    cb(n)
    LocalStorage.set(key, n)
  })
  return _ref
}

const autoSave = ({ key, toValue, validateFn }, cb = () => {}) => {
  let v = LocalStorage.getItem(key)
  if (validateFn && !validateFn(v)) v = toValue

  const _ref = ref(v)

  cb(_ref.value)
  watch(_ref, n => {
    cb(n)
    LocalStorage.set(key, n)
  })
  return _ref
}

export { autoSave }
