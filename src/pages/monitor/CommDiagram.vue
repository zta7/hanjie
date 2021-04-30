<template>
  <div ref='commDiagramRef'>
    123
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue'
import go from 'gojs'

export default defineComponent({
  setup() {
    const commDiagramRef = ref(null)
    return {
      commDiagramRef
    }
  }
})
</script>
