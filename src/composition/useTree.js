import { ref, onMounted, watch } from 'vue'
import { get } from 'lodash'

export const useTree = ({ $api, $api2 }) => {
  // const ticked = ref([])
  const selected = ref('')
  const filter = ref({})
  const nodes = ref([])
  const loading = ref(true)
  const selectedData = ref([])
  const expanded = ref([])

  const onRequest = async() => {
    loading.value = true
    const r = await $api()
    nodes.value.splice(0, nodes.value.length, ...r.tree)
    loading.value = false
  }

  const onRequest2 = () => {
    $api2({
      key: selected.value,
      filter: filter.value
    }).then(r => {
      selectedData.value.splice(0, selectedData.value.length, ...get(r, 'rows', []))
    })
  }

  watch(selected, n => {
    onRequest2()
  })

  onMounted(async() => {
    await onRequest()
  })

  return {
    selected,
    loading,
    filter,
    expanded,
    onRequest,
    onRequest2,
    selectedData,
    nodes
  }
}
