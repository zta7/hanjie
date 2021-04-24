<template>
  <z-sidebar />
</template>
<script>
import { sidebarRoutes } from 'router/routes.js'
import ZSidebar from './Sidebar.vue'
export default {
  components: {
    ZSidebar
  },
  setup() {
    // console.log(sidebarRoutes)
    return {
      sidebarRoutes
    }
  }
}
</script>
