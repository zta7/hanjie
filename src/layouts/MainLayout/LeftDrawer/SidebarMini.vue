<template>
  <q-scroll-area class='fit mini-slot cursor-pointer'>
    <div class='column items-center'>
      <q-avatar icon='menu' @click='onMenuClick()' />
      <q-separator class='full-width' />
      <sidebar-mini-item v-for='r in sidebarRoutes' :key='r.path' :item='r' />
    </div>
  </q-scroll-area>
</template>
<script>
import { defineComponent, ref } from 'vue'
import { sidebarRoutes } from 'router/routes.js'
import sidebarMiniItem from './SidebarMiniItem'

export default defineComponent({
  components: {
    sidebarMiniItem
  },
  emits: ['update:mini'],
  setup(props, { emit }) {
    return {
      sidebarRoutes,
      onMouseenter() {
        console.log(1)
      },
      menu: ref(true),
      onMenuClick() {
        emit('update:mini', false)
      }
    }
  }
})
</script>
