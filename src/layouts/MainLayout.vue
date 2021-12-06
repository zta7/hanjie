<template>
  <q-layout view='hHh lpR fFf'>
    <q-header v-bind='$store.state.component.header'>
      <q-toolbar>
        <q-toolbar-title class='text-bold'>
          车身焊点质量监控系统
        </q-toolbar-title>
        <q-space />
        <right-bar />
      </q-toolbar>
      <!-- <q-separator v-bind='$store.state.component.separator' /> -->
    </q-header>

    <left-drawer />

    <q-page-container>
      <q-page
        :style-fn='(offset, height) => { return { height: `${height - offset}px` }}'>
        <q-layout
          view='hHh lpR fFf'
          container
          class='full-width full-height'>
          <q-header class='shadow-1'>
            <nav-bar />
            <!-- <q-separator v-bind='$store.state.component.separator' /> -->
          </q-header>
          <q-page-container>
            <q-page :style-fn='(offset, height) => { return { height: `${height - offset}px` }}'>
              <router-view v-slot='{ Component }' class='absolute-full'>
                <!-- <keep-alive> -->
                <component :is='Component' id='content' style='transform: scale(1)' />
                <!-- </keep-alive> -->
              </router-view>
            </q-page>
          </q-page-container>
        </q-layout>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import leftDrawer from './MainLayout/LeftDrawer/Index.vue'
import navBar from './MainLayout/NavBar/Index.vue'
import rightBar from './MainLayout/RightBar/Index.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    leftDrawer,
    navBar,
    rightBar
  }
})
</script>
