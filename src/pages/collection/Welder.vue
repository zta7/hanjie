<template>
  <q-layout container>
    <q-header class='bg-white'>
      <div class='row q-gutter-x-xs q-gutter-y-md q-pa-md'>
        <div class='row no-wrap q-gutter-x-md'>
          <q-btn color='primary' icon='add' label='新增' />
        </div>
      </div>
      <q-separator />
    </q-header>
    <q-page :style-fn='(offset, height) => { return { height: `${height}px` }}'>
      <q-page-container>
        <q-table
          class='q-px-md'
          flat
          title='当前已定义焊机列表'
          :rows='rows'
          :columns='columns'
          row-key='id'>
          <template #body-cell-action='{row, col}'>
            <q-td :class='`text-${col.align}`'>
              <q-btn-group flat rounded class='text-primary'>
                <q-btn flat @click='onPut(row)'>修改</q-btn>
                <q-btn flat @click='onDelete(row)'>删除</q-btn>
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
export default defineComponent({
  setup() {
    return {
      columns: [
        {
          name: 'id',
          required: true,
          label: '编号',
          align: 'left',
          field: 'id'
        },
        {
          name: 'name',
          align: 'left',
          label: '名称',
          field: 'name'
        },
        {
          name: 'line',
          align: 'left',
          label: '所属线体',
          field: 'line'
        },
        {
          name: 'station',
          align: 'left',
          label: '所属工位',
          field: 'station'
        },
        {
          name: 'PLC',
          align: 'left',
          label: '所属PLC采集器',
          field: 'PLC'
        },
        {
          name: 'ViewR',
          align: 'left',
          label: '所属ViewR焊机数据采集器',
          field: 'ViewR'
        },
        {
          name: 'action',
          label: '操作',
          align: 'center'
        }
      ],
      rows: Array.from({ length: 100 }, (e, i) => {
        return {
          id: i,
          name: 159
        }
      })
    }
  }
})
</script>
