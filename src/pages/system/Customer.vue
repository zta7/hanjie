<template>
  <q-layout container>
    <q-header class='bg-white'>
      <div class='row q-gutter-x-xs q-gutter-y-md q-pa-md'>
        <q-btn color='primary' icon='add' :label=' $t("add")' @click='onPut()' />
        <q-space class='gt-xs' />
        <div class='row no-wrap q-gutter-x-xs'>
          <q-input v-model='filter.account' dense square outlined :label='$t("customer.account")' />
          <q-input v-model='filter.name' dense square outlined :label='$t("customer.name")' />
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
          flat
          :loading='loading'
          :grid='$q.screen.lt.sm'
          :rows='rows'
          :columns='columns'
          :filter='filter'
          :rows-per-page-options='[5, 10, 15, 20]'
          row-key='id'
          @request='onRequest'>
          <template #header-cell='{ col }'>
            <q-th :class='`text-${col.align}`'>
              {{ $t(`${col.label}`) }}
            </q-th>
          </template>
          <template #body-cell-belongs='{row}'>
            <q-td>
              {{ row.company.name }}
            </q-td>
          </template>
          <template #body-cell-roles='{row}'>
            <q-td>
              <q-chip>{{ row.roles[0] }}</q-chip>
            </q-td>
          </template>
          <template #body-cell-action='{row}'>
            <q-td class='text-center'>
              <q-btn-group flat rounded class='text-primary'>
                <q-btn flat @click='onPut(row)'>{{ $t("edit") }}</q-btn>
                <q-btn flat @click='onPutPassword(row)'>{{ $t("editPassword") }}</q-btn>
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
                    <q-btn round size='sm' icon='vpn_key' text-color='green' @click='onPutPassword(row)' />
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
                    <q-item-section v-if='col.name === "belongs"' side>
                      <q-item-label caption>{{ col.value.name }}</q-item-label>
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
import putAcountDialog from 'components/Dialogs/Customer/Put'
import putPasswordDialog from 'components/Dialogs/Customer/PutPassword'
import { useTable } from 'composition/useTable'
import { $customers, $deleteCustomer, $putCustomer } from 'api/customer'
import { Dialog } from 'quasar'

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
    } = useTable($customers)

    const { onDelete } = useDelete($deleteCustomer)
    const { onPut } = usePut($putCustomer, { component: putAcountDialog })
    return {
      onPutPassword(row) {
        Dialog.create({
          component: putPasswordDialog,
          componentProps: {
            target: row
          }
        }).onOk(values => {
          $putCustomer(values)
        })
      },
      columns: [
        {
          name: 'account',
          label: 'customer.account',
          field: 'account',
          align: 'left'
        },
        {
          name: 'name',
          label: 'customer.name',
          field: 'name',
          align: 'left'
        },
        {
          name: 'belongs',
          label: 'customer.belongs',
          field: 'company',
          align: 'left'
        },
        {
          name: 'roles',
          label: 'customer.role',
          field: 'roles',
          align: 'left'
        },
        // {
        //   name: 'active',
        //   label: 'customer.active',
        //   field: 'active',
        //   align: 'left'
        // },
        {
          name: 'email',
          label: 'customer.email',
          field: 'email',
          align: 'left'
        },
        {
          name: 'phone',
          label: 'customer.phone',
          field: 'phone',
          align: 'left'
        },
        {
          name: 'comment',
          label: 'customer.comment',
          field: 'comment',
          align: 'left'
        },
        {
          name: 'action',
          label: 'action',
          align: 'center'
        }
      ],
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
