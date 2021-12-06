<template>
  <teleport v-bind='$store.state.component.teleport'>
    <q-dialog ref='dialogRef' v-bind='$store.getters["component/dialog"]' @hide='onDialogHide'>
      <q-layout view='lHh lpr lFf' container>
        <q-header v-bind='$store.state.component.dialogHeader'>
          <q-toolbar>
            <q-toolbar-title>
              {{ values._id !== undefined ? $t('department.editDepartment') : $t('department.addDepartment') }}
            </q-toolbar-title>
            <q-space />
            <q-icon name='close' size='sm' class='cursor-pointer' @click='onDialogHide' />
          </q-toolbar>
        </q-header>

        <q-footer v-bind='$store.state.component.dialogFooter'>
          <q-toolbar>
            <q-space />
            <q-btn :label='$t("cancel")' class='q-mr-md' v-bind='$store.state.component.cancelButton' @click='onDialogHide' />
            <q-btn :label='$t("ok")' v-bind='$store.state.component.okButton' @click='onOKClick' />
          </q-toolbar>
        </q-footer>

        <q-page-container v-bind='$store.state.component.dialogPageContainer'>
          <q-page v-bind='$store.state.component.dialogPage'>
            <q-input v-model='values.account' :label='$t("department.account")' outlined square stack-label :error='Boolean(errors["account"])' :error-message='errors["account"]' />
            <q-input v-model='values.password' :label='$t("department.password")' outlined square stack-label :error='Boolean(errors["password"])' :error-message='errors["password"]' />
            <q-input v-model='values.name' :label='$t("department.name")' outlined square stack-label :error='Boolean(errors["name"])' :error-message='errors["name"]' />
            <q-input v-model='values.comment' type='textarea' :label='$t("department.comment")' outlined square stack-label />
          </q-page>
        </q-page-container>
      </q-layout>
    </q-dialog>
  </teleport>
</template>

<script>
import { useDialogPluginComponent } from 'quasar'
import { ref } from 'vue'
import { cloneDeep } from 'lodash'
import { useField, useForm } from 'vee-validate'

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

    useField('name', 'required')
    useField('account', 'required')
    useField('password', 'required')
    useField('comment')

    const belongsFilter = ref('')
    const { dialogRef, onDialogHide, onDialogOK } = useDialogPluginComponent()
    return {
      values,
      errors,
      dialogRef,
      belongsFilter,
      onDialogHide,
      async onOKClick() {
        const { valid } = await validate()
        if (valid) onDialogOK(values)
      }
    }
  }
}
</script>
