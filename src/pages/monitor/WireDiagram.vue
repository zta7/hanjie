<template>
  <div>
    123
  </div>
</template>
<script>
import { defineComponent, onMounted } from 'vue'
// import Snap from 'snapsvg'
export default defineComponent({
  setup() {
    onMounted(() => {
      // console.log(require('snapsvg'))
      const snap = require('imports-loader?wrapper=window&additionalCode=module.exports=0;')
      console.log(snap)
    })
  }
})
</script>
