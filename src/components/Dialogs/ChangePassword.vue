<template>
  <q-dialog ref='dialogRef' position='top' persistent @hide='onDialogHide'>
    <q-card class='q-dialog-plugin' style='width: 320px'>
      <q-card-section class='q-px-none'>
        <q-item dense>
          <q-item-section class='text-h6'>
            修改密码
          </q-item-section>
        </q-item>
      </q-card-section>
      <q-card-section>
        <q-input v-model='originPassword' label='原密码' />
        <q-input v-model='newPassword' label='新密码' />
        <q-input v-model='confirmNewPassword' label='确认密码' />
      </q-card-section>
      <q-card-actions align='right'>
        <q-btn label='取消' flat @click='onDialogHide' />
        <q-btn label='确认' flat @click='onOKClick' />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { useDialogPluginComponent } from 'quasar'
import { ref } from 'vue'

export default {
  emits: [...useDialogPluginComponent.emits],

  setup(props) {
    const { dialogRef, onDialogHide, onDialogOK } = useDialogPluginComponent()

    const originPassword = ref('')
    const newPassword = ref('')
    const confirmNewPassword = ref('')

    return {
      originPassword,
      newPassword,
      confirmNewPassword,
      dialogRef,
      onDialogHide,
      onOKClick() {
        onDialogOK(true)
      }
    }
  }
}
</script>
