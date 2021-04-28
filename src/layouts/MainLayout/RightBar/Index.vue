<template>
  <div class='self-stretch row no-wrap items-center q-gutter-x-md cursor-pointer' style='font-size: 2em'>
    <q-icon :name='!isFullscreen ? "fullscreen" : "fullscreen_exit"' @click='onFullscreen()' />
    <q-icon name='style'>
      <q-menu>
        <q-list style='min-width: 100px'>
          <q-item v-close-popup clickable>
            <q-item-section>Light</q-item-section>
          </q-item>
          <q-item v-close-popup clickable>
            <q-item-section>Dark</q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-icon>
    <q-icon name='person'>
      <q-menu>
        <q-list style='min-width: 100px'>
          <q-item v-close-popup clickable @click='onChangePassword'>
            <q-item-section>修改密码</q-item-section>
          </q-item>
          <q-item v-close-popup clickable @click='onLogout'>
            <q-item-section>退出账号</q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-icon>
  </div>
  <!-- <q-btn-group flat>
    <q-btn flat icon-right='expand_more' label='ZTA' :ripple='false'>
      <q-menu>
        <q-list style='min-width: 100px'>
          <q-item v-close-popup clickable @click='onChangePassword'>
            <q-item-section>修改密码</q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-btn>
    <q-btn flat icon='logout' label='退出' @click='onLogout' />
  </q-btn-group> -->
</template>
<script>
import { defineComponent, computed, ref } from 'vue'
import { Dialog, useQuasar } from 'quasar'
import confirmDialog from 'components/Dialogs/Confirm'
import changePasswordDialog from 'components/Dialogs/ChangePassword.vue'

export default defineComponent({
  setup() {
    const $q = useQuasar()

    const onChangePassword = () => {
      Dialog.create({
        component: changePasswordDialog
      })
    }
    const onLogout = () => {
      Dialog.create({
        component: confirmDialog,
        componentProps: {
          content: '确认登出当前账号 ?',
          confirmBtnLabel: '登出'
        }
      }).onOk(() => {
        // do logout
      })
    }
    const onFullscreen = () => {
      $q.fullscreen.toggle()
    }
    const isFullscreen = computed(() => $q.fullscreen.isActive)

    const serachHidden = ref('true')
    return {
      serachHidden,
      isFullscreen,
      onFullscreen,
      onLogout,
      onChangePassword
    }
  }
})
</script>
