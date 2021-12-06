<template>
  <q-layout container>
    <q-header class='bg-white'>
      <div class='row q-gutter-x-sm q-gutter-y-md q-pa-md'>
        <q-btn icon='add' :label='$t("add")' color='primary' @click='onPut()' />
        <q-space class='gt-xs' />
        <div class='row no-wrap'>
          <q-input v-model='filter.id' dense square outlined :label='$t("device.id")' />
        </div>
        <q-btn :label='$t("inquire")' color='primary' />
      </div>
      <q-separator />
    </q-header>
    <q-page :style-fn='(offset, height) => { return { height: `${height}px` }}'>
      <q-page-container>
        <q-table
          v-model:pagination='pagination'
          class='q-mx-md'
          :filter='filter'
          :loading='loading'
          :rows-per-page-options='[5, 10, 15, 20]'
          flat
          grid
          :rows='rows'
          row-key='id'
          @request='onRequest'>
          <template #header-cell='{ col }'>
            <q-th :class='`text-${col.align}`'>
              {{ $t(`${col.label}`) }}
            </q-th>
          </template>
          <template #item='{ row }'>
            <div
              class='q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3'>
              <q-card>
                <q-card-section class='row justify-between items-center'>
                  <span># {{ row.code }}</span>
                  <q-btn-group flat>
                    <q-btn round size='sm' icon='delete' text-color='red' @click='onDelete(row)' />
                    <q-btn round size='sm' icon='edit' text-color='primary' @click='onPut(row)' />
                  </q-btn-group>
                </q-card-section>
                <q-separator />
                <q-list dense>
                  <q-item>
                    <q-item-section>
                      <q-item-label>{{ $t(`device.id`) }}</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <q-item-label caption>{{ row.id }}</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section>
                      <q-item-label>{{ $t(`device.name`) }}</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <q-item-label caption>{{ row.name }}</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section>
                      <q-item-label>{{ $t(`device.comment`) }}</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <q-item-label caption>{{ row.comment }}</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-expansion-item :label='$t(`device.fields`)' :content-inset-level='1' dense>
                    <q-item v-for='(r,i) in row.pointlist' :key='i' dense>
                      <q-item-section>{{ r.name ? $t(`device.${r.name}`) : '' }}</q-item-section>
                      <q-item-section side>{{ r.datatype }}</q-item-section>
                    </q-item>
                  </q-expansion-item>
                </q-list>
              </q-card>
            </div>
          </template>
        </q-table>
      </q-page-container>
      <q-page-scroller position='bottom-right' :duration='100'>
        <q-btn
          class='bg-transparent text-black'
          fab-mini
          icon='keyboard_arrow_up' />
      </q-page-scroller>
    </q-page>
  </q-layout>
</template>
<script>
import { defineComponent } from 'vue'
import putDeviceDialog from 'components/Dialogs/Device/Put'
import { isArray } from 'lodash'

import { useTable } from 'composition/useTable'
import { $devices, $deleteDevice, $putDevice } from 'api/device'

export default defineComponent({
  setup() {
    const {
      loading,
      rows,
      pagination,
      filter,
      onRequest,
      useDelete,
      usePut
    } = useTable($devices)

    console.log(rows)

    const { onDelete } = useDelete($deleteDevice)
    const { onPut } = usePut($putDevice, { component: putDeviceDialog })

    return {
      isArray,
      loading,
      rows,
      pagination,
      filter,
      onRequest,
      onDelete,
      onPut
    }
  }
})
</script>
