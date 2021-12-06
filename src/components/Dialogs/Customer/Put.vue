<template>
  <teleport v-bind='$store.state.component.teleport'>
    <q-dialog ref='dialogRef' v-bind='$store.getters["component/dialog"]' @hide='onDialogHide'>
      <q-layout view='lHh lpr lFf' container>
        <q-header v-bind='$store.state.component.dialogHeader'>
          <q-toolbar>
            <q-toolbar-title>
              {{ values._id !== undefined ? $t('customer.editCustomer') : $t('customer.addCustomer') }}
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
            <q-input v-model='values.name' :label='$t("customer.name")' outlined square stack-label :error='Boolean(errors["name"])' :error-message='errors["name"]' />
            <q-input v-model='values.account' :label='$t("customer.account")' outlined square stack-label :error='Boolean(errors["account"])' :error-message='errors["account"]' />
            <q-input v-model='values.phone' :label='$t("customer.phone")' outlined square stack-label :error='Boolean(errors["phone"])' :error-message='errors["phone"]' />
            <q-input v-model='values.email' :label='$t("customer.email")' outlined square stack-label :error='Boolean(errors["email"])' :error-message='errors["email"]' />

            <q-select
              v-model='values.company'
              :label='$t("customer.belongs")'
              :options='belongsOptions'
              outlined
              square
              stack-label
              use-input
              option-label='name'
              option-value='_id'
              :error='Boolean(errors["company"])'
              :error-message='errors["company"]'
              @filter='onBelongsFilter' />

            <q-select
              v-model='values.roles'
              :label='$t("customer.role")'
              :options='roleOptions'
              outlined
              square
              stack-label
              use-input
              multiple
              :error='Boolean(errors["roles"])'
              :error-message='errors["roles"]'
              @filter='onRolesFilter' />

            <q-input v-model='values.comment' :label='$t("customer.comment")' outlined square stack-label :error='Boolean(errors["comment"])' :error-message='errors["comment"]' type='textarea' />

            <!-- <q-select
              v-model='values.active'
              :label='$t("customer.active")'
              outlined
              square
              stack-label
              :options='activeOptions'
              :option-label='item => $_.isPlainObject(item) ? $t(item.label) : ""'
              emit-value
              map-options />
            <q-input v-model='values.email' :label='$t("customer.email")' outlined square stack-label />
            <q-input v-model='values.phone' :label='$t("customer.phone")' outlined square stack-label />
            <q-input v-model='values.comment' type='textarea' :label='$t("customer.comment")' outlined square stack-label /> -->
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
import { $departments } from 'api/department'
import { $roles } from 'api/roles'
import { shallowRef } from 'vue'

export default {
  props: {
    target: {
      type: Object,
      required: false
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
    useField('account', 'required')
    useField('name', 'required')
    useField('phone', 'required')
    useField('email', 'required')
    useField('company', 'required')
    useField('roles', 'required')
    useField('comment')

    const belongsOptions = shallowRef([])
    const roleOptions = shallowRef([])

    const { dialogRef, onDialogHide, onDialogOK } = useDialogPluginComponent()
    return {
      values,
      errors,
      onBelongsFilter(val, update, abort) {
        $departments({
          filter: {
            name: val
          }
        }).then(({ rows }) => {
          belongsOptions.value = rows.map(e => {
            return {
              name: e.name,
              _id: e._id
            }
          })
          update()
        })
      },
      onRolesFilter(val, update, abort) {
        $roles({
          filter: {
            name: val
          }
        }).then(({ rows }) => {
          roleOptions.value = rows.map(e => e.name)
          update()
        })
      },
      belongsOptions,
      roleOptions,
      dialogRef,
      activeOptions: [
        {
          label: 'customer.enable',
          value: 'enable'
        },
        {
          label: 'customer.disable',
          value: 'disabled'
        }
      ],
      onDialogHide,
      async onOKClick() {
        const { valid } = await validate()
        if (valid) onDialogOK(values)
      }
    }
  }
}
</script>
