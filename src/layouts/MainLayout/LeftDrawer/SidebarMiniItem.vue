<template>
  <q-avatar :icon='item.meta.icon' @mouseenter='onAvatarMouseenter' @mouseleave='onAvatarMouseleave'>
    <sidebar-mini-menu
      :item='item'
      :model-value='menu'
      anchor='top right'
      self='top left'
      square
      no-parent-event
      :offset='[18, 0]'
      :auto-close='false'
      :transition-duration='100'
      no-route-dismiss
      :pre-path='item.path' />
  </q-avatar>
</template>
<script>
import { defineComponent, ref, provide } from 'vue'
import sidebarMiniMenu from './SidebarMiniMenu'

export default defineComponent({
  components: {
    sidebarMiniMenu
  },
  props: {
    item: [Object]
  },
  setup(props) {
    const menu = ref(false)
    provide('menu', menu)
    const timeoutId = ref(null)
    provide('timeoutId', timeoutId)
    return {
      menu,
      onAvatarMouseenter() {
        clearTimeout(timeoutId.value)
        menu.value = true
      },
      onAvatarMouseleave() {
        timeoutId.value = setTimeout(() => {
          menu.value = false
        }, 200)
      }
    }
  }
})
</script>
