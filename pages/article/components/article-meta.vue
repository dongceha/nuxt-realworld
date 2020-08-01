<template>
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
    <template v-if="!isAuthor">
        <button
            :class="{active: article.author.following}"
            class="btn btn-sm btn-outline-secondary">
            <i class="ion-plus-round"></i>
            &nbsp;
            Follow Eric Simons <span class="counter">(10)</span>
        </button>
        &nbsp;&nbsp;
        <button
            :class="{active: article.favorited}"
            class="btn btn-sm btn-outline-primary">
            <i class="ion-heart"></i>
            &nbsp;
            Favorite Post <span class="counter">(29)</span>
        </button>
    </template>
    <template v-else>
        <nuxt-link
            :to="{
                name: 'edits',
                query: {
                    slug: article.slug
                }
            }"
            class="btn btn-sm btn-outline-secondary btn-sm">
            <i class="ion-edit"></i>
            &nbsp;
            Edit Article
        </nuxt-link>
        &nbsp;&nbsp;
        <button
            @click="handleDelete"
            class="btn btn-outline-danger btn-sm">
            <i class="ion-trash-a"></i>
            &nbsp;
            Delete Article
        </button>
    </template>
    
  </div>
</template>

<script>
export default {
    props: {
        article: {
            type: Object,
            required: true
        },
        isAuthor: {
            type: Boolean,
            required: true
        }
    },
    methods: {
        handleDelete() {
            this.$emit('handleDelete')
        }
    }
}
</script>

<style>

</style>