<template>
  <q-layout container>
    <q-header class='bg-white'>
      <div class='row q-gutter-x-xs q-gutter-y-md q-pa-md'>
        <div class='row no-wrap q-gutter-x-md'>
          <q-input v-model='filter.workshopNumber' dense square outlined label='车间编号' />
          <q-input v-model='filter.stationNumber' dense square outlined label='工位编号' />
          <q-input v-model='filter.robotNumber' dense square outlined label='机器人编号' />
          <q-input v-model='filter.torchNumber' dense square outlined label='焊枪编号' />
          <q-input v-model='filter.programNumber' dense square outlined label='程序编号' />
        </div>
      </div>
      <q-separator />
    </q-header>
    <q-page :style-fn='(offset, height) => { return { height: `${height}px` }}'>
      <q-page-container class='full-height'>
        <q-splitter
          v-model='splitterModel'
          style='height: 100%'>
          <template #before>
            <div class='q-pa-md'>
              <div class='text-h4 q-mb-md'>焊点监控位置</div>
              <div>
                <q-img
                  src='https://placeimg.com/500/300/nature' />
              </div>
            </div>
          </template>

          <template #after>
            <div class='q-pa-md'>
              <div class='text-h4 q-mb-md'>监控数据详情</div>
              <div>
                123
              </div>
            </div>
          </template>
        </q-splitter>
      </q-page-container>
    </q-page>
  </q-layout>
</template>
<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup() {
    const filter = ref({
      workshopNumber: '',
      stationNumber: '',
      robotNumber: '',
      torchNumber: '',
      programNumber: ''
    })
    return {
      splitterModel: ref(50),
      filter
    }
  }
})
</script>
