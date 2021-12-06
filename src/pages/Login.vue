<template>
  <div class='window-width window-height flex items-center justify-center'>
    <div class='row no-wrap items-center q-gutter-x-md absolute' style='bottom: 90%;left: 10%'>
      <q-img
        src='/Login/2.png'
        spinner-color='white'
        style='height: 60px; width: 180px'
        fit='fill' />
      <q-img
        src='/Login/3.png'
        spinner-color='white'
        style='height: 30px; width: 120px'
        fit='fill' />
      <q-img
        src='/Login/1.png'
        spinner-color='white'
        style='height: 60px; width: 180px'
        fit='fill' />
    </div>
    <q-card class='bg row no-wrap justify-end items-center q-px-md' style='width: 80%;height: 80%' flat>
      <q-card-section class='column no-wrap' style='width: 35%'>
        <div
          class='text-h4 text-bold text-blue-grey text-center'>
          焊装质量智能监控系统
        </div>
        <q-form class='flex column no-wrap q-gutter-y-lg q-my-md'>
          <q-input v-model='values.account' :placeholder='$t("enterPhoneNumber")' rounded outlined :error='Boolean(errors["account"])' :error-message='errors["account"]' />
          <q-input v-model='values.password' :placeholder='$t("enterPassword")' rounded outlined :error='Boolean(errors["password"])' :error-message='errors["password"]' type='password' />
          <q-btn :label='$t("login")' size='lg' color='primary' rounded glossy @click='doLogin()' />
        </q-form>
        <q-btn :label='$t("dontHaveAccountGoToRegister")' color='primary' flat :to='{ name: "Register" }' />
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useField, useForm } from 'vee-validate'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'Login',
  setup() {
    const { validate, errors, values } = useForm()
    const $store = useStore()
    const $router = useRouter()
    useField('account', 'required')
    useField('password', 'required|min:6|max:16')

    return {
      errors,
      values,
      async doLogin() {
        const { valid } = await validate()
        if (valid) {
          $store.dispatch('user/login', values).then(() => {
            $router.push('/')
          })
        }
      }
    }
  }
})
</script>

<style scoped>
  .bg {
    background-image: url("/Login/bg.png");
    background-repeat: no-repeat;
    background-size:cover;
    background-size:100% 100%;
  }
</style>
