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
          <q-input v-model='values.phone' :placeholder='$t("enterPhoneNumber")' rounded outlined :error='Boolean(errors["phone"])' :error-message='errors["phone"]'>
            <template #prepend>
              <q-icon name='phone' />
            </template>
          </q-input>
          <q-input v-model='values.verificationCode' :placeholder='$t("enterVerificationCode")' rounded outlined :error='Boolean(errors["verificationCode"])' :error-message='errors["verificationCode"]'>
            <template #prepend>
              <q-icon name='check' />
            </template>
            <template #after>
              <q-btn :label='$t("sendVerificationCode")' color='primary' outline unelevated :loading='phoneCodeSending' @click='sendPhoneCode()' />
            </template>
          </q-input>
          <q-input v-model='values.password' :placeholder='$t("enterPassword")' rounded outlined :error='Boolean(errors["password"])' :error-message='errors["password"]'>
            <template #prepend>
              <q-icon name='vpn_key' />
            </template>
          </q-input>
          <q-input v-model='values.confirmPassword' :placeholder='$t("enterConfirmPassword")' rounded outlined :error='Boolean(errors["confirmPassword"])' :error-message='errors["confirmPassword"]'>
            <template #prepend>
              <q-icon name='vpn_key' />
            </template>
          </q-input>

          <q-btn :label='$t("register")' size='lg' color='primary' rounded glossy @click='register()' />
        </q-form>
        <q-btn :label='$t("hasAccountGoToLogin")' color='primary' flat :to='{ name: "Login" }' />
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useField, useForm } from 'vee-validate'

export default defineComponent({
  name: 'Register',
  setup() {
    const { validate, errors, values } = useForm()
    const { validate: phoneNumberValidate } = useField('phone', 'required|phone')
    useField('verificationCode', 'required|digits:4')
    useField('password', 'required|min:8|max:16')
    useField('confirmPassword', 'required|confirmed:@password')

    const phoneCodeSending = ref(false)
    const sendPhoneCode = async() => {
      const result = await phoneNumberValidate()
      if (result.valid) {
        phoneCodeSending.value = true
        new Promise((res, rej) => {
          setTimeout(() => {
            phoneCodeSending.value = false
            res('')
          }, 5000)
        })
      }
    }

    const register = async() => {
      const { valid } = await validate()
      if (valid) console.log('valid')
    }

    return {
      errors,
      values,
      phoneCodeSending,
      sendPhoneCode,
      register
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
