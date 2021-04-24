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
    <q-route-tab v-for='e in navBar' :key='e' icon='alarm' :label='e.path' :to='e.path' active-class='text-red' :ripple='false'>
      <q-avatar size='xs' icon='close' class='q-ml-md bg-grey-6 text-white' @click.stop.prevent='onDelete(e.path)' />
    </q-route-tab>
  </q-tabs>
  <q-separator />
</template>
<script>
import LocalStorageUtil from 'utils/LocalStorage.js'
import { isArray, get } from 'lodash'
import { watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { sidebarWhitelist } from 'router/routes'

export default {
  setup() {
    const $route = useRoute()
    const $router = useRouter()
    const path = computed(() => $route.path)

    const sidebarPaths = sidebarWhitelist.map(e => e.path)

    const navBarPath = LocalStorageUtil({
      key: 'navBarPath',
      toValue: [],
      validateFn: v => isArray(v)
    })

    watch(path, n => {
      const exist = navBarPath.find(e => e === n)
      if (!exist && sidebarPaths.includes(n)) navBarPath.push(n)
    }, {
      immediate: true
    })

    const navBar = computed(() => sidebarWhitelist.filter(r => navBarPath.includes(r.path)))

    const onDelete = path => {
      const i = navBarPath.findIndex(e => e === path)
      if (i !== -1) {
        navBarPath.splice(i, 1)
        if ($route.path === path) {
          const pushUrl = get(navBarPath, i) || get(navBarPath, i - 1)
          if (pushUrl) $router.push(pushUrl)
          else $router.push('/')
        }
      }
    }
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
