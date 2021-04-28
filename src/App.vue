<template>
  <router-view />
</template>
<script>
import { defineComponent } from 'vue'
import { setCssVar } from 'quasar'
export default defineComponent({
  name: 'App',
  setup() {
    // setCssVar('q-md', '0px')
  }
})
</script>
