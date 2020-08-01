<template>
  <div class="profile-page">

  <div class="user-info">
    <div class="container">
      <div class="row">

        <div class="col-xs-12 col-md-10 offset-md-1">
          <img :src="image" class="user-img" />
          <h4>{{username}}</h4>
          <p>
            {{bio}}
          </p>
          
          <button v-if="user && user.username === username" class="btn btn-sm btn-outline-secondary action-btn">
            <nuxt-link to="/settings">
              <i class="ion-gear-a"></i>
              &nbsp;
              Edit Profile Settings
            </nuxt-link>
          </button>
          <button v-else class="btn btn-sm btn-outline-secondary action-btn">
            <i class="ion-plus-round"></i>
            &nbsp;
            Follow {{username}} 
          </button>
        </div>

      </div>
    </div>
  </div>

  <div class="container">
    <div class="row">

      <div class="col-xs-12 col-md-10 offset-md-1">
        <div class="articles-toggle">
          <ul class="nav nav-pills outline-active">
            <li class="nav-item">
              <a :class="{
                active: active === 'author'
              }" href="javascript:void(0)" @click="getMy" class="nav-link">My Articles</a>
            </li>
            <li class="nav-item">
              <a :class="{
                active: active === 'favorited'
              }" href="javascript:void(0)" @click="getFavorite" class="nav-link">Favorited Articles</a>
            </li>
          </ul>
        </div>

        <Article v-for="article in articles" :article="article" :key="article.slug"></Article>
      </div>

    </div>
  </div>

</div>
</template>

<script>
import {
  getUser,
  getArticles
} from '@/api'
import Article from './components/article'
import {mapState} from 'vuex'
export default {
  async asyncData({params}) {
    const [{data: {user}}, {data: {articles}}] = await Promise.all([
      getUser(params.username),
      getArticles({
        limit: 5,
        offset: 0,
        author: params.username
      })
    ])
    return {
      username: user.username,
      image: user.image,
      bio: user.bio,
      articles
    }
  },
  components: {
    Article
  },
  data() {
    return {
      active: 'author'
    }
  },
  computed: {
      ...mapState(['user'])
  },
  methods: {
    getMy() {
      this.getArticles('author')
      this.active = 'author'
    },
    getFavorite() {
      this.getArticles('favorited')
      this.active = 'favorited'
    },
    async getArticles(key) {
      const {data: {articles}} = await getArticles({
        limit: 5,
        offset: 0,
        [key]: this.username
      });
      this.articles = articles
    }
  }
}
</script>

<style>

</style>