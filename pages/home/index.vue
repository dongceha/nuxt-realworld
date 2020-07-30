<template>
  <div class="home-page">

  <div class="banner">
    <div class="container">
      <h1 class="logo-font">conduit</h1>
      <p>A place to share your knowledge.</p>
    </div>
  </div>

  <div class="container page">
    <div class="row">

      <div class="col-md-9">
        <div class="feed-toggle">
          <ul class="nav nav-pills outline-active">
            <li class="nav-item" v-if="user">
              <nuxt-link :class="{
                active: tab === 'your_feed'
              }" class="nav-link" :to="{
                name: 'home',
                query: {
                  tab: 'your_feed'
                }
              }" exact>Your Feed</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link :class="{
                active: tab === 'global_feed'
              }"  class="nav-link" :to="{
                name: 'home'
                }" exact>Global Feed</nuxt-link>
            </li>
            <li v-if="tag" class="nav-item">
              <nuxt-link :class="{
                active: tab === 'tag'
              }" class="nav-link" :to="{
                name: 'home',
                query: {
                  tab: 'tag',
                  tag: tag
                }
              }" exact>{{tag}}</nuxt-link>
            </li>
          </ul>
        </div>

        <div class="article-preview" v-for="article in articles" :key="article.slug">
          <div class="article-meta">
            <!-- {{article.author}} -->
            <nuxt-link :to="{
              name: 'profile',
              params: {
                username: article.author.username
              }
            }">
              <img :src="article.author.image" />
            </nuxt-link>
            <div class="info">
              <nuxt-link class="author" :to="{
                name: 'profile',
                params: {
                  username: article.author.username
                }
              }">
                {{article.author.username}}
              </nuxt-link>
              <span class="date">{{article.author.createdAt | data('MMM DD, YYYY')}}</span>
            </div>
            <button :class="{
              active: article.favorited
            }" 
              :disabled="article.favoriteDiasble"
              @click="handleFavorite(article)"
              class="btn btn-outline-primary btn-sm pull-xs-right">
              <i class="ion-heart"></i> {{article.favoritesCount}}
            </button>
          </div>
          <nuxt-link :to="{
            name: 'article',
            params: {
              slug: article.slug
            }
          }" class="preview-link">
            <h1>{{article.title}}</h1>
            <p>{{article.description}}</p>
            <span>Read more...</span>
          </nuxt-link>
        </div>
        <!-- 分页列表 -->
        <nav>
          <ul class="pagination">
            <li class="page-item" :class="{
              'active': item === page
            }" v-for="item in totalPage" :key="item">
              <nuxt-link class="page-link ng-binding" :to="{
                name: 'home',
                query: {
                  page: item,
                  tab: tab,
                  tag: tag
                }
              }">{{ item }}</nuxt-link>
            </li>
          </ul>
        </nav>
      </div>
      

      <div class="col-md-3">
        <div class="sidebar">
          <p>Popular Tags</p>

          <div class="tag-list">
            <nuxt-link v-for="item in showTags" :key="item" :to="{
              name: 'home',
              query: {
                tag: item,
                tab: item,
                page: 1
              }
            }" class="tag-pill tag-default">{{item}}</nuxt-link>
          </div>
        </div>
      </div>

    </div>
  </div>

</div>
</template>

<script>
import {
  getArticles,
  getTags,
  getYourFeedArticle,
  addFavorite,
  deleteFavorite
} from '@/api'
import {mapState} from 'vuex'
export default {
  async asyncData({ query }) {
    console.log(query)
    const limit = 10
    const tag = query.tag
    const tab = query.tab || 'global_fed'
    const page = Number.parseInt(query.page || 1)
    const loadArticles = tab === 'global_fed' ? getArticles : getYourFeedArticle
    const [{data: {articles, articlesCount}}, {data: {tags}}] = await Promise.all([
      loadArticles({
        limit,
        tag,
        offset: (page - 1) * limit
      }),
      getTags()
    ])
    articles.forEach(article => article.favoriteDiasble = false)
    return {
      articles,
      articlesCount,
      limit,
      page,
      tags,
      tab,
      tag
    }
    // console.log(data)
  },
  watchQuery: ['page', 'tag', 'tab'],
  computed: {
    totalPage() {
      return Math.ceil(this.articlesCount / this.limit)
    },
    showTags() {
      return (this.tags || []).filter(tag => tag.length > 2)
    },
    ...mapState(['user'])
  },
  methods: {
    handleFavorite(article) {
      article.favoriteDiasble = true
      if (article.favorited) {
        deleteFavorite(article.slug).then(() => {
          article.favorited = false
          article.favoritesCount -= 1
          article.favoriteDiasble = false
        })
      } else {
        addFavorite(article.slug).then(() => {
          article.favorited = true
          article.favoritesCount += 1
          article.favoriteDiasble = false
        })
      }
    }
  }
}
</script>

<style>

</style>