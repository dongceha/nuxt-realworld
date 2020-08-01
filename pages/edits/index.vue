<template>
  <div class="editor-page">
  <div class="container page">
    <div class="row">

      <div class="col-md-10 offset-md-1 col-xs-12">
        <form @submit.prevent="handleSubmit">
          <fieldset>
            <fieldset class="form-group">
                <input required type="text" v-model="article.title" class="form-control form-control-lg" placeholder="Article Title">
            </fieldset>
            <fieldset class="form-group">
                <input v-model="article.description" type="text" class="form-control" placeholder="What's this article about?">
            </fieldset>
            <fieldset class="form-group">
                <textarea required v-model="article.body" class="form-control" rows="8" placeholder="Write your article (in markdown)"></textarea>
            </fieldset>
            <fieldset class="form-group">
                <input type="text" v-model="tagList" class="form-control" placeholder="Enter tags"><div class="tag-list"></div>
            </fieldset>
            <button @click="handleSubmit" class="btn btn-lg pull-xs-right btn-primary" type="button">
                Publish Article
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
  publishArticles,
  getArticle,
  updateArticles
} from '@/api'

export default {
  // 在路由匹配组件之前会先执行中间件处理
  middleware: 'authenticated',
  async asyncData({query}) {
    if (query.slug) {
      const {data: {article}} = await getArticle(query.slug)
      return {
        article: article,
        tagList: '',
        slug: query.slug,
      }
    } else {
      return {
        article: {
          body: '',
          description: '',
          tagList: [],
          title: ''
        },
        slug: query.slug,
        tagList: ''
      }
    }
  },
  methods: {
    handleSubmit() {
      if (this.tagList) {
        this.article.tagList = this.tagList.split(',')
      }
      if (this.slug) {
        this.updateArticles()
      } else {
        this.publishArticles()
      }
    },
    publishArticles() {
      publishArticles({
        article: this.article
      }).then(({data: {article}}) => {
        this.$router.push({
          name: 'article',
          params: {
            slug: article.slug
          }
        })
      })
    },
    updateArticles() {
      updateArticles(this.slug, {
        article: this.article
      }).then(({data: {article}}) => {
        this.$router.push({
          name: 'article',
          params: {
            slug: article.slug
          }
        })
      })
    }
  }
}
</script>

<style>

</style>