<template>
  <teleport to='#content' v-bind='$store.state.component.teleport'>
    <q-dialog ref='dialogRef' v-bind='$store.getters["component/dialog"]' @hide='onDialogHide'>
      <q-layout view='lHh lpr lFf' container>
        <q-header v-bind='$store.state.component.dialogHeader'>
          <q-toolbar>
            <q-toolbar-title>
              {{ values._id !== undefined ? $t('device.editDevice') : $t('device.addDevice') }}
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
            <!-- <q-input v-model='values.code' :label='$t("device.code")' outlined square :error='Boolean(errors["code"])' :error-message='errors["code"]' stack-label /> -->
            <q-card flat bordered>
              <q-card-section class='text-h6'>{{ $t('device.info') }}</q-card-section>
              <q-card-section>
                <q-input v-model='values.id' :label='$t("device.id")' outlined square :error='Boolean(errors["id"])' :error-message='errors["id"]' stack-label />
                <q-input v-model='values.name' :label='$t("device.name")' outlined square :error='Boolean(errors["name"])' :error-message='errors["name"]' stack-label />
                <q-input v-model='values.comment' :label='$t("device.comment")' outlined square :error='Boolean(errors["comment"])' :error-message='errors["comment"]' stack-label />
              </q-card-section>
            </q-card>
            <q-table :rows='values.pointlist' :columns='columns' :row-key='r => r.rowIndex' flat bordered>
              <template #top>
                <span class='text-h6'>{{ $t('device.fields') }}</span>
                <q-space />
                <q-btn color='primary' :label='$t("device.addField")' icon='add' @click='onAddField()' />
              </template>
              <template #header-cell='{ col }'>
                <q-th :class='`text-${col.align}`'>
                  {{ $t(`${col.label}`) }}
                </q-th>
              </template>
              <template #body-cell-action='{rowIndex}'>
                <q-td>
                  <div class='row justify-center q-gutter-x-md text-primary'>
                    <span class='cursor-pointer' @click='values.pointlist.splice(rowIndex, 1)'>{{ $t("delete") }}</span>
                  </div>
                </q-td>
              </template>
              <template #body-cell-name='{row}'>
                <q-td>
                  {{ row.name ? $t(`device.${row.name}`) : '' }}
                  <q-popup-edit v-model='row.name'>
                    <q-select v-model='row.name' dense autofocus :options='nameOptions' :option-label='v => $t(`device.${v}`)' :display-value="`${row.name ? $t(`device.${row.name}`) : ''}`" />
                  </q-popup-edit>
                </q-td>
              </template>
              <template #body-cell-datatype='{row}'>
                <q-td>
                  {{ row.datatype }}
                  <q-popup-edit v-model='row.datatype'>
                    <q-select v-model='row.datatype' dense autofocus :options='dataTypeOptions' />
                  </q-popup-edit>
                </q-td>
              </template>
              <template #body-cell-address='{row}'>
                <q-td>
                  {{ row.address }}
                  <q-popup-edit v-model='row.address'>
                    <q-input v-model='row.address' dense autofocus />
                  </q-popup-edit>
                </q-td>
              </template>
              <template #body-cell-a='{row}'>
                <q-td>
                  {{ row.a }}
                  <q-popup-edit v-model='row.a'>
                    <q-input v-model='row.a' dense autofocus />
                  </q-popup-edit>
                </q-td>
              </template>
              <template #body-cell-b='{row}'>
                <q-td>
                  {{ row.b }}
                  <q-popup-edit v-model='row.b'>
                    <q-input v-model='row.b' dense autofocus />
                  </q-popup-edit>
                </q-td>
              </template>
            </q-table>
          </q-page>
        </q-page-container>
      </q-layout>
    </q-dialog>
  </teleport>
</template>

<script>
import { useDialogPluginComponent } from 'quasar'
import { cloneDeep } from 'lodash'
import { useField, useForm } from 'vee-validate'

export default {
  props: {
    target: {
      type: Object,
      required: false,
      default() {
        return {}
      }
    }
  },
  emits: [...useDialogPluginComponent.emits],

  setup(props) {
    let data = cloneDeep(props.target)
    const device = {
      id: '',
      name: '',
      comment: '',
      pointlist: []
    }
    data = {
      ...device,
      ...data
    }
    const { validate, errors, values } = useForm({
      initialValues: {
        ...data
      }
    })
    const point = {
      name: '',
      datatype: '',
      address: '',
      a: '1',
      b: '0'
    }

    useField('pointlist')
    useField('comment')
    useField('name', 'required')
    useField('id', 'required')

    const { dialogRef, onDialogHide, onDialogOK } = useDialogPluginComponent()
    return {
      values,
      errors,
      nameOptions: ['oxygen', 'carbonDioxide', 'temperature'],
      dataTypeOptions: ['string', 'int'],
      columns: [
        {
          name: 'name',
          label: 'device.label',
          field: 'name',
          align: 'left'
        },
        {
          name: 'datatype',
          label: 'device.dataType',
          field: 'datatype',
          align: 'left'
        },
        {
          name: 'address',
          label: 'device.address',
          field: 'address',
          align: 'left'
        },
        {
          name: 'a',
          label: 'device.a',
          field: 'a',
          align: 'left'
        },
        {
          name: 'b',
          label: 'device.b',
          field: 'b',
          align: 'left'
        },
        {
          name: 'action',
          label: 'action',
          align: 'center'
        }
      ],
      onAddField() {
        values.pointlist.push(cloneDeep(point))
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
