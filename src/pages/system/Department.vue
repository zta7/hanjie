<template>
  <q-layout container>
    <q-header class='bg-white'>
      <div class='row q-gutter-x-sm q-gutter-y-md q-pa-md'>
        <q-btn icon='add' :label='$t("add")' color='primary' @click='onPut()' />
        <q-space class='gt-xs' />
        <div class='row no-wrap'>
          <q-input v-model='filter.name' dense square outlined :label='$t("department.name")' />
        </div>
        <q-btn :label='$t("inquire")' color='primary' />
      </div>
      <q-separator />
    </q-header>
    <q-page :style-fn='(offset, height) => { return { height: `${height}px` }}'>
      <q-page-container>
        <q-table
          v-model:pagination='pagination'
          :loading='loading'
          :grid='$q.screen.lt.sm'
          :rows='rows'
          :columns='columns'
          :filter='filter'
          :rows-per-page-options='[5, 10, 15, 20]'
          class='q-mx-md'
          flat
          row-key='id'
          @request='onRequest'>
          <template #header-cell='{ col }'>
            <q-th :class='`text-${col.align}`'>
              {{ $t(`${col.label}`) }}
            </q-th>
          </template>
          <template #body-cell-action='{row}'>
            <q-td class='text-center'>
              <q-btn-group flat rounded class='text-primary'>
                <q-btn flat @click='onPut(row)'>{{ $t("edit") }}</q-btn>
                <q-btn flat @click='onDelete(row)'>{{ $t("delete") }}</q-btn>
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
                    <q-btn round size='sm' icon='delete' text-color='red' @click='onDelete(row)' />
                    <q-btn round size='sm' icon='edit' text-color='primary' @click='onPut(row)' />
                  </q-btn-group>
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
import putDepartmentDialog from 'components/Dialogs/Department/Put'
import { $departments, $deleteDepartment, $putDepartment } from 'api/department'
import { useTable } from 'composition/useTable'

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
    } = useTable($departments)

    const { onDelete } = useDelete($deleteDepartment)
    const { onPut } = usePut($putDepartment, { component: putDepartmentDialog })

    return {
      onPut,
      onDelete,
      onRequest,
      filter,
      columns: [
        {
          name: 'name',
          label: 'department.name',
          field: 'name',
          align: 'left'
        },
        {
          name: 'account',
          label: 'department.account',
          field: 'account',
          align: 'left'
        },
        {
          name: 'password',
          label: 'department.password',
          field: 'password',
          align: 'left'
        },
        {
          name: 'comment',
          label: 'department.comment',
          field: 'comment',
          align: 'left'
        },
        {
          name: 'action',
          label: 'action',
          align: 'middle'
        }
      ],
      loading,
      pagination,
      rows
    }
  }
})
</script>
