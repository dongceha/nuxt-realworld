<template>
  <div class="article-preview">
        <div class="article-meta">
        <nuxt-link :to="{
            name: 'profile',
            params: {
                username: article.author.username
            }
        }"><img :src="article.author.image" /></nuxt-link>
        <div class="info">
            <nuxt-link :to="{
                name: 'profile',
                params: {
                    username: article.author.username
                }
            }" class="author">{{article.author.username}}</nuxt-link>
            <span class="date">{{article.createAt | data('MMM DD, YYYY')}}</span>
        </div>
        <button class="btn btn-outline-primary btn-sm pull-xs-right" :class="{
            'btn-primary': article.favorited
        }" @click="handleFavorite">
            <i class="ion-heart"></i> {{article.favoritesCount}}
        </button>
        </div>
        <nuxt-link  :to="{
            name: 'article',
            params: {
                slug: article.slug
            }
        }" class="preview-link">
        <h1>{{article.title}}</h1>
        <p>{{article.body}}</p>
        <span>Read more...</span>
        </nuxt-link>
    </div>
</template>

<script>
import {
  addFavorite,
  deleteFavorite
} from '@/api'
export default {
    props: {
        article: {
            type: Object,
            required: true
        }
    },
    methods: {
        async handleFavorite() {
            let article = null
            if (this.article.favorited) {
                article = await deleteFavorite(this.article.slug)
            } else {
                article = await addFavorite(this.article.slug)
            }
            console.log(article)
            this.$emit('handleFavorite', this.article, article.data.article)
        }
    }
}
</script>

<style>

</style>