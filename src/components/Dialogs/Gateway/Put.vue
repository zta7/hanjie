<template>
  <teleport v-bind='$store.state.component.teleport'>
    <q-dialog ref='dialogRef' v-bind='$store.getters["component/dialog"]' @hide='onDialogHide'>
      <q-layout view='lHh lpr lFf' container>
        <q-header v-bind='$store.state.component.dialogHeader'>
          <q-toolbar>
            <q-toolbar-title>
              {{ $t('gateway.editGateway') }}
            </q-toolbar-title>
            <q-space />
            <q-icon name='close' size='sm' class='cursor-pointer' @click='onDialogHide' />
          </q-toolbar>
        </q-header>

        <q-footer v-bind='$store.state.component.dialogFooter'>
          <q-toolbar>
            <q-space />
            <q-btn :label='$t("cancel")' color='negative' class='q-mr-md' @click='onDialogHide' />
            <q-btn :label='$t("ok")' color='primary' @click='onOKClick' />
          </q-toolbar>
        </q-footer>

        <q-page-container v-bind='$store.state.component.dialogPageContainer'>
          <q-page v-bind='$store.state.component.dialogPage'>
            <q-input v-model='values.id' :label='$t("gateway.id")' outlined square readonly stack-label />
            <q-input v-model='values.name' :label='$t("gateway.name")' outlined square stack-label />
            <q-input v-model='values.cfg.wifi.password' :label='$t("gateway.wifi")' outlined square stack-label />

            <q-card square flat bordered>
              <q-card-section class='q-pb-none'>{{ $t('gateway.modbusrtu') }}</q-card-section>
              <q-card-section>
                <q-input v-model='values.cfg.modbusrtu.com' :label='$t("gateway.com")' stack-label />
                <q-input v-model='values.cfg.modbusrtu.baudrate' :label='$t("gateway.baudrate")' stack-label />
                <q-input v-model='values.cfg.modbusrtu.dataBits' :label='$t("gateway.dataBits")' stack-label />
                <q-input v-model='values.cfg.modbusrtu.stopBits' :label='$t("gateway.stopBits")' stack-label />
                <q-input v-model='values.cfg.modbusrtu.parity' :label='$t("gateway.parity")' stack-label />
                <q-input v-model='values.cfg.modbusrtu.cycle' :label='$t("gateway.cycle")' stack-label />
                <q-field :label='$t("gateway.devices")' stack-label>
                  <template #append>
                    <q-btn flat dense icon='add' color='primary' @click='onAddDevice()' />
                  </template>
                  <template #control>
                    <q-table
                      flat
                      hide-pagination
                      class='q-mb-sm full-width'
                      :rows-per-page-options='[0]'
                      :rows='values.cfg.modbusrtu.devicelist'
                      :columns='columns'
                      row-key='_id'>
                      <template #header-cell='{ col }'>
                        <q-th :class='`text-${col.align}`'>
                          {{ $t(`${col.label}`) }}
                        </q-th>
                      </template>
                      <template #body-cell-mid='{row}'>
                        <q-td>
                          {{ row.mid }}
                          <q-popup-edit v-model='row.mid'>
                            <q-select v-model='row.mid' dense autofocus :options='midOptions' />
                          </q-popup-edit>
                        </q-td>
                      </template>
                      <template #body-cell-did='{row, rowIndex}'>
                        <q-td>
                          {{ row.did }}
                          <q-popup-edit v-model='row.did'>
                            <q-select
                              :model-value='row.did'
                              dense
                              autofocus
                              :options='didOptions'
                              use-input
                              option-label='did'
                              @update:model-value='v => onEditDevice(v, row, rowIndex )'
                              @filter='onFilterId' />
                          </q-popup-edit>
                        </q-td>
                      </template>
                      <template #body-cell-action='{rowIndex}'>
                        <q-td>
                          <div class='row justify-center q-gutter-x-md text-primary'>
                            <span class='cursor-pointer' @click='values.cfg.modbusrtu.devicelist.splice(rowIndex, 1)'>{{ $t("delete") }}</span>
                          </div>
                        </q-td>
                      </template>
                    </q-table>
                  </template>
                </q-field>
              </q-card-section>
            </q-card>

            <q-card v-for='n in values.cfg.network' :key='n.name' square flat bordered>
              <q-card-section class='q-pb-none'>{{ n.name }}</q-card-section>
              <q-card-section>
                <q-input v-model='n.address' :label='$t("gateway.address")' />
                <q-input v-model='n.gateway' :label='$t("gateway.gateway")' />
                <q-input v-model='n.netmask' :label='$t("gateway.netmask")' />
              </q-card-section>
            </q-card>

            <q-input v-model='values.comment' type='textarea' :label='$t("gateway.comment")' outlined square stack-label />
          </q-page>
        </q-page-container>
      </q-layout>
    </q-dialog>
  </teleport>
</template>

<script>
import { useDialogPluginComponent } from 'quasar'
import { cloneDeep, get, pullAll } from 'lodash'
import { computed, shallowRef } from 'vue'
import { useForm } from 'vee-validate'
import { $devices } from 'api/device'

export default {
  props: {
    target: {
      type: Object,
      required: true
    }
  },
  emits: [...useDialogPluginComponent.emits],

  setup(props) {
    const data = cloneDeep(props.target)
    const { validate, errors, values } = useForm({
      initialValues: {
        ...data
      }
    })
    const device = {
      label: '',
      dataType: ''
    }

    const MAX = 16

    const didOptions = shallowRef([])
    const midOptions = computed(() => pullAll(Array.from({ length: MAX }, (e, i) => i + 1), values.cfg.modbusrtu.devicelist.map(e => e.mid)))
    const { dialogRef, onDialogHide, onDialogOK } = useDialogPluginComponent()
    return {
      onEditDevice(device, row, rowIndex) {
        values.cfg.modbusrtu.devicelist.splice(rowIndex, 1, {
          ...row,
          ...device
        })
      },
      onFilterId(val, update, abort) {
        $devices({
          filter: {
            did: val
          }
        }).then(r => {
          update(() => {
            console.log(r.rows)
            didOptions.value = r.rows
          })
        })
      },
      didOptions,
      midOptions,
      values,
      errors,
      columns: [
        {
          name: 'mid',
          label: 'gateway.mid',
          field: 'mid',
          align: 'left'
        },
        {
          name: 'did',
          label: 'device.did',
          field: 'did',
          align: 'left'
        },
        {
          name: 'name',
          label: 'device.name',
          field: 'name',
          align: 'left'
        },
        {
          name: 'action',
          label: 'action',
          align: 'center'
        }
      ],
      onAddDevice(arr) {
        const _ = get(midOptions.value, '[0]')
        if (_) {
          const d = cloneDeep(device)
          d.mid = _
          values.cfg.modbusrtu.devicelist.push(d)
        }
      },
      dialogRef,
      onDialogHide,
      async onOKClick() {
        const { valid } = await validate()
        if (valid) onDialogOK(values)
      }
    }
  }
}
</script>
