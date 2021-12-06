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
          title='当前已定义PLC采集器列表'
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
          name: 'type',
          align: 'left',
          label: '类型',
          field: 'type'
        },
        {
          name: 'OPC',
          align: 'left',
          label: 'OPC服务连接串',
          field: 'OPC'
        },
        {
          name: 'channel',
          align: 'left',
          label: '频道.设备前缀',
          field: 'channel'
        },
        {
          name: 'ip',
          align: 'left',
          label: 'IP地址',
          field: 'ip'
        },
        {
          name: 'port',
          align: 'left',
          label: '端口号',
          field: 'port'
        },
        {
          name: 'cycle',
          align: 'left',
          label: '刷新周期(ms)',
          field: 'cycle'
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
