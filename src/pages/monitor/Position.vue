<template>
  <div id='map' />
</template>
<script>
import { defineComponent, onMounted, onActivated } from 'vue'

export default defineComponent({
  name: 'Position',
  /* eslint-disable no-undef */
  setup() {
    let m
    onMounted(() => {
      m = new AMap.Map('map', {
        center: [117.000923, 36.675807],
        zoom: 11
      })
      onActivated(() => {
        m.setZoom(20)
        console.log('yeah')
      })
    })

    return {

    }
  }
})
</script>
