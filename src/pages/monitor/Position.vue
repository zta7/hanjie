<template>
  <div id='map' />
</template>
<script>
import { defineComponent, onMounted } from 'vue'

export default defineComponent({
  /* eslint-disable no-undef */
  setup() {
    onMounted(() => {
      new AMap.Map('map', {
        zoom: 11, // 级别
        center: [116.397428, 39.90923], // 中心点坐标
        viewMode: '3D'// 使用3D视图
      })
    })
    return {

    }
  }
})
</script>
