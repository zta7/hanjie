<template>
  <q-expansion-item
    v-if='item.children'
    :group='inset + ""'
    :header-inset-level='inset'
    expand-separator
    :icon='item.meta.icon'
    :label='item.meta.label'
    default-opened>
    <sidebar-item v-for='e in item.children' :key='e.path' :item='e' :inset='inset + 0.55' :pre-path='p' />
  </q-expansion-item>
  <q-item v-else :inset-level='inset' clickable :to='p' exact>
    <q-item-section thumbnail>
      <q-icon name='' />
    </q-item-section>
    <q-item-section>
      {{ item.meta.label }}
    </q-item-section>
  </q-item>
</template>
<script>
import { sidebarRoutes } from 'router/routes.js'
import sidebarItem from './SidebarItem'
import path from 'path'
export default {
  components: {
    sidebarItem
  },
  props: {
    item: [Object],
    inset: {
      type: Number,
      default: 0
    },
    prePath: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const p = path.resolve(props.prePath, props.item.path)
    return {
      p,
      sidebarRoutes
    }
  }
}
</script>
