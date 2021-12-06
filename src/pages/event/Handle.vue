<template>
  <q-layout container>
    <q-header class='bg-white text-black'>
      <div class='row q-gutter-x-md q-gutter-y-md q-pa-md'>
        <q-btn :label='$t("export")' icon='mdi-microsoft-excel' color='teal' :loading='exportLoading' @click='onExport({}, columns)' />
        <q-space class='gt-xs' />
        <div class='row no-wrap'>
          <q-input v-model='filter.deviceId' dense square outlined :label='$t("device.id")' />
        </div>
        <q-btn :label='$t("inquire")' color='primary' class='q-mr-sm' @click='onRequest()' />
      </div>
      <q-separator />
    </q-header>
    <q-page :style-fn='(offset, height) => { return { height: `${height}px` }}'>
      <q-page-container>
        <q-table
          v-model:filter='filter'
          v-model:pagination='pagination'
          v-model:selected='selected'
          :loading='loading'
          :filter='filter'
          :grid='$q.screen.lt.sm'
          :rows='rows'
          :columns='columns'
          class='q-mx-md'
          flat
          :rows-per-page-options='[5, 10, 15, 20]'
          selection='multiple'
          row-key='id'
          @request='onRequest'>
          <template #header-cell='{ col }'>
            <q-th :class='`text-${col.align}`'>
              {{ $t(`${col.label}`) }}
            </q-th>
          </template>

          <template #item='{ row, cols }'>
            <div
              class='q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3'>
              <q-card>
                <q-card-section class='row justify-between items-center'>
                  <span># {{ row.id }}</span>
                  <div class='row justify-center q-gutter-x-xs text-primary'>
                    <q-icon class='cursor-pointer' name='edit' size='xs' @click='onPut(row)' />
                  </div>
                </q-card-section>
                <q-separator />
                <q-list dense>
                  <q-item v-for='col in cols.filter(e => e.name !== "action")' :key='col.name'>
                    <q-item-section>
                      <q-item-label>{{ $t(col.label) }}</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <q-item-label caption>{{ col.value }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-card>
            </div>
          </template>
        </q-table>
      </q-page-container>
      <q-page-scroller position='bottom-right' :scroll-offset='150' :offset='[25, 50]' :duration='100'>
        <q-btn fab icon='keyboard_arrow_up' color='accent' />
      </q-page-scroller>
    </q-page>
  </q-layout>
</template>
<script>
import { defineComponent } from 'vue'
import { useTable } from 'composition/useTable'
import { $eventHandles } from 'api/eventHandle'

export default defineComponent({
  setup() {
    const {
      selected,
      loading,
      rows,
      pagination,
      filter,
      onRequest,
      useExport
    } = useTable($eventHandles)

    const columns = [
      {
        name: 'deviceId',
        label: 'event.deviceId',
        field: 'deviceid',
        align: 'left'
      },
      {
        name: 'handleContent',
        label: 'event.handleContent',
        field: 'handleContent',
        align: 'left'
      },
      {
        name: 'reason',
        label: 'event.reason',
        field: 'reason',
        align: 'left'
      },
      {
        name: 'operatorDate',
        label: 'event.operatorDate',
        field: 'updatedAt',
        align: 'left'
      }
    ]

    const { loading: exportLoading, onExport } = useExport($eventHandles)

    return {
      onExport,
      exportLoading,
      selected,
      loading,
      rows,
      pagination,
      filter,
      onRequest,
      columns
    }
  }

})
</script>
