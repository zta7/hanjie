<template>
  <div class='fit mini-slot cursor-pointer'>
    <div class='column items-center'>
      <div class='row no-wrap full-width'>
        <q-avatar class='col-grow' icon='menu' @click='onMenuClick()' />
      </div>

      <!-- <q-avatar size='24px'>
        <img :src='userAvatar'>
      </q-avatar> -->
      <sidebar-mini-item v-for='r in sidebarRoutes' :key='r.path' :item='r' />
    </div>
  </div>
</template>
<script>
import { defineComponent, ref, computed } from 'vue'
import { useStore } from 'vuex'
import sidebarMiniItem from './SidebarMiniItem'

export default defineComponent({
  components: {
    sidebarMiniItem
  },
  emits: ['update:mini'],
  setup(props, { emit }) {
    const $store = useStore()
    const sidebarRoutes = computed(() => $store.state.user.sidebarRoutes)
    const username = computed(() => $store.state.user.name)
    const userAvatar = computed(() => $store.state.user.avatar)

    return {
      username,
      userAvatar,
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
