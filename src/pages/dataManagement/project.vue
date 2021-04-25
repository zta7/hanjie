<template>
  <div class='q-pa-md'>
    <div class='row q-gutter-x-md q-gutter-y-md'>
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
      <q-input v-model='projectId' label='项目编号' outlined dense>
        <template #before>
          <q-icon name='fingerprint' />
        </template>
      </q-input>
      <q-input v-model='projectName' label='项目名称' outlined dense>
        <template #before>
          <q-icon name='label' />
        </template>
      </q-input>
      <q-btn icon='search' label='搜索' push color='primary' />
    </div>
    <q-separator class='q-my-md' />
    <q-table
      title='Treats'
      :rows='rows'
      :columns='columns'
      row-key='name' />
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup() {
    return {
      startDate: ref(''),
      endDate: ref(''),
      projectId: ref(''),
      projectName: ref(''),
      columns: [
        {
          name: 'name',
          required: true,
          label: 'Dessert (100g serving)',
          align: 'left',
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: 'calories',
          align: 'center',
          label: 'Calories',
          field: 'calories',
          sortable: true
        },
        {
          name: 'fat',
          label: 'Fat (g)',
          field: 'fat',
          sortable: true
        },
        {
          name: 'carbs',
          label: 'Carbs (g)',
          field: 'carbs'
        },
        {
          name: 'protein',
          label: 'Protein (g)',
          field: 'protein'
        },
        {
          name: 'sodium',
          label: 'Sodium (mg)',
          field: 'sodium'
        },
        {
          name: 'calcium',
          label: 'Calcium (%)',
          field: 'calcium',
          sortable: true,
          sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
        },
        {
          name: 'iron',
          label: 'Iron (%)',
          field: 'iron',
          sortable: true,
          sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
        }
      ],

      rows: Array.from({ length: 50 }, () => {
        return {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          sodium: 87,
          calcium: '14%',
          iron: '1%'
        }
      })
    }
  }
})
</script>
