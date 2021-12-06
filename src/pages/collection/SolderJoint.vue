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
          title='当前已定义焊点列表'
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
          name: 'programId',
          align: 'left',
          label: '程序号',
          field: 'programId'
        },
        {
          name: 'welder',
          align: 'left',
          label: '所属焊机',
          field: 'welder'
        },
        {
          name: 'name',
          align: 'left',
          label: '焊点名',
          field: 'name'
        },
        {
          name: 'comment',
          align: 'left',
          label: '备注',
          field: 'comment'
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
