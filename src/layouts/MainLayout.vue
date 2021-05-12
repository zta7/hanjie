<template>
  <q-layout view='hHh lpR fFf'>
    <q-header bordered>
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            L
          </q-avatar>
        </q-toolbar-title>
        <q-space />
        <right-bar />
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
              <router-view v-slot='{ Component }' class='full-width full-height'>
                <keep-alive :include='["DemandMonitoring", "Position"]'>
                  <component :is='Component' />
                </keep-alive>
              </router-view>
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
import leftDrawer from './MainLayout/LeftDrawer/'
import navBar from './MainLayout/NavBar/'
import rightBar from './MainLayout/RightBar/'

export default {
  components: {
    leftDrawer,
    navBar,
    rightBar
  }
}
</script>
