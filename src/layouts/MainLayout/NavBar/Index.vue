<template>
  <q-tabs
    inline-label
    no-caps
    align='left'
    :breakpoint='0'
    outside-arrows
    v-bind='$store.state.component.navbar'
    indicator-color='primary'>
    <q-route-tab v-for='e in navbarRoutes' :key='e' :name='e.path' :label='$t(`nav.${e.meta.label}`)' :to='e.path' :ripple='false'>
      <q-icon v-if='!e.meta.affix' name='close' @click.prevent='onDelete(e.path)' />
    </q-route-tab>
  </q-tabs>
</template>
<script>
import { get, uniqBy } from 'lodash'
import { watch, computed, defineComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const $route = useRoute()
    const $router = useRouter()
    const $store = useStore()

    const path = computed(() => $route.path)
    const navbar = computed({
      get: () => $store.state.ls.navbar,
      set: v => $store.commit('ls/SET', ['navbar', v])
    })
    const navbarRoutes = computed(() => {
      let result = []
      result = $router.getRoutes().filter(e => e.meta.affix)
      const routes = $router.getRoutes()
      navbar.value.forEach(e => {
        const route = routes.find(r => r.path === e)
        if (route) result.push(route)
      })

      return uniqBy(result, 'path')
    })

    watch(path, n => {
      const exist = navbar.value.find(e => e === n)
      if (!exist) {
        const route = $router.getRoutes().find(e => e.path === n)
        if (route && route.meta && route.meta.label) navbar.value = [...navbar.value, n]
      }
    }, {
      immediate: true
    })

    const onDelete = path => {
      const i = navbar.value.findIndex(e => e === path)
      if (i !== -1) {
        navbar.value = navbar.value.filter(e => e !== path)
        if ($route.path === path) {
          const pushUrl = get(navbar.value, `${i}`) || get(navbar.value, `${i - 1}`)
          if (pushUrl) $router.push(pushUrl)
        }
      }
    }

    return {
      onDelete,
      navbarRoutes
    }
  }
})
</script>
<style lang="scss" scoped>
  .q-tab{
    &:hover{
      .q-icon {
        opacity: 1;
      }
    }
    .q-icon {
      &:hover {
        color: red;
      }
      opacity: 0;
      position: absolute;
      top: 50%;
      right: -16px;
      transform: translate(0%, -50%);
    }
  }
</style>
