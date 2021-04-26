<template>
  <q-layout view='hHh lpR fFf'>
    <q-header bordered class='bg-primary text-white'>
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src='https://cdn.quasar.dev/logo/svg/quasar-logo.svg'>
          </q-avatar>
        </q-toolbar-title>
        <q-space />
        <q-btn-group flat>
          <q-btn flat icon-right='expand_more' label='ZTA'>
            <q-menu>
              <q-list style='min-width: 100px'>
                <q-item v-close-popup clickable @click='onChangePassword'>
                  <q-item-section>修改密码</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
          <q-btn flat icon='logout' label='退出' @click='onLogout' />
        </q-btn-group>
      </q-toolbar>
    </q-header>

    <left-drawer />

    <q-page-container>
      <q-page :style-fn='(offset, height) => { return { height: `${height - offset}px` }}'>
        <q-layout container class='full-width full-height'>
          <q-header>
            <nav-bar />
          </q-header>
          <q-page :style-fn='(offset, height) => { return { height: `${height}px` }}'>
            <q-page-container class='full-width full-height'>
              <router-view class='full-width full-height' />
            </q-page-container>
          </q-page>
        </q-layout>

        <!-- <q-page-sticky position='top' expand>
          <nav-bar class='full-width' />
        </q-page-sticky> -->
        <!-- <router-view style='padding-top: 48px' /> -->
        <!-- <router-view v-slot='{ Component }'>
          <keep-alive :include='["DemandMonitoring"]'>
            <component :is='Component' />
          </keep-alive>
        </router-view> -->
        <!-- <q-page-sticky position='bottom-right' :offset='[18, 18]' class='z-top'>
          <q-btn v-show='backToTop' push color='primary' icon='arrow_upward' round @click='onBackToTop()' />
        </q-page-sticky> -->
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import changePasswordDialog from 'components/Dialogs/ChangePassword.vue'
import leftDrawer from './MainLayout/LeftDrawer/'
import navBar from './MainLayout/NavBar/'
import { Dialog } from 'quasar'
import confirmDialog from 'components/Dialogs/Confirm'

export default {
  components: {
    leftDrawer,
    navBar
  },
  setup() {
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
    return {
      onLogout,
      onChangePassword
    }
  }
}
</script>
