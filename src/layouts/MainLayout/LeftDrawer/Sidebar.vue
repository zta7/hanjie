<template>
  <q-list>
    <div class='row nowarp'>
      <q-avatar icon='menu' class='col-grow cursor-pointer' @click='onMenuClick()' />
    </div>
    <!-- <q-item clickable>
      <q-item-section avatar>
        <q-avatar size='24px'>
          <img :src='userAvatar'>
        </q-avatar>
      </q-item-section>
      <q-item-section>{{ username }}</q-item-section>
    </q-item> -->

    <sidebar-item
      v-for='s in sidebarRoutes'
      :key='s.path'
      :item='s' />
  </q-list>
</template>
<script>
// import { sidebarRoutes } from 'router/routes.js'
import sidebarItem from './SidebarItem'
import { useStore } from 'vuex'
import { computed } from 'vue'

export default {
  components: {
    sidebarItem
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
      onMenuClick() {
        emit('update:mini', true)
      }
    }
  }
}
</script>
