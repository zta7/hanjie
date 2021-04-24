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
                <q-item v-close-popup clickable @click='changePassword'>
                  <q-item-section>修改密码</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
          <q-btn flat icon='logout' label='退出' />
        </q-btn-group>
      </q-toolbar>
    </q-header>

    <q-drawer :model-value='leftDrawerOpen' side='left' bordered behavior='desktop'>
      <left-drawer />
    </q-drawer>

    <q-page-container>
      <q-page :style-fn='styleFn' class='scroll'>
        <nav-bar />
        <router-view />
        <!-- <router-view v-slot='{ Component }'>
          <keep-alive :include='["DemandMonitoring"]'>
            <component :is='Component' />
          </keep-alive>
        </router-view> -->
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from 'vue'
import changePasswordDialog from 'components/Dialogs/ChangePassword.vue'
import leftDrawer from './MainLayout/LeftDrawer/'
import navBar from './MainLayout/NavBar/'
import { Dialog } from 'quasar'

export default {
  components: {
    leftDrawer,
    navBar
  },
  setup() {
    const leftDrawerOpen = ref(true)
    const changePassword = () => {
      Dialog.create({
        component: changePasswordDialog
      })
    }
    return {
      styleFn(offset, height) {
        return {
          height: `${height - offset}px`
        }
      },
      changePassword,
      leftDrawerOpen
    }
  }
}
</script>
