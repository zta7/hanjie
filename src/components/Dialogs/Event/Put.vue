<template>
  <teleport v-bind='$store.state.component.teleport'>
    <q-dialog ref='dialogRef' v-bind='$store.getters["component/dialog"]' @hide='onDialogHide'>
      <q-layout view='lHh lpr lFf' container>
        <q-header v-bind='$store.state.component.dialogHeader'>
          <q-toolbar>
            <q-toolbar-title>
              {{ $t('event.handleEvent') }}
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
            <q-input :model-value='data.deviceid' :label='$t("event.deviceId")' outlined square stack-label readonly />
            <q-input :model-value='data.reason' :label='$t("event.reason")' outlined square stack-label readonly />
            <q-input v-model='data.handleContent' type='textarea' :label='$t("event.handleContent")' outlined square stack-label />
          </q-page>
        </q-page-container>
      </q-layout>
    </q-dialog>
  </teleport>
</template>

<script>
import { useDialogPluginComponent } from 'quasar'
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
    const { dialogRef, onDialogHide, onDialogOK } = useDialogPluginComponent()
    return {
      data,
      dialogRef,
      onDialogHide,
      onOKClick() {
        onDialogOK(data)
      }
    }
  }
}
</script>
