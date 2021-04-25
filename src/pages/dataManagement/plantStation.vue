<template>
  <div class='row q-gutter-md q-py-md'>
    <q-input v-model='startDate' outlined dense label='开始日期' mask='date'>
      <template #before>
        <q-icon name='event' />
      </template>
      <q-menu no-focus>
        <q-date v-model='startDate' />
      </q-menu>
    </q-input>
    <q-input v-model='endDate' outlined dense label='结束日期' mask='date'>
      <template #before>
        <q-icon name='event' />
      </template>
      <q-menu no-focus>
        <q-date v-model='endDate' />
      </q-menu>
    </q-input>
    <q-input v-model='projectName' label='项目名称' outlined dense>
      <template #before>
        <q-icon name='label' />
      </template>
    </q-input>
    <q-input v-model='plantStationId' label='厂站编号' outlined dense>
      <template #before>
        <q-icon name='fingerprint' />
      </template>
    </q-input>
    <q-input v-model='plantStationName' label='厂站名称' outlined dense>
      <template #before>
        <q-icon name='label' />
      </template>
    </q-input>
    <q-input v-model='plantStationAddress' label='厂站地址' outlined dense>
      <template #before>
        <q-icon name='place' />
      </template>
    </q-input>
    <q-btn icon='search' label='搜索' push color='primary' />
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup() {
    return {
      startDate: ref(''),
      endDate: ref(''),
      projectName: ref(''),
      plantStationId: ref(''),
      plantStationName: ref(''),
      plantStationAddress: ref('')
    }
  }
})
</script>
