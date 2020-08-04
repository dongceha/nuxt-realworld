<template>
  <div class="article-page">

  <div class="banner">
    <div class="container">
      <h1>{{article.title}}</h1>
      <ArticleMeta
        @handleDelete="handleDelete"
        @handleFollow="handleFollow"
        @handleFavorite="handleFavorite"
        :article="article"
        :isAuthor="isAuthor"/>
    </div>
  </div>

  <div class="container page">

    <div class="row article-content">
      <div class="col-md-12" v-html="article.body"></div>
    </div>

    <hr />

    <div class="article-actions">
      <ArticleMeta
        @handleDelete="handleDelete"
        @handleFollow="handleFollow"
        :article="article"
        :isAuthor="isAuthor"/>
    </div>

    <div class="row">

      <div class="col-xs-12 col-md-8 offset-md-2">

        <ArticleComment :article="article" :user="user"></ArticleComment>
        
      </div>

    </div>

  </div>

</div>
</template>

<script>
import {
  getArticle,
  deleteArticles,
  follow,
  unfollow,
  addFavorite,
  deleteFavorite
} from '@/api'
import MarkdownIt from 'markdown-it'
import ArticleMeta from './components/article-meta'
import ArticleComment from './components/article-comments'
import {mapState} from 'vuex'

export default {
  middleware: 'authenticated',
  async asyncData({params}) {
    const {data} = await getArticle(params.slug)
    const {article} = data;
    const md = new MarkdownIt()
    article.body = md.render(article.body)
    return {
      slug: params.slug,
      article
    }
  },
  methods: {
    handleDelete() {
      deleteArticles(this.slug).then(() => {
        this.$router.push('/')
      })
    },
    async handleFollow() {
      // console.log(this.article)
      const following = this.article.author.following;
      if (following) {
        await unfollow(this.article.author.username)
      } else {
        await follow(this.article.author.username)
      }
      this.article.author.following = !following
    },
    async handleFavorite() {
      const favorited = this.article.favorited
      let res
      if (favorited) {
        res = await deleteFavorite(this.article.slug)
      } else {
        res = await addFavorite(this.article.slug)
      }
      const {data: {article}} = res;
      const md = new MarkdownIt()
      article.body = md.render(article.body)
      this.article = article
    }
  },
  components: {
    ArticleMeta,
    ArticleComment
  },
  computed: {
    ...mapState(['user']),
    isAuthor() {
      return this.user && this.user.username === this.article.author.username
    }
  },
  head() {
    return {
      title: `${this.article.title} - realworld`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.article.description
        }
      ]
    }
  }
}
</script>

<style>

</style>