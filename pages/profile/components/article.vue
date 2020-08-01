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
        <button class="btn btn-outline-primary btn-sm pull-xs-right">
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
export default {
    props: {
        article: {
            type: Object,
            required: true
        }
    }
}
</script>

<style>

</style>