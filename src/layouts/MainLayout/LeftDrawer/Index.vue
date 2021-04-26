<template>
  <q-drawer :model-value='true' side='left' bordered behavior='desktop' :mini='mini'>
    <side-bar @update:mini='v => updateMini(v)' />
    <template #mini>
      <side-bar-mini @update:mini='v => updateMini(v)' />
    </template>
  </q-drawer>
</template>
<script>
import SideBar from './Sidebar.vue'
import SideBarMini from './SidebarMini.vue'
import { ref } from 'vue'
export default {
  components: {
    SideBar,
    SideBarMini
  },
  setup() {
    const mini = ref(true)
    return {
      mini,
      updateMini(v) {
        mini.value = v
      }
    }
  }
}
</script>
