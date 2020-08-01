<template>
  <div class="article-page">

  <div class="banner">
    <div class="container">

      <h1>{{article.title}}</h1>
      <ArticleMeta :article="article" />
    </div>
  </div>

  <div class="container page">

    <div class="row article-content">
      <div class="col-md-12" v-html="article.body"></div>
    </div>

    <hr />

    <div class="article-actions">
      <ArticleMeta :article="article" />
    </div>

    <div class="row">

      <div class="col-xs-12 col-md-8 offset-md-2">

        <ArticleComment :article="article"></ArticleComment>
        
      </div>

    </div>

  </div>

</div>
</template>

<script>
import {
  getArticle
} from '@/api'
import MarkdownIt from 'markdown-it'
import ArticleMeta from './components/article-meta'
import ArticleComment from './components/article-comments'

export default {
  middleware: 'authenticated',
  async asyncData({params}) {
    const {data} = await getArticle(params.slug)
    const {article} = data;
    const md = new MarkdownIt()
    article.body = md.render(article.body)
    return {
      article
    }
  },
  components: {
    ArticleMeta,
    ArticleComment
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