<template>
  <q-page class='q-pa-sm'>
    <div class='row q-col-gutter-sm'>
      <div class='col-lg-8 col-md-8 col-xs-12 col-sm-12'>
        <q-card>
          <q-card-section class='text-h6 '>
            <div class='text-h6'>{{ $t('user.editProfile') }}</div>
            <!-- <div class='text-subtitle2'>Complete your profile</div> -->
          </q-card-section>
          <q-card-section class='q-pa-sm'>
            <q-list class='row'>
              <q-item class='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                <q-item-section side>
                  <q-avatar size='100px' color='teal' text-color='white' icon='person' />
                </q-item-section>
                <!-- <q-item-section>
                  <q-btn label='Add Photo' class='text-capitalize' rounded color='info' style='max-width: 120px' />
                </q-item-section> -->
              </q-item>

              <q-item class='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                <q-item-section>
                  <q-input v-model='user_details.name' dense :label='$t("user.username")' />
                </q-item-section>
              </q-item>
              <q-item class='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                <q-item-section>
                  <q-input v-model='user_details.email' dense :label='$t("user.emailAddress")' />
                </q-item-section>
              </q-item>
              <q-item class='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                <q-item-section>
                  <q-input v-model='user_details.phone' dense :label='$t("user.phoneNumber")' />
                </q-item-section>
              </q-item>
              <q-item class='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                <q-item-section>
                  <q-input v-model='user_details.about' type='textarea' dense :label='$t("user.about")' />
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
          <q-card-actions align='right'>
            <q-btn class='text-capitalize bg-info text-white'>{{ $t('user.updateUserInfo') }}</q-btn>
          </q-card-actions>
        </q-card>
      </div>

      <div class='col-lg-4 col-md-8 col-xs-12 col-sm-12'>
        <q-card>
          <q-card-section class='text-h6 q-pa-sm'>
            <div class='text-h6'>{{ $t('user.changePassword') }}</div>
          </q-card-section>
          <q-card-section class='q-pa-sm row'>
            <q-item class='col-lg-4 col-md-4 col-sm-12 col-xs-12'>
              <q-item-section>
                {{ $t('user.currentPassword') }}
              </q-item-section>
            </q-item>
            <q-item class='col-lg-8 col-md-8 col-sm-12 col-xs-12'>
              <q-item-section>
                <q-input
                  v-model='password_dict.current_password'
                  type='password'
                  dense
                  outlined
                  round
                  :label='$t("user.currentPassword")' />
              </q-item-section>
            </q-item>
            <q-item class='col-lg-4 col-md-4 col-sm-12 col-xs-12'>
              <q-item-section>
                {{ $t('user.newPassword') }}
              </q-item-section>
            </q-item>
            <q-item class='col-lg-8 col-md-8 col-sm-12 col-xs-12'>
              <q-item-section>
                <q-input
                  v-model='password_dict.new_password'
                  type='password'
                  dense
                  outlined
                  round
                  :label='$t("user.newPassword")' />
              </q-item-section>
            </q-item>
            <q-item class='col-lg-4 col-md-4 col-sm-12 col-xs-12'>
              <q-item-section>
                {{ $t('user.confirmNewPassword') }}
              </q-item-section>
            </q-item>
            <q-item class='col-lg-8 col-md-8 col-sm-12 col-xs-12'>
              <q-item-section>
                <q-input
                  v-model='password_dict.confirm_new_password'
                  type='password'
                  dense
                  outlined
                  round
                  :label='$t("user.confirmNewPassword")' />
              </q-item-section>
            </q-item>
          </q-card-section>
          <q-card-actions align='right'>
            <q-btn class='text-capitalize bg-info text-white'>{{ $t('user.changePassword') }}</q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>
<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Profile',
  setup() {
    return {
      user_details: {},
      password_dict: {}
    }
  }
})
</script>
