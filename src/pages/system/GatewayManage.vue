<template>
  <q-layout container>
    <q-header class='bg-white'>
      <div class='row q-gutter-x-sm q-gutter-y-md q-pa-md'>
        <q-space class='gt-xs' />
        <div class='row no-wrap q-gutter-x-sm'>
          <q-input v-model='filter.id' dense square outlined :label='$t("gateway.id")' clearable />
          <q-input v-model='filter.name' dense square outlined :label='$t("gateway.name")' clearable />
        </div>
        <q-btn :label='$t("inquire")' color='primary' @click='onRequest()' />
      </div>
      <q-separator />
    </q-header>
    <q-page :style-fn='(offset, height) => { return { height: `${height}px` }}'>
      <q-page-container>
        <q-table
          v-model:pagination='pagination'
          :columns='columns'
          :grid='$q.screen.lt.sm'
          class='q-mx-md'
          :loading='loading'
          :rows-per-page-options='[5, 10, 15, 20]'
          :filter='filter'
          flat
          :rows='rows'
          row-key='id'
          @request='onRequest'>
          <template #header-cell='{ col }'>
            <q-th :class='`text-${col.align}`'>
              {{ $t(`${col.label}`) }}
            </q-th>
          </template>
          <template #body-cell-isOnline='{ row }'>
            <q-td>
              <q-icon
                size='md'
                :name='row.isOnline ? "radio_button_unchecked" : "highlight_off"'
                :color='row.isOnline ? "green" : "red"' />
            </q-td>
          </template>
          <template #item='{ row, cols }'>
            <div
              class='q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3'>
              <q-card>
                <q-card-section class='row justify-between items-center'>
                  <span># {{ row.id }}</span>
                  <q-btn-group flat>
                    <q-btn round size='sm' icon='edit' text-color='primary' @click='onPut(row)' />
                  </q-btn-group>
                </q-card-section>
                <q-separator />
                <q-list dense>
                  <q-item v-for='col in cols.filter(e => e.name !== "action")' :key='col.name'>
                    <q-item-section>
                      <q-item-label>{{ $t(col.label) }}</q-item-label>
                    </q-item-section>
                    <q-item-section v-if='col.name === "isOnline"' side>
                      <q-icon
                        :name='row.isOnline ? "radio_button_unchecked" : "highlight_off"'
                        :color='row.isOnline ? "green" : "red"' />
                    </q-item-section>
                    <q-item-section v-else side>
                      <q-item-label caption>{{ col.value }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-card>
            </div>
          </template>
          <template #body-cell-action='{row}'>
            <q-td class='text-center'>
              <q-btn-group flat rounded class='text-primary'>
                <q-btn flat @click='onPut(row)'>{{ $t("edit") }}</q-btn>
              </q-btn-group>
            </q-td>
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
import putGatewayDialog from 'components/Dialogs/Gateway/Put'
import { isArray } from 'lodash'
import { useTable } from 'composition/useTable'
import { $gateways, $putGateway } from 'api/gateway'

export default defineComponent({
  setup() {
    const columns = [
      {
        name: 'id',
        label: 'gateway.id',
        field: 'id',
        align: 'left'
      },
      {
        name: 'name',
        label: 'gateway.name',
        field: 'name',
        align: 'left'
      },
      {
        name: 'country',
        label: 'gateway.country',
        field: 'country',
        align: 'left'
      },
      {
        name: 'province',
        label: 'gateway.province',
        field: 'province',
        align: 'left'
      },
      {
        name: 'belongs',
        label: 'gateway.belongs',
        field: 'company',
        align: 'left'
      },
      {
        name: 'isOnline',
        label: 'gateway.isOnline',
        field: 'isOnline',
        align: 'left'
      },
      {
        name: 'comment',
        label: 'gateway.comment',
        field: 'comment',
        align: 'left'
      },
      {
        name: 'action',
        label: 'action',
        align: 'center'
      }
    ]
    const {
      loading,
      rows,
      pagination,
      filter,
      onRequest,
      usePut
    } = useTable($gateways)

    const { onPut } = usePut($putGateway, { component: putGatewayDialog })
    return {
      isArray,
      columns,
      loading,
      rows,
      pagination,
      filter,
      onRequest,
      onPut
    }
  }
})
</script>
