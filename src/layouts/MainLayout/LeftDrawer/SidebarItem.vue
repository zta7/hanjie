<template>
  <div v-if='!item.hidden'>
    <q-expansion-item
      v-if='item.children'
      v-bind='$store.state.component.leftDrawerExpansionItem'
      :group='inset + ""'
      :header-inset-level='inset'
      :icon='item.meta.icon'
      :label='$t(`nav.${item.meta.label}`)'>
      <sidebar-item v-for='e in item.children' :key='e.path' :item='e' :inset='inset + 0.55' :pre-path='p' />
    </q-expansion-item>
    <q-item v-else :inset-level='inset' clickable :to='p' exact v-bind='$store.state.component.item'>
      <q-item-section avatar>
        <q-icon :name='item.meta.icon' />
      </q-item-section>
      <q-item-section>
        {{ $t(`nav.${item.meta.label}`) }}
      </q-item-section>
    </q-item>
  </div>
</template>
<script>
import { sidebarRoutes } from 'router/routes.js'
import { defineComponent } from 'vue'
import path from 'path'
export default defineComponent({
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
})
</script>
