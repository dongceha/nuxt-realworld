<template>
  <div class="settings-page">
  <div class="container page">
    <div class="row">

      <div class="col-md-6 offset-md-3 col-xs-12">
        <h1 class="text-xs-center">Your Settings</h1>

        <form @submit.prevent="updateUser">
          <fieldset>
              <fieldset class="form-group">
                <input class="form-control" v-model="user.image" type="text" placeholder="URL of profile picture">
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg" v-model="user.username" type="text" placeholder="Your Name">
              </fieldset>
              <fieldset class="form-group">
                <textarea class="form-control form-control-lg" v-model="user.bio" rows="8" placeholder="Short bio about you"></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg" v-model="user.email" type="text" placeholder="Email">
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg" v-model="user.password" type="password" placeholder="new Password">
              </fieldset>
              <button class="btn btn-lg btn-primary pull-xs-right">
                Update Settings
              </button>
          </fieldset>
        </form>
      </div>

    </div>
  </div>
</div>
</template>

<script>
import {
  updateUser
} from '@/api'
const Cookie = process.client ? require('js-cookie') : undefined  // 仅在 客户端导入

export default {
  middleware: 'authenticated',
  data() {
    return {
      user: {...this.$store.state.user}
    }
  },
  methods: {
    updateUser() {
      updateUser(this.user).then(({data}) => {
        this.$store.commit('setUser', data.user)
        Cookie.set('user', data.user)
        this.$router.push('/')
      })
    }
  }
}
</script>

<style>

</style>