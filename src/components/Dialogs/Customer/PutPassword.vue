<template>
  <q-dialog ref='dialogRef' persistent position='top' @hide='onDialogHide'>
    <q-card class='q-dialog-plugin'>
      <q-card-section>
        {{ $t('customer.changePassword') }}
      </q-card-section>
      <q-card-section>
        <q-input v-model='values.password' :placeholder='$t("enterPassword")' rounded outlined :error='Boolean(errors["password"])' :error-message='errors["password"]' type='password'>
          <template #prepend>
            <q-icon name='vpn_key' />
          </template>
        </q-input>
        <q-input v-model='values.confirmPassword' :placeholder='$t("enterConfirmPassword")' rounded outlined :error='Boolean(errors["confirmPassword"])' :error-message='errors["confirmPassword"]' type='password'>
          <template #prepend>
            <q-icon name='vpn_key' />
          </template>
        </q-input>
      </q-card-section>
      <q-card-actions align='right'>
        <q-btn :label='$t("cancel")' class='q-mr-md' v-bind='$store.state.component.cancelButton' @click='onDialogHide' />
        <q-btn :label='$t("ok")' v-bind='$store.state.component.okButton' @click='onOKClick' />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { useDialogPluginComponent } from 'quasar'
import { useField, useForm } from 'vee-validate'
import { cloneDeep } from 'lodash'

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

    useField('password', 'required|min:6|max:16')
    useField('confirmPassword', 'required|confirmed:@password')

    const { dialogRef, onDialogHide, onDialogOK } = useDialogPluginComponent()

    return {
      values,
      errors,
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
