<template>
  <teleport v-bind='$store.state.component.teleport'>
    <q-dialog ref='dialogRef' v-bind='$store.getters["component/dialog"]' @hide='onDialogHide'>
      <q-layout view='lHh lpr lFf' container>
        <q-header v-bind='$store.state.component.dialogHeader'>
          <q-toolbar>
            <q-toolbar-title>
              {{ $t('role.editRole') }}
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
            <q-input v-model='values.name' readonly outlined square :label='$t("role.name")' />
            <q-field :label="$t('role.permission')" stack-label outlined>
              <template #control>
                <q-tree
                  v-model:ticked='values.routes'
                  :nodes='routes'
                  node-key='path'
                  tick-strategy='strict'>
                  <template #default-header='prop'>
                    <div class='row items-center'>
                      <div>{{ $t(`nav.${prop.node.meta.label}`) }}</div>
                    </div>
                  </template>
                </q-tree>
              </template>
            </q-field>
            <!-- {{ values.routes }} -->
            <q-input v-model='values.comment' type='textarea' outlined square :label='$t("role.comment")' />
          </q-page>
        </q-page-container>
      </q-layout>
    </q-dialog>
  </teleport>
</template>

<script>
import { useDialogPluginComponent } from 'quasar'
import { cloneDeep } from 'lodash'
import { useForm } from 'vee-validate'
import { sidebarRoutes } from 'router/routes.js'
import generateRoutes from 'utils/generateRoutes'

export default {
  props: {
    target: {
      type: Object,
      required: true
    }
  },
  emits: [...useDialogPluginComponent.emits],

  setup(props) {
    const routes = generateRoutes({ routes: sidebarRoutes })
    const data = cloneDeep(props.target)
    const { validate, errors, values } = useForm({
      initialValues: {
        ...data
      }
    })

    const { dialogRef, onDialogHide, onDialogOK } = useDialogPluginComponent()
    return {
      routes,
      values,
      errors,
      dialogRef,
      onDialogHide,
      async onOKClick() {
        const { valid } = await validate()
        if (!valid) return
        else onDialogOK(values)
      }
    }
  }
}
</script>
