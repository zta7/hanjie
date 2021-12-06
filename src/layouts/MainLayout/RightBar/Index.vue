<template>
  <div class='self-stretch row no-wrap items-center q-gutter-x-md cursor-pointer' style='font-size: 2em'>
    <!-- <q-btn icon='notifications' padding='none' :ripple='false' round flat>
      <q-badge rounded color='red' floating />
      <q-menu>
        <q-list style='max-width: 420px'>
          <q-item class='bg-grey-3 q-ma-sm'>
            <q-item-section>
              <div class='row no-wrap items-center'>
                <span class='text-no-wrap' style='font-size: 1.25rem'>3</span>
                <span class='q-px-sm text-caption text-grey text-no-wrap'>{{ $t('notify.newNotices') }}</span>
                <span class='text-yellow-10 cursor-pointer text-no-wrap' @click='onClearAllNotifications()'>{{ $t('notify.clearAll') }}</span>
              </div>
            </q-item-section>
            <q-item-section side class='cursor-pointer'>
              <q-item-label>{{ $t('notify.viewMore') }}<q-icon name='chevron_right' /></q-item-label>
            </q-item-section>
          </q-item>
          <q-item v-for='i in 3' :key='i' clickable>
            <q-item-section>
              <q-item-label>编号：153259</q-item-label>
              <q-item-label class='ellipsis' caption>报警类型：温度1预警上限温度报警 XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</q-item-label>
            </q-item-section>

            <q-item-section side top>
              <q-item-label caption>2 min ago</q-item-label>
              <div class='text-orange'>
                <q-icon name='star' />
                <q-icon name='star' />
                <q-icon name='star' />
              </div>
            </q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-btn>
    <q-btn icon='translate' padding='none' :ripple='false' round flat>
      <q-menu>
        <q-list>
          <q-item
            v-for='l in locales'
            :key='l.label'
            v-close-popup
            :active='l.value === locale'
            clickable
            @click='onLocale(l.value)'>
            <q-item-section>{{ l.label }}</q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-btn> -->
    <q-btn icon='person' padding='none' :ripple='false' round flat>
      <q-menu>
        <q-list>
          <q-item v-close-popup clickable :to='{ path: "/user/profile" }' v-bind='$store.state.component.item' @click='onProfile()'>
            <q-item-section>{{ $t('user.profile') }}</q-item-section>
          </q-item>
          <q-item v-close-popup clickable v-bind='$store.state.component.item' @click='onLogout()'>
            <q-item-section>{{ $t('user.logout') }}</q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-btn>
  </div>
</template>
<script>
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { Dialog } from 'quasar'
import confirmDialog from 'components/Dialogs/Confirm'

export default defineComponent({
  setup() {
    const $store = useStore()
    const $router = useRouter()

    const onLogout = () => {
      Dialog.create({
        component: confirmDialog,
        componentProps: {
          content: 'areYouSureToLogout',
          confirmBtnLabel: 'user.logout'
        }
      }).onOk(async() => {
        await $store.dispatch('user/logout')
        $router.push(`/Login`)
      })
    }

    // const onLocale = locale => {
    //   $store.commit('ls/SET', ['locale', locale])
    // }

    const onProfile = () => {

    }

    return {
      // locales: [
      //   {
      //     label: '简体中文',
      //     value: 'zh-CN'
      //   },
      //   {
      //     label: 'English',
      //     value: 'en-US'
      //   }
      // ],
      // locale: computed(() => $store.getters['ls/locale']),
      // onClearAllNotifications(id = null) {

      // },
      onLogout,
      onProfile
      // onLocale
    }
  }
})
</script>
