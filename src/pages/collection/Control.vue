<template>
  <q-layout container>
    <q-header class='bg-white text-black'>
      <div class='row no-wrap'>
        <q-btn icon='play_circle' label='一键运行' stack flat />
        <q-btn icon='cancel' label='一键停止' stack flat />
        <q-separator vertical inset />
      </div>
      <q-separator />
    </q-header>
    <q-page-container>
      <q-page :style-fn='(offset, height) => { return { height: `${height - offset}px` }}'>
        <q-splitter
          v-model='splitterModel'
          horizontal
          style='height: 100%'>
          <template #before>
            <q-splitter
              v-model='insideModel'>
              <template #before>
                <q-card flat>
                  <q-card-section class='text-caption'>焊机ViewR数据采集器</q-card-section>
                </q-card>
              </template>

              <template #after>
                <q-card flat>
                  <q-card-section class='text-caption'>信号采集器</q-card-section>
                </q-card>
              </template>
            </q-splitter>
          </template>

          <template #after>
            <q-card class='column no-wrap full-height' flat>
              <q-card-section class='text-caption'>日志</q-card-section>
              <q-card-section class='col-grow'>
                <q-input type='textarea' outlined />
              </q-card-section>
            </q-card>
          </template>
        </q-splitter>
      </q-page>
    </q-page-container>
    <q-footer class='bg-transparent text-black q-px-md q-py-xs'>
      本次进入程序时间
    </q-footer>
  </q-layout>
</template>
<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup() {
    return {
      splitterModel: ref(65),
      insideModel: ref(65)
    }
  }
})
</script>
