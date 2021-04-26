<template>
  <q-list class='no-border'>
    <q-avatar icon='menu' class='full-width cursor-pointer' @click='onMenuClick()' />
    <q-separator />
    <sidebar-item
      v-for='s in sidebarRoutes'
      :key='s.path'
      :item='s' />
  </q-list>
</template>
<script>
import { sidebarRoutes } from 'router/routes.js'
import sidebarItem from './SidebarItem'
export default {
  components: {
    sidebarItem
  },
  emits: ['update:mini'],
  setup(props, { emit }) {
    return {
      sidebarRoutes,
      onMenuClick() {
        emit('update:mini', true)
      }
    }
  }
}
</script>
