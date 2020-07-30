<template>
  <div class="auth-page">
  <div class="container page">
    <div class="row">

      <div class="col-md-6 offset-md-3 col-xs-12">
        <h1 class="text-xs-center">{{isLogin ? 'Sign in' : 'Sign up' }}</h1>
        <p class="text-xs-center">
          <nuxt-link v-if="isLogin" to="/register">Need an account?</nuxt-link>
          <nuxt-link v-else to="/login">Have an account?</nuxt-link>
        </p>

        <ul class="error-messages">
            <template v-for="(messsage, filed) in errors">
                 <li v-for="mes in messsage" :key="mes">{{filed}} {{mes}}</li>
            </template>
        </ul>

        <form @submit.prevent="onSubmit">
          <fieldset class="form-group" v-if="!isLogin">
            <input v-model="user.username" required class="form-control form-control-lg" type="text" placeholder="Your Name">
          </fieldset>
          <fieldset class="form-group">
            <input required type="email" class="form-control form-control-lg" v-model="user.email" placeholder="Email">
          </fieldset>
          <fieldset class="form-group">
            <input minlength="8" required class="form-control form-control-lg" type="password" v-model="user.password" placeholder="Password">
          </fieldset>
          <button class="btn btn-lg btn-primary pull-xs-right">
            {{isLogin ? 'Sign in' : 'Sign up' }}
          </button>
        </form>
      </div>

    </div>
  </div>
</div>
</template>

<script>
import { login, register } from '@/api/index'
const Cookie = process.client ? require('js-cookie') : undefined  // 仅在 客户端导入
export default {
    middleware: 'notAuthenticated',
    computed: {
        isLogin() {
            return this.$route.name === 'login'
        }
    },
    data() {
        return {
            "user": {
                username: 'dcdcdcdcdcdcdcdcdcdc',
                "email": "dc@dc.dc",
                "password": "dcdcdcdcdcdcdcdcdcdc"
            },
            errors: {}
        }
    },
    methods: {
        async onSubmit() {
            try {
                const {data} = this.isLogin ? 
                    await login({user: this.user}) :
                    await register({user: this.user});
                console.log('data=====', data)
                this.$store.commit('setUser', data.user)
                // 为了防止 刷新页面数据丢失
                Cookie.set('user', data.user)
                this.$router.push('/')
            } catch (error) {
                console.dir(error)
                // this.errors = error.response.data.errors
            }
            
        }
    }
}
</script>

<style>

</style>