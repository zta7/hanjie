<template>
  <q-tabs
    inline-label
    no-caps
    align='left'
    outside-arrows
    active-color='black'
    active-bg-color='blue-grey-11'
    class='bg-grey-3 text-grey'
    indicator-color='transparent'>
    <q-route-tab v-for='e in navBar' :key='e' :name='e.path' :label='e.meta.label' :to='e.path' :ripple='false'>
      <q-avatar v-if='!e.meta.affix' size='xs' icon='close' class='q-ml-md bg-grey-6 text-white' @click.prevent='onDelete(e.path)' />
    </q-route-tab>
  </q-tabs>
</template>
<script>
import LocalStorageUtil from 'utils/LocalStorage.js'
import { isArray, get } from 'lodash'
import { watch, computed, shallowReactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { sidebarWhitelist } from 'router/routes'

export default {
  setup() {
    const $route = useRoute()
    const $router = useRouter()
    const path = computed(() => $route.path)
    const navBarPath = LocalStorageUtil({
      key: 'navBarPath',
      toValue: [],
      validateFn: v => isArray(v)
    })

    // 初始化
    const affix = sidebarWhitelist.filter(e => e.meta.affix)
    const opened = sidebarWhitelist.filter(e => !e.meta.affix && navBarPath.value.includes(e.path))
    const navBar = shallowReactive(affix.concat(opened))

    watch(path, n => {
      const exist = navBar.find(e => e.path === n)
      const target = sidebarWhitelist.find(e => e.path === n)
      if (!exist && target) navBar.push(target)
    }, {
      immediate: true
    })

    const onDelete = path => {
      const i = navBar.findIndex(e => e.path === path)
      if (i !== -1) {
        navBar.splice(i, 1)
        if ($route.path === path) {
          const pushUrl = get(navBar, `[${i}].path`) || get(navBar, `[${i - 1}].path`)
          if (pushUrl) $router.push(pushUrl)
        }
      }
    }

    watch(navBar, n => {
      navBarPath.value = n.filter(e => !e.meta.affix).map(e => e.path)
    })

    return {
      onDelete,
      navBar,
      navBarPath
    }
  }
}
</script>
<style scoped>
 >>>.q-icon:hover {
    color: red
  }
</style>
