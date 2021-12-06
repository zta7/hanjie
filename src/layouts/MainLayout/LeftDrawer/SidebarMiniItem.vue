<template>
  <q-avatar v-if='!item.hidden' :icon='item.meta.icon' @mouseenter='onAvatarMouseenter' @mouseleave='onAvatarMouseleave' @click='onClick'>
    <sidebar-mini-menu
      v-if='item.children'
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
    <q-tooltip v-else anchor='center right' self='center left' :offset='[10, 10]' class='text-white bg-primary'>
      {{ $t(`nav.${item.meta.label}`) }}
    </q-tooltip>
  </q-avatar>
</template>
<script>
import { defineComponent, ref, provide } from 'vue'
import sidebarMiniMenu from './SidebarMiniMenu'
import { useRouter } from 'vue-router'

export default defineComponent({
  components: {
    sidebarMiniMenu
  },
  props: {
    item: [Object]
  },
  setup(props) {
    const $router = useRouter()
    const menu = ref(false)
    provide('menu', menu)
    const timeoutId = ref(null)
    provide('timeoutId', timeoutId)
    return {
      menu,
      onClick() {
        if (!props.item.children) $router.push(props.item.path)
      },
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
