<template>
  <div>
    <q-input v-model='v' />
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup() {
    return {
      v: ref('')
    }
  }
})
</script>
