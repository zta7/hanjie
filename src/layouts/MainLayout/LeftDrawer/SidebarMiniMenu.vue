<template>
  <q-menu
    v-bind='$store.state.component.menu'
    @mouseenter='onMenuMouseenter'
    @mouseleave='onMenuMouseleave'>
    <q-list>
      <q-item v-for='e in item.children' :key='e.path' clickable :to='e.children ? void 0 : path.resolve(prePath, e.path)' exact v-bind='$store.state.component.item'>
        <q-item-section>{{ $t(`nav.${e.meta.label}`) }}</q-item-section>
        <q-item-section v-if='e.children' side>
          <q-icon name='keyboard_arrow_right' />
        </q-item-section>
        <sidebar-mini-menu v-if='e.children' :item='e' anchor='top end' self='top start' square :pre-path='path.resolve(prePath, e.path)' />
      </q-item>
    </q-list>
  </q-menu>
</template>
<script>
import { defineComponent, inject, ref } from 'vue'
import path from 'path'
export default defineComponent({
  props: {
    item: [Object],
    prePath: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const nextTimeoutId = ref(null)
    const menu = inject('menu')
    const timeoutId = inject('timeoutId')
    return {
      path,
      nextTimeoutId,
      onMenuMouseenter() {
        clearTimeout(timeoutId.value)
      },
      onMenuMouseleave() {
        timeoutId.value = setTimeout(() => {
          menu.value = false
        }, 100)
      }
    }
  }
})
</script>
