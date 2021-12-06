<template>
  <q-layout container>
    <q-header class='bg-white text-black'>
      <div class='row q-gutter-x-md q-gutter-y-md q-pa-md'>
        <div class='row no-wrap items-center'>
          <span class='q-mr-md'>
            {{ $t('event.timeRange') }}
          </span>
          <q-field :model-value='filter.startTime' dense outlined square clearable @update:model-value="val => (val === null && (filter.startTime = ''))">
            <template #control>
              <span v-if='filter.startTime'>
                {{ filter.startTime }}
              </span>
              <span v-else class='text-grey'>
                {{ $t("event.startTime") }}
              </span>
              <q-menu no-focus>
                <q-date v-model='filter.startTime' :options='_ => filter.endTime ? Date.parse(_) < Date.parse(filter.endTime) : Date.parse(_) < Date.now()' />
              </q-menu>
            </template>
          </q-field>
          <q-separator style='width: 12px; height: 2px' />
          <q-field :model-value='filter.endTime' dense outlined square clearable @update:model-value="val => (val === null && (filter.endTime = ''))">
            <template #control>
              <span v-if='filter.endTime'>
                {{ filter.endTime }}
              </span>
              <span v-else class='text-grey'>
                {{ $t("event.endTime") }}
              </span>
              <!-- {{ filter.startTime || $t("event.endTime") }} -->
              <q-menu no-focus>
                <q-date v-model='filter.endTime' :options='_ => date.isBetweenDates(_, filter.startTime || 0, Date.now())' />
              </q-menu>
            </template>
          </q-field>
        </div>
        <q-space class='gt-xs' />
        <div class='row no-wrap'>
          <q-input v-model='filter.deviceId' dense square outlined :label='$t("device.id")' clearable />
        </div>
        <div class='row'>
          <q-btn :label='$t("inquire")' color='primary' class='q-mr-sm' @click='onRequest()' />
          <q-btn :label='$t("batchEdit")' color='primary' @click='onBatchPut()' />
        </div>
      </div>
      <q-separator />
    </q-header>
    <q-page :style-fn='(offset, height) => { return { height: `${height}px` }}'>
      <q-page-container>
        <q-table
          v-model:selected='selected'
          v-model:pagination='pagination'
          :loading='loading'
          :filter='filter'
          :grid='$q.screen.lt.sm'
          :rows='rows'
          :columns='columns'
          class='q-mx-md'
          flat
          :rows-per-page-options='[5, 10, 15, 20]'
          selection='multiple'
          row-key='_id'
          @request='onRequest'>
          <template #header-cell='{ col }'>
            <q-th :class='`text-${col.align}`'>
              {{ $t(`${col.label}`) }}
            </q-th>
          </template>
          <template #body-cell-state>
            <q-td>
              <q-chip>{{ $t('event.untreated') }}</q-chip>
            </q-td>
          </template>
          <template #body-cell-type='{row}'>
            <q-td>
              <q-chip v-if='row.type === 0' class='bg-positive text-white'>{{ $t('event.normal') }}</q-chip>
              <q-chip v-else-if='row.type === 1' class='bg-warning text-white'>{{ $t('event.warning') }}</q-chip>
              <q-chip v-else-if='row.type === 2' class='bg-negative text-white'>{{ $t('event.negative') }}</q-chip>
            </q-td>
          </template>
          <template #body-cell-action='{row}'>
            <q-td class='text-center'>
              <q-btn-group flat rounded class='text-primary'>
                <q-btn flat @click='onPut(row)'>{{ $t("edit") }}</q-btn>
              </q-btn-group>
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
                    <q-item-section v-if='col.name === "type"' side>
                      <q-item-label caption>
                        <span v-if='row.type === 0'>
                          <q-chip>{{ $t('event.normal') }}</q-chip>
                        </span>
                        <span v-else-if='row.type === 1'>
                          <q-chip>{{ $t('event.warning') }}</q-chip>
                        </span>
                        <span v-else-if='row.type === 2'>
                          <q-chip>{{ $t('event.negative') }}</q-chip>
                        </span>
                      </q-item-label>
                    </q-item-section>
                    <q-item-section v-else-if='col.name === "state"' side>
                      <q-item-label caption>
                        {{ $t('event.untreated') }}
                      </q-item-label>
                    </q-item-section>
                    <q-item-section v-else side>
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
import putEventDialog from 'components/Dialogs/event/Put'
import batchPutEventDialog from 'components/Dialogs/event/BatchPut'

import { useTable } from 'composition/useTable'
import { $events, $putEvent, $batchPutEvent } from 'api/event'
import { date } from 'quasar'

export default defineComponent({
  setup() {
    const {
      selected,
      loading,
      rows,
      pagination,
      filter,
      onRequest,
      usePut,
      useBatchPut
    } = useTable($events)

    const { onPut } = usePut($putEvent, { component: putEventDialog })
    const { onBatchPut } = useBatchPut($batchPutEvent, { component: batchPutEventDialog })

    return {
      onPut,
      onBatchPut,
      selected,
      loading,
      rows,
      pagination,
      filter,
      onRequest,
      date,
      columns: [
        {
          name: 'deviceId',
          label: 'event.deviceId',
          field: 'deviceid',
          align: 'left'
        },
        {
          name: 'type',
          label: 'event.type',
          field: 'type',
          align: 'left'
        },
        {
          name: 'createdAt',
          label: 'event.createdAt',
          field: 'createdAt',
          align: 'left'
        },
        {
          name: 'reason',
          label: 'event.reason',
          field: 'reason',
          align: 'left'
        },
        {
          name: 'state',
          label: 'event.state',
          field: 'state',
          align: 'left'
        },
        {
          name: 'company',
          label: 'department.name',
          field: 'company',
          align: 'left'
        },
        {
          name: 'action',
          label: 'action',
          align: 'center'
        }
      ]
    }
  }

})
</script>
