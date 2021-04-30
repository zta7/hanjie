<template>
  <div class='no-scroll'>
    <canvas id='canvas' />
    <!-- <q-page-sticky position='top-left' :offset='[18, 18]'>
      <div class='column items-center q-gutter-y-xs'>
        <q-btn icon='horizontal_rule' round />
        <q-btn label='Reset' />
        <q-btn icon='add' round />
      </div>
    </q-page-sticky> -->
    <q-resize-observer v-if='canvas' debounce='200' @resize='onResize' />
  </div>
</template>
<script>
import { defineComponent, onMounted, shallowRef } from 'vue'
import fabric from 'fabric'
export default defineComponent({
  setup() {
    const canvas = shallowRef(false)
    onMounted(() => {
      const $ = fabric.fabric
      canvas.value = new $.Canvas('canvas')
      const text = new $.IText('站内设备网络拓扑图', {
        fill: 'red'
      })
      const text2 = new $.IText('站控管理层', {
        fill: 'red'
      })

      const t = new $.IText('图例')
      const r1 = new $.IText('通讯正常')
      const t1 = new $.IText('通讯正常')
      const r2 = new $.IText('通讯正常')
      const t2 = new $.IText('通讯异常')
      const r3 = new $.IText('1--n')
      const t3 = new $.IText('设备地址')

      const g1 = new $.Group([
        t, r1, t1, r2, t2, r3, t3
      ], {
        left: 150,
        top: 100,
        angle: -10
      })

      canvas.value.add(text)
      canvas.value.add(text2)
      canvas.value.add(g1)
    })
    return {
      onResize(size) {
        canvas.value.setDimensions(size)
      },
      canvas
    }
  }
})
</script>
