<template>
  <q-list bordered class='no-border'>
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
  setup() {
    return {
      sidebarRoutes
    }
  }
}
</script>
