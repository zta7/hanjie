<template>
  <q-dialog ref='dialogRef' persistent @hide='onDialogHide'>
    <q-card class='q-dialog-plugin' style='width: 320px'>
      <q-card-section />
      <q-card-section>
        {{ $t(content) }}
      </q-card-section>
      <q-card-actions align='right'>
        <q-btn :label='$t("ok")' color='primary' @click='onOKClick' />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { useDialogPluginComponent } from 'quasar'

export default {
  props: {
    content: {
      type: String,
      required: true
    },
    confirmBtnLabel: {
      type: String,
      required: false,
      default: 'Confirm'
    }
  },

  emits: [...useDialogPluginComponent.emits],

  setup() {
    const { dialogRef, onDialogHide, onDialogOK } = useDialogPluginComponent()
    return {
      dialogRef,
      onDialogHide,
      onOKClick() {
        onDialogOK(true)
      }
    }
  }
}
</script>
